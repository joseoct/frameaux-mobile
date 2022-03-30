import React, { useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, Div, Text } from 'react-native-magnus';
import { useNavigation } from '@react-navigation/native';

import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useInterval } from 'usehooks-ts';
import Toast from 'react-native-toast-message';

import Logo from '../components/Logo';
import { useAuth } from '../hooks/auth';
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

  const handleSignIn: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
    try {

      await signIn(data);

    } catch (error) {
      Toast.show({
        visibilityTime: 5000,
        type: 'error',
        position: 'top',
        text1: 'Falha na autenticação',
        text2: 'Verifique seus dados',
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
          <Div justifyContent="center" alignItems="center" flex={1} px={30}>
            <Div row>
              <Text color="gray600" fontSize={88}>
                .
              </Text>
              <Text color={technology[0].color} fontSize={88}>
                {technology[0].abbreviation}
              </Text>
            </Div>

            <Logo />

            <Div w="100%">
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
                fontFamily="Roboto_700Bold"
                fontSize={16}
                w="100%"
                mt="lg"
                bg="purple500"
                color="white"
                onPress={handleSubmit(handleSignIn as any)}
              >
                Entrar
              </Button>
            </Div>

            <Div mt={16}>
              <Text
                onPress={() => navigation.navigate('SignUp')}
                fontFamily="Roboto_500Medium"
                fontSize={16}
                color="gray400"
              >
                Criar uma conta
              </Text>
            </Div>
          </Div>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
