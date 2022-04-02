import React, { useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, VStack, HStack, Text } from 'native-base';

import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useInterval } from 'usehooks-ts';
import Toast from 'react-native-toast-message';

import Logo from '../components/Logo';
import InputForm from '../components/InputForm';

import { api } from '../services/api';

type AbbreviationTechnologies = {
  abbreviation: string;
  color: string; 
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUpFormSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email("O e-mail precisa ser válido").required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
});

const SignUp: React.FC = () => {
  const [technology, setTechnology] = useState<AbbreviationTechnologies[]>([
    {
      abbreviation: 'tsx',
      color: '#0074c2',
    },
    {
      abbreviation: 'dart',
      color: '#025493'
    },
    {
      abbreviation: 'jsx',
      color: '#EAD41C'
    },
  ]);
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SignUpFormSchema),
  });

  useInterval(() => {
    const cicleTechnology = [...technology];

    const shiftedTechnology = cicleTechnology.shift();

    if (shiftedTechnology) 
      cicleTechnology.push(shiftedTechnology);

    setTechnology(cicleTechnology);
  }, 2000)

  const navigation = useNavigation();

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values: SignUpFormData) => {
    try {

      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      }

      await api.post('/students', data);

      Toast.show({
        visibilityTime: 5000,
        type: 'success',
        position: 'top',
        text1: 'Cadastro feito com sucesso',
        text2: 'Você ja pode logar',
      });

      navigation.goBack();

    } catch (error) {
      Toast.show({
        visibilityTime: 5000,
        type: 'error',
        position: 'top',
        text1: 'Falha ao cadastrar',
        text2: 'Verifique se este e-mail já está cadastrado',
      });
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <VStack flex={1} alignItems="center" justifyContent="center">
            <HStack>
              <Text color="gray.600" fontSize={88}>
                .
              </Text>
              <Text color={technology[0].color} fontSize={88}>
                {technology[0].abbreviation}
              </Text>
            </HStack>

            <Logo />

            <VStack w="100%" p={4} space={4}>
              <InputForm
                name="name"
                placeholder="Nome"
                control={control}
                error={errors.name?.message}
                autoCorrect={false}
              />

              <InputForm
                name="email"
                placeholder="E-mail"
                control={control}
                error={errors.email?.message}
                autoCorrect={false}
              />

              <InputForm
                name="password"
                placeholder="Senha"
                secure
                control={control}
                error={errors.password?.message}
                autoCorrect={false}
              />

              <InputForm
                name="password_confirmation"
                placeholder="Confirmação de senha"
                secure
                control={control}
                error={errors.password_confirmation?.message}
                autoCorrect={false}
              />

              <Button
                onPress={handleSubmit(handleSignUp as any)}
                backgroundColor="purple.500"
                p={3}
              >
                Cadastrar
              </Button>
              <Button
                onPress={() => navigation.navigate('SignIn')}
                variant="link"
                colorScheme="purple"
                p={3}
              >
                Voltar para login
              </Button>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
