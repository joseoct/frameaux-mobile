import React, { useEffect, useState } from 'react';
import { Button, HStack, Text } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetExercisesByTopicAndDifficulty } from '../services/hooks/exercises/useGetExercisesByTopicAndDifficulty';
import { Header } from '../components/Header';
import { api } from '../services/api';

interface RouteParams {
  topicId: string;
  difficulty: number;
}

interface Exercise {
  id: string;
  question: string;
  answer: string[];
  correct_answer: string;
}

export default function Exercises() {
  const routes = useRoute();
  const navigation = useNavigation();

  const { topicId, difficulty } = routes.params as RouteParams;

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    async function loadExercises() {
      const { data } = await api.get<Exercise[]>(
        `/technologies/topics/${topicId}/${difficulty.toString()}`,
      );

      setExercises(data);
      setCurrentExercise(data[0]);
    }

    loadExercises();
  }, [])

  function handleNextExercise () {
    const nextIndex = exercises.findIndex(exercise => exercise.id === currentExercise?.id) + 1;

    if (nextIndex >= exercises.length) {
      console.log('parabens !');
    }

    setCurrentExercise(exercises[nextIndex]);
  }


  return (
    <>
      <Header
        title="Exercícios de"
        subtitle="Maneiros"
      />

      <Button onPress={() => navigation.goBack()}>Voltar</Button>

      <Text>{currentExercise?.question}</Text>

      <Button onPress={() => handleNextExercise()}>Próximo</Button>
      
    </>

  )
}
