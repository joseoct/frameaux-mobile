import React, { useEffect, useState } from 'react';
import { Button, Stack, TextArea, VStack } from 'native-base';

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
        <TextArea
          totalLines={16}
          color="gray.100"
          fontFamily="mono"
          fontSize={16}
          background="gray.900"
          value={exercise.question}
          isDisabled
        />

        <Lines handleOnSubToSequency={handleSubToSequency} userAnswer={userAnswer} />

        <Button.Group
          justifyContent="center"
          w="100%"
          direction="row"
        >
          {answers.map((answer, index) => (
            <Button _text={{
              color: "gray.300"
            }} onPress={() => handleAddToSequency(answer)} key={index}>
              {answer}
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
