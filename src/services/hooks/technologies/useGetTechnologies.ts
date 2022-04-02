import { useQuery } from "react-query";
import { api } from "../../api";

type User = {
  id: string;
  name: string;
}

type UserTechnology = {
  user: User;
}

type TechnologiesResponse = {
  id: string;
  name: string;
  technology_image: string;
  UserTechnology: UserTechnology[];
}

async function getTechnologies(): Promise<TechnologiesResponse[]> {
  const { data } = await api.get<TechnologiesResponse[]>('/technologies')

  return data; 
}

export function useGetTechnologies() {
  return useQuery(['technologies'], () => getTechnologies(), {
    staleTime: 5000,
  });
}

