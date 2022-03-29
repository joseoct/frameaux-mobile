import React, { useCallback, useRef, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { useInterval } from 'usehooks-ts';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

import { Input, Icon, Button, Div, Text } from 'react-native-magnus';
import Logo from '../../components/Logo';

interface SignInFormData {
  email: string;
  password: string;
}

type AbbreviationTechnologies = {
  abbreviation: string;
  color: string;
}

const SignIn: React.FC = () => {

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

  useInterval(() => {
    const cicleTechnology = [...technology];

    const shiftedTechnology = cicleTechnology.shift();

    if (shiftedTechnology) 
      cicleTechnology.push(shiftedTechnology);

    setTechnology(cicleTechnology);
  }, 2000)

  const navigation = useNavigation();
  // const { signIn } = useAuth();

  // const handleSignIn = useCallback(
  //   async (data: SignInFormData) => {
  //     try {
  //       formRef.current?.setErrors({});

  //       const schema = Yup.object().shape({
  //         email: Yup.string()
  //           .required('E-mail é obrigatório')
  //           .email('Digite um e-mail válido'),
  //         password: Yup.string().required('Senha é obrigatória'),
  //       });

  //       await schema.validate(data, { abortEarly: false });

  //       await signIn({
  //         email: data.email,
  //         password: data.password,
  //       });
  //     } catch (err) {
  //       if (err instanceof Yup.ValidationError) {
  //         const errors = getValidationErrors(err);

  //         formRef.current?.setErrors(errors);
  //         return;
  //       }

  //       Alert.alert(
  //         'Erro na autenticação',
  //         'Ocorreu um error ao fazer login, cheque as credenciais.',
  //       );
  //     }
  //   },
  //   [signIn],
  // );

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
          <Container>
            <Div row>
              <Text color="gray600" fontSize={88}>.</Text>
              <Text color={technology[0].color} fontSize={88}>{technology[0].abbreviation}</Text>
            </Div>

            <Logo />

            <Input
              placeholder="E-mail"
              placeholderTextColor="gray300"
              fontSize={16}
              fontFamily="Roboto_500Medium"
              p={10}
              focusBorderColor="purple500"
              borderColor="#181b23"
              borderWidth={2}
              bg="#181b23"
              color="white"
              suffix={
                <Icon
                  name="user"
                  fontSize={18}
                  color="gray300"
                  fontFamily="Feather"
                />
              }
            />

            <Input
              mt="lg"
              secureTextEntry
              placeholder="Senha"
              placeholderTextColor="gray300"
              fontSize={16}
              fontFamily="Roboto_500Medium"
              p={10}
              borderColor="#181b23"
              focusBorderColor="purple500"
              borderWidth={2}
              bg="#181b23"
              color="white"
              suffix={
                <Icon
                  name="key"
                  fontSize={18}
                  color="gray300"
                  fontFamily="Feather"
                />
              }
            />

            <Button
              fontFamily="Roboto_700Bold"
              fontSize={16}
              w="100%"
              mt="lg"
              bg="purple500"
              color="white"
              underlayColor="red600"
            >
              Entrar
            </Button>

            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton> */}
    </>
  );
};

export default SignIn;
