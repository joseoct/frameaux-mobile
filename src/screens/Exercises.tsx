import React from 'react';
import { Button, HStack, Text } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetExercisesByTopicAndDifficulty } from '../services/hooks/exercises/useGetExercisesByTopicAndDifficulty';
import { Header } from '../components/Header';

interface RouteParams {
  topicId: string;
  difficulty: number;
}

export default function Exercises() {
  const routes = useRoute();
  const navigation = useNavigation();

  const { topicId, difficulty } = routes.params as RouteParams;

  const { data: exercises } = useGetExercisesByTopicAndDifficulty(topicId, difficulty);

  return (
    <>
      <Header
        title="Exercícios de"
        subtitle="Maneiros"
      />

      <Button onPress={() => navigation.goBack()}>Voltar</Button>

      {exercises?.map((exercise) => (
        <Text key={exercise.id}>{exercise.question}</Text>
      ))}
      
    </>

  )
}
