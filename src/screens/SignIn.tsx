import React, { useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, VStack, HStack, Text, useToast } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useInterval } from 'usehooks-ts';

import { useAuth } from '../hooks/auth';

import Logo from '../components/Logo';
import InputForm from '../components/InputForm';

type AbbreviationTechnologies = {
  abbreviation: string;
  color: string; 
}

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email("O e-mail precisa ser válido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

const SignIn: React.FC = () => {

  const { signIn } = useAuth();

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
    resolver: yupResolver(signInFormSchema),
  });

  useInterval(() => {
    const cicleTechnology = [...technology];

    const shiftedTechnology = cicleTechnology.shift();

    if (shiftedTechnology) 
      cicleTechnology.push(shiftedTechnology);

    setTechnology(cicleTechnology);
  }, 2000)

  const navigation = useNavigation();

  const toast = useToast();

  const handleSignIn: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
    try {

      await signIn(data);

    } catch (error) {
      toast.show({
        title: 'Falha na autenticação',
        description: 'Verifique seu e-mail e senha',
        status: 'error',
      })
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
                name="email"
                placeholder="E-mail"
                control={control}
                icon="user"
                error={errors.email?.message}
                autoCorrect={false}
              />

              <InputForm
                name="password"
                placeholder="Senha"
                secure
                control={control}
                icon="key"
                error={errors.password?.message}
                autoCorrect={false}
              />

              <Button
                onPress={handleSubmit(handleSignIn as any)}
                backgroundColor="purple.500"
                p={3}
              >
                Entrar
              </Button>
              <Button
                onPress={() => navigation.navigate('SignUp')}
                variant="link"
                colorScheme="purple"
                p={3}
              >
                Criar uma conta
              </Button>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
