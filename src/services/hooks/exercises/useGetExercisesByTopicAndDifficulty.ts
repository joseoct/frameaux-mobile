import { useQuery } from "react-query";
import { api } from "../../api";

interface Exercise {
  id: string;
  question: string;
  answer: string[];
  correct_answer: string;
}

async function getExercisesByTopicAndDifficulty(
  topicId: string,
  difficulty: number,
): Promise<Exercise[]> {
  const { data } = await api.get<Exercise[]>(
    `/technologies/topics/${topicId}/${difficulty.toString()}`,
  );

  return data;
}

export function useGetExercisesByTopicAndDifficulty(topicId: string, difficulty: number) {
  return useQuery(['exercises', topicId, difficulty], () =>
    getExercisesByTopicAndDifficulty(topicId, difficulty),
  );
}

