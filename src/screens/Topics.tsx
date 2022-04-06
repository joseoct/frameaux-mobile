import React, { useCallback } from 'react';

import { Flex, HStack, VStack, Text, FlatList, Icon, Modal, Button } from 'native-base';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { Header } from '../components/Header';
import { TopicNode } from '../components/TopicNode';

import { useGetTopicsByTechnology } from '../services/hooks/topics/useGetTopicsByTechnology';
import { useGetStudentTechnology } from '../services/hooks/studentTechnology/useGetStudentTechnology';

interface RouteParams {
  technologyId: string;
  technologyName: string;
  technologyImage: string;
}

export interface Topic {
  id: string;
  name: string;
  layer: number;
  explanation: string;
  UserTopic: {
    current_difficulty: number;
  }[]
}

export default function Topics() {

  const routes = useRoute();
  const navigation = useNavigation();

  const { technologyId, technologyName, technologyImage } = routes.params as RouteParams;

  const { data: topicsLayered, refetch: refetchTopicsLayered } = useGetTopicsByTechnology(technologyId);

  const { data: studentTechnologyInfo, refetch: refetchStudentTechnology } = useGetStudentTechnology(technologyId);

  useFocusEffect(
    useCallback(() => {
      refetchStudentTechnology();
      refetchTopicsLayered();
    }, [])
  )

  return (
    <>
      <Header
        title="Tópicos de"
        subtitle={technologyName}
        technologyImage={technologyImage}
      />

      <HStack bg="gray.800" p={4} alignItems="center" justifyContent="space-between">
        <Icon
          onPress={() => navigation.goBack()}
          color="gray.500"
          as={<Feather name="x" />}
        />

        <HStack space={2} alignItems="center">
          <Text color="gray.400">{studentTechnologyInfo?.userCrowns} / {studentTechnologyInfo?.totalCrowns}</Text>
          <FontAwesome5 name="crown" size={24} color="#ffcc00" />
        </HStack>
      </HStack>

      <Flex flex={1}>
        <FlatList
          data={topicsLayered?.layerTopics}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: topicsLayered, index }) => (
            <VStack alignItems="center" p={2}>
              {studentTechnologyInfo?.userTechnology &&
                studentTechnologyInfo?.userTechnology.current_layer + 1 === index && (
                  <Text pb={4}>
                    Complete os tópicos anteriores para liberar mais conteúdo !
                  </Text>
                )}

              <HStack space={4}>
                {topicsLayered.map((topic: Topic) => (
                  <TopicNode
                    topic={topic}
                    studentTechnology={studentTechnologyInfo?.userTechnology}
                    key={topic.id}
                  />
                ))}
              </HStack>
            </VStack>
          )}
        />
      </Flex>
    </>
  );
}
