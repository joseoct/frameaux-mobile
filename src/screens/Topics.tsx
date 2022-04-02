import React, { useEffect, useState } from 'react';
import { Flex, HStack, VStack, Text, Box, FlatList } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../services/api';
import { Header } from '../components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useGetTopicsByTechnology } from '../services/hooks/topics/useGetTopicsByTechnology';
import { useGetStudentTechnology } from '../services/hooks/studentTechnology/useGetStudentTechnology';

interface RouteParams {
  technologyId: string;
  technologyName: string;
  technologyImage: string;
}

interface Topic {
  id: string;
  name: string;
  layer: number;
}

export default function Topics() {

  const routes = useRoute();
  const navigation = useNavigation();

  const { technologyId, technologyName, technologyImage } = routes.params as RouteParams;

  const { data: topicsLayered } = useGetTopicsByTechnology(technologyId);

  const { data: studentTechnology } = useGetStudentTechnology(technologyId);

  return (
    <>
      <Header title="Tópicos de" subtitle={technologyName} technologyImage={technologyImage}/>

      <Flex flex={1}>
        <FlatList
          data={topicsLayered?.layerTopics}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: topicsLayered, index }) => (
            <VStack p={4} alignItems="center">

              {studentTechnology && studentTechnology.current_layer + 1 === index && (
                <Text pb={4}>Complete os tópicos anteriores para liberar mais conteúdo !</Text>
              )}

              <HStack space={4}>
                {topicsLayered.map((topic: Topic) => (
                  <TouchableOpacity
                    disabled={
                      studentTechnology &&
                      Math.floor(topic.layer) > studentTechnology?.current_layer
                    }
                    key={topic.id}
                  >
                    <Box
                      alignItems="center"
                      justifyContent="center"
                      w={100}
                      h={100}
                      bg={
                        studentTechnology &&
                        Math.floor(topic.layer) >
                          studentTechnology?.current_layer
                          ? 'gray.500'
                          : 'gray.800'
                      }
                      rounded="full"
                      key={topic.id}
                    >
                      <Text>{topic.name}</Text>
                    </Box>
                  </TouchableOpacity>
                ))}
              </HStack>
            </VStack>
          )}
        />
      </Flex>
    </>
  );
}
