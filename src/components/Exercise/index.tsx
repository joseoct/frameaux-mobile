import React from 'react';
import { Text } from 'native-base';

import { AlternativeExercise } from '../Exercise/AlternativeExercise';

export interface IExercise {
  id: string;
  type: string;
  question: string;
}

export interface IAlternativeExercise extends IExercise {
  answer: string[];
  correct_answer: string;
}

export interface ISequencyExercise extends IExercise {
  answer: string[];
  correct_answer: string[];
}

interface ExerciseProps {
  exercise: IAlternativeExercise | ISequencyExercise;
  onVerifyAnswer: (correct: boolean) => void;
}

export function Exercise({ exercise, onVerifyAnswer }: ExerciseProps ) {
  switch (exercise.type) {
    case 'alternative':
      return (
        <AlternativeExercise
          exercise={exercise as IAlternativeExercise}
          onVerifyAnswer={onVerifyAnswer}
        />
      );
    default:
      return <Text>Exercício de sequência</Text>;
  }
}
