import { useQuery } from "react-query"
import { getProjects } from "../../context/App/AppActions"

export const useGetProjects = () => {
  
  return useQuery('getProjects', () => getProjects(), { staleTime: Infinity })
}