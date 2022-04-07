import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { VStack, HStack, Icon, Text, useToast } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { Header } from '../components/Header';

import { api } from '../services/api';

interface RouteParams {
  technologyId: string;
  technologyName: string;
  technologyImage: string;
}

export default function VerifyLevel() {

  const routes = useRoute();
  const navigation = useNavigation();
  const toast = useToast();

  const { technologyId, technologyName, technologyImage } = routes.params as RouteParams;
  
  async function handleCreateStudentTechnology() {
    try {
      await api.post(`/students-technologies/${technologyId}`),

      navigation.navigate('Topics', { technologyId, technologyName, technologyImage });
    } catch (error) {

      toast.show({
        title: 'Erro ao ingressar na tecnologia',
        description: 'Tente novamente',
        status: 'error',
      })
    }
  }

  async function handleCreateTest() {
    try {
      await api.post(`/students-technologies/${technologyId}`),

      navigation.navigate('Exercises', { technologyId });
    } catch (error) {

      toast.show({
        title: 'Erro ao ingressar na tecnologia',
        description: 'Tente novamente',
        status: 'error',
      })
    }
  }

  return (
    <>
      <Header title="Verificar nível em:" subtitle={technologyName} technologyImage={technologyImage}/>

      <VStack space={4} flex={1} justifyContent="center" alignItems="center">
        <TouchableOpacity onPress={handleCreateStudentTechnology}>
          <HStack alignItems="center" maxW={320} borderWidth={1} borderColor="gray.700" py={4}>
            <Icon m={4} color="green.300" as={<Feather name="book"/>}/>

            <Text
              style={{
                flexShrink: 1,
                flexWrap: 'wrap',
              }}
              fontSize={32}
            >
              Quero começar do zero !
            </Text>
          </HStack>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateTest}>
          <HStack alignItems="center" maxW={320} borderWidth={1} borderColor="gray.700" py={4}>
            <Icon m={4} color="green.300" as={<Feather name="book-open"/>}/>

            <Text
              style={{
                flexShrink: 1,
                flexWrap: 'wrap',
              }}
              fontSize={32}
            >
              Já possuo algum conhecimento em {technologyName}
            </Text>
          </HStack>
        </TouchableOpacity>

      </VStack>
    </>
  );
}
