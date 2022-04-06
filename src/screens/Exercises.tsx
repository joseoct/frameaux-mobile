import React, { useEffect, useState } from 'react';
import { Button, Box, HStack, Icon, Progress, Text, VStack, Stack, View } from 'native-base';
import { Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../services/api';
import { Exercise, IAlternativeExercise, ISequencyExercise } from '../components/Exercise';
import { Feather } from '@expo/vector-icons';

interface RouteParams {
  topicId: string;
  difficulty: number; 
}

export default function Exercises() {
  const routes = useRoute();
  const navigation = useNavigation();

  const { topicId, difficulty } = routes.params as RouteParams;

  const [exercises, setExercises] = useState<(IAlternativeExercise | ISequencyExercise)[]>([]);

  const [currentExercise, setCurrentExercise] = useState<IAlternativeExercise | ISequencyExercise>({} as IAlternativeExercise | ISequencyExercise);

  const [isCorrect, setIsCorrect] = useState<boolean>();

  const [attention, setAttention] = useState<boolean>(false);

  const animated = React.useRef(new Animated.Value(200)).current;
  const duration = 500;

  useEffect(() => {
    async function loadExercises() {
      const { data } = await api.get<(IAlternativeExercise | ISequencyExercise)[]>(
        `/technologies/topics/${topicId}/${difficulty.toString()}`,
      );

      setExercises(data);
      setCurrentExercise(data[0]);
    }

    loadExercises();
  }, [])

  async function handleNextExercise () {

    const currentIndex = exercises.findIndex(exercise => exercise.id === currentExercise.id);

    if (isCorrect) {

      const nextIndex = currentIndex + 1;

      if (nextIndex === exercises.length) {
        if (difficulty < 4) {
          await api.patch(`/students-topics/${topicId}`, {
            attention,
          });

          setAttention(false);
        }

        navigation.goBack();
      }

      setCurrentExercise(exercises[nextIndex]);
    } else {
      const exercisesFiltered = exercises.filter(exercise => exercise.id !== currentExercise.id);

      const newExercises = [...exercisesFiltered, currentExercise];

      setAttention(true);

      setExercises(newExercises);

      setCurrentExercise(newExercises[currentIndex]);
    }

    Animated.timing(animated, {
      toValue: 200,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }

  function handleVerifyAnswer(correct: boolean) {
    setIsCorrect(correct);

    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }

  return (
    <>
      <View flex={1}>
        <HStack alignItems="center" p={4} pt={8}>
          <Icon
            onPress={() => navigation.goBack()}
            color="gray.500"
            as={<Feather name="x" />}
          />
          <Box w="90%" maxW="400">
            <Progress
              value={
                (exercises.findIndex(
                  (exercise) => exercise.id === currentExercise?.id,
                ) /
                  exercises.length) *
                100
              }
              mx="4"
              colorScheme="emerald"
            />
          </Box>
        </HStack>

        {currentExercise ? (
          <Exercise
            exercise={currentExercise}
            onVerifyAnswer={handleVerifyAnswer}
            handleNextExercise={handleNextExercise}
          />
        ) : (
          <Text>Não há exercícios deste level</Text>
        )}
      </View>

      <Animated.View
        style={[
          {
            transform: [{ translateY: animated }],
            position: 'absolute',
            bottom: 0,
            width: '100%',
          },
        ]}
      >
        {isCorrect ? (
          <VStack justifyContent="space-between" p={4} h="128px" bg="gray.900">
            <Text fontSize={16} fontWeight="bold" color="green.300">
              É isso ai !
            </Text>
            <Button onPress={handleNextExercise} colorScheme="green">
              Continuar
            </Button>
          </VStack>
        ) : (
          <VStack justifyContent="space-between" p={4} h="160px" bg="gray.900">
            <Text color="red.500">Incorreto.</Text>
            <Text fontSize={16} fontWeight="bold">
              Resposta correta:{' '}
              {currentExercise?.correct_answer instanceof Array
                ? currentExercise?.correct_answer.join(' ')
                : currentExercise?.correct_answer}
            </Text>
            <Button onPress={handleNextExercise} colorScheme="red">
              Vamos lá !
            </Button>
          </VStack>
        )}
      </Animated.View>
    </>
  );
}

