import { useQuery } from "react-query";
import { api } from "../../api";

type UserTechnology = {
  id: string;
  user_id: string;
  technology_id: string;
  current_layer: number;
}

async function getStudentTechnology(technologyId: string): Promise<UserTechnology> {
  const { data } = await api.get<UserTechnology>(`/students-technologies/${technologyId}`);

  return data;
}

export function useGetStudentTechnology(technologyId: string) {
  return useQuery(['student-technology', technologyId], () => getStudentTechnology(technologyId));
}

