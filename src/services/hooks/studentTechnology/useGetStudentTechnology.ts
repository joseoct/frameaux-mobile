import { useQuery } from "react-query";
import { api } from "../../api";

type UserTechnology = {
  id: string;
  user_id: string;
  technology_id: string;
  current_layer: number;
}

type Response = {
  userTechnology: UserTechnology;
  userCrowns: number;
  totalCrowns: number;
}

async function getStudentTechnology(technologyId: string): Promise<Response> {
  const { data } = await api.get<Response>(`/students-technologies/${technologyId}`);

  return data;
}

export function useGetStudentTechnology(technologyId: string) {
  return useQuery(['student-technology', technologyId], () => getStudentTechnology(technologyId));
}

