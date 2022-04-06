import React from 'react';

import { Text, ScrollView, useToast, Icon, HStack, Button } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Header } from '../components/Header';
import { Topic } from './Topics';
import { api } from '../services/api';

interface RouteParams {
  topic: Topic
}

export default function ExerciseExplanation() {

  const routes = useRoute();
  const navigator = useNavigation();
  const toast = useToast();

  const { topic } = routes.params as RouteParams;

  async function handleCreateStudentTopic() {
    try {
      await api.post(`/students-topics/${topic.id}`);

      navigator.navigate('Exercises', { topicId: topic.id, difficulty: 1 });
    } catch (error) {

      toast.show({
        title: 'Erro ao se conectar ao tópico',
        status: 'error',
      })
    }
  }

  function handleGoToExercises() {
    navigator.navigate('Exercises', {
      topicId: topic.id,
      difficulty: topic.UserTopic[0]?.current_difficulty,
    });
  }

  return (
    <>
      <Header
        title="Explicação de"
        subtitle={topic.name}
      />

      <HStack bg="gray.800" p={2} alignItems="center" justifyContent="space-between">
        <Icon
          onPress={() => navigator.goBack()}
          color="gray.500"
          as={<Feather name="x" />}
        />

        <Button
          variant="link"
          onPress={
            topic.UserTopic[0]?.current_difficulty > 0
              ? handleGoToExercises
              : handleCreateStudentTopic
          }
        >
          {topic.UserTopic[0]?.current_difficulty === 4
            ? 'Revisar tópico'
            : topic.UserTopic[0]?.current_difficulty
            ? 'Continuar praticando'
            : 'Começar tópico !'}
        </Button>
      </HStack>

      <ScrollView p={4}>
        <Text>{topic.explanation}</Text>
      </ScrollView>
      
    </>
  );
}
