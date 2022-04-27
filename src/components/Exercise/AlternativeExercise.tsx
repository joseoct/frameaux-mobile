import React, { useEffect } from 'react';
import { Button, Stack, ScrollView, Text, VStack } from 'native-base';
import { IAlternativeExercise } from '../Exercise/index';

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
        <ScrollView
          flex={1}
          color="gray.100"
          fontFamily="mono"
          fontSize={16}
          background="gray.900"
          borderWidth={1}
          borderColor="gray.600"
          px={2}
        >
          <Text>
            {exercise.question}
          </Text>
        </ScrollView>

        <Button.Group w="100%" direction="column">
          {exercise.answer.map((item, index) => (
            <Button
              key={item}
              _text={{
                textAlign: 'center',
                color:
                  userAnswer === item ? 'gray.300' : 'purple.500',
              }}
              variant={userAnswer === item ? 'solid' : 'outline'}
              onPress={() => handleUserAnswer(item)}
            >
              {item}
            </Button>
          ))}
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
