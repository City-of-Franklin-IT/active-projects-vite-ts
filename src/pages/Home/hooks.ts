import { useQuery } from "react-query"
import { getProjects } from "../../context/App/AppActions"

/**
* Get active capital projects
**/
export const useGetProjects = () => {
  
  return useQuery('getProjects', () => getProjects(), { staleTime: Infinity })
}