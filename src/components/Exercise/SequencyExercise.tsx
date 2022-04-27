import React, { useEffect, useState } from 'react';
import { Button, HStack, Stack, Box, Text, VStack, ScrollView } from 'native-base';

import { shuffleArray } from '../../utils/arrayUtils';

import { ISequencyExercise } from '../Exercise/index';

import Lines from '../Lines';

interface SequencyExerciseProps {
  exercise: ISequencyExercise;
  onVerifyAnswer: (correct: boolean) => void;
}

export function SequencyExercise({ exercise, onVerifyAnswer }: SequencyExerciseProps) {

  const [userAnswer, setUserAnswer] = useState<string[]>([]);

  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shuffledAnswers = shuffleArray(exercise.correct_answer);

    setUserAnswer([]);
    setAnswers(shuffledAnswers);
  }, [exercise]);

  const [cancelButtons, setCancelButtons] = useState(false);

  function handleAddToSequency(answer: string) {
    setUserAnswer([...userAnswer, answer]);

    const filteredAnswers = answers.filter(a => a !== answer);

    setAnswers(filteredAnswers);
  }

  function handleSubToSequency(answer: string) {
    setAnswers([...answers, answer]);

    const filteredUserAnswers = userAnswer.filter(a => a !== answer);

    setUserAnswer(filteredUserAnswers);
  }

  function handleVerifyAnswer() {
    if (JSON.stringify(userAnswer) === JSON.stringify(exercise.correct_answer)) {
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

        <Lines
          handleOnSubToSequency={handleSubToSequency}
          userAnswer={userAnswer}
        />

        <HStack flexWrap="wrap">
          {answers.map((answer, index) => (
            <Button
              m={0.5}
              _text={{
                color: 'gray.300',
              }}
              onPress={() => handleAddToSequency(answer)}
              key={index}
            >
              {answer}
            </Button>
          ))}
        </HStack>
      </VStack>

      <Stack m={2}>
        <Button onPress={handleVerifyAnswer} colorScheme="green">
          Verificar
        </Button>
      </Stack>
    </>
  );
}
