import React, { useCallback } from 'react';
import {
  HStack,
  VStack,
  Text,
  Image,
  Flex,
  FlatList,
  Heading,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { Header } from '../components/Header';
import { useGetTechnologiesByUser } from '../services/hooks/technologies/useGetTechnologiesByUser';
import { useGetTechnologies } from '../services/hooks/technologies/useGetTechnologies';

export default function Dashboard() {
  const { user } = useAuth();

  const navigation = useNavigation();

  const { data: userTechnologies, refetch: refetchUserTechnologies } = useGetTechnologiesByUser();

  const { data: technologies, refetch: refetchTechnologies } = useGetTechnologies();

  useFocusEffect(
    useCallback(() => {
      refetchUserTechnologies();
      refetchTechnologies();
    }, [])
  )

  return (
    <>
      <Header title="Bem vindo," subtitle={user.name.split(" ")[0]} icon="log-out" />

      {userTechnologies && userTechnologies.length > 0 && (
        <VStack mt={8}>
          <Flex alignItems="center">
            <Heading fontSize="xl">Continue aprendendo !</Heading>
          </Flex>

          <FlatList
            contentContainerStyle={{ paddingRight: 16 }}
            p={4}
            horizontal
            data={userTechnologies}
            keyExtractor={(technology) => technology.id}
            renderItem={({ item: technology }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Topics', {
                    technologyId: technology.id,
                    technologyName: technology.name,
                    technologyImage: technology.technology_image,
                  })
                }
              >
                <Flex
                  rounded={4}
                  alignItems="center"
                  p={8}
                  mr={2}
                  bg="gray.800"
                  key={technology.id}
                >
                  <Image
                    h={70}
                    w={70}
                    alt="Ícone da tecnologia"
                    source={{
                      uri: technology.technology_image,
                    }}
                  />
                  <Text fontWeight={700} textAlign="center">
                    {technology.name}
                  </Text>
                </Flex>
              </TouchableOpacity>
            )}
          />
        </VStack>
      )}

      <VStack mt={8}>
        <Flex alignItems="center">
          <Heading fontSize="xl">Tecnologias para você aprender !</Heading>
        </Flex>

        <FlatList
          p={4}
          data={technologies}
          keyExtractor={(technology) => technology.id}
          renderItem={({ item: technology }) => (
            <TouchableOpacity
              disabled={userTechnologies?.some(
                (userTechnology) => userTechnology.id === technology.id,
              )}
              onPress={() =>
                navigation.navigate('VerifyLevel', {
                  technologyId: technology.id,
                  technologyName: technology.name,
                  technologyImage: technology.technology_image,
                })
              }
            >
              {!userTechnologies?.some(
                (userTechnology) => userTechnology.id === technology.id,
              ) && (
                <HStack
                  alignItems="center"
                  space={4}
                  p={4}
                  bg="gray.800"
                  mb={2}
                  rounded={4}
                  key={technology.id}
                >
                  <Image
                    h={8}
                    w={8}
                    alt="Ícone da tecnologia"
                    source={{
                      uri: technology.technology_image,
                    }}
                  />
                  <Text fontWeight={700}>{technology.name}</Text>
                </HStack>
              )}
            </TouchableOpacity>
          )}
        />
      </VStack>
    </>
  );
}
