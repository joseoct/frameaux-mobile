import React, { useCallback } from 'react';
import { Flex, HStack, VStack, Text, FlatList, Button } from 'native-base';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGetTopicsByTechnology } from '../services/hooks/topics/useGetTopicsByTechnology';
import { useGetStudentTechnology } from '../services/hooks/studentTechnology/useGetStudentTechnology';

import { Header } from '../components/Header';
import { TopicPopover } from '../components/TopicPopover';

interface RouteParams {
  technologyId: string;
  technologyName: string;
  technologyImage: string;
}

interface Topic {
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

  const { data: studentTechnology, refetch: refetchStudentTechnology } = useGetStudentTechnology(technologyId);

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

      <Button onPress={() => navigation.navigate('Dashboard')}>Voltar</Button>

      <Flex flex={1}>
        <FlatList
          data={topicsLayered?.layerTopics}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: topicsLayered, index }) => (
            <VStack p={4} alignItems="center">
              {studentTechnology &&
                studentTechnology.current_layer + 1 === index && (
                  <Text pb={4}>
                    Complete os tópicos anteriores para liberar mais conteúdo !
                  </Text>
                )}

              <HStack space={4}>
                {topicsLayered.map((topic: Topic) => (
                  <TopicPopover
                    topic={topic}
                    studentTechnology={studentTechnology}
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
