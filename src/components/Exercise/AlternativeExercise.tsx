import React, { useEffect } from 'react';
import { Button, Stack, TextArea, Text, VStack, HStack, useContrastText, Box } from 'native-base';
import { IAlternativeExercise } from '../Exercise/index';
import { Animated } from 'react-native';

interface AlternativeExerciseProps {
  exercise: IAlternativeExercise;
  onVerifyAnswer: (correct: boolean) => void;
}

export function AlternativeExercise({ exercise, onVerifyAnswer }: AlternativeExerciseProps) {

  const [userAnswer, setUserAnswer] = React.useState('');

  const [cancelButtons, setCancelButtons] = React.useState(false);

  useEffect(() => {
    setUserAnswer('');
  }, [exercise]);

  function handleUserAnswer(userAnswer: string) {
    setUserAnswer(userAnswer);
  }

  function handleVerifyAnswer() {
    if (userAnswer === exercise.correct_answer) {
      onVerifyAnswer(true);
    } else {
      onVerifyAnswer(false);
    }
  }

  return (
    <>
      <VStack flex={1} m={2} space={2}>
        <TextArea
          totalLines={16}
          color="gray.100"
          fontFamily="mono"
          fontSize={16}
          background="gray.900"
          value={exercise.question}
          isDisabled
        />

        <Button.Group w="100%" direction="column">
          <Button
            _text={{
              color:
                userAnswer === exercise.answer[0] ? 'gray.300' : 'purple.500',
            }}
            variant={userAnswer === exercise.answer[0] ? 'solid' : 'outline'}
            onPress={() => handleUserAnswer(exercise.answer[0])}
          >
            {exercise.answer[0]}
          </Button>
          <Button
            _text={{
              color:
                userAnswer === exercise.answer[1] ? 'gray.300' : 'purple.500',
            }}
            variant={userAnswer === exercise.answer[1] ? 'solid' : 'outline'}
            onPress={() => handleUserAnswer(exercise.answer[1])}
          >
            {exercise.answer[1]}
          </Button>
          <Button
            _text={{
              color:
                userAnswer === exercise.answer[2] ? 'gray.300' : 'purple.500',
            }}
            variant={userAnswer === exercise.answer[2] ? 'solid' : 'outline'}
            onPress={() => handleUserAnswer(exercise.answer[2])}
          >
            {exercise.answer[2]}
          </Button>
          <Button
            _text={{
              color:
                userAnswer === exercise.answer[3] ? 'gray.300' : 'purple.500',
            }}
            variant={userAnswer === exercise.answer[3] ? 'solid' : 'outline'}
            onPress={() => handleUserAnswer(exercise.answer[3])}
          >
            {exercise.answer[3]}
          </Button>
        </Button.Group>
      </VStack>

      <Stack m={2}>
        <Button onPress={handleVerifyAnswer} colorScheme="green">
          Verificar
        </Button>
      </Stack>
    </>
  );
}
