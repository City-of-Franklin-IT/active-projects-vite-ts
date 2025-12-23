import { useQuery } from "react-query"
import { getProjects } from "../../context/App/AppActions"

/**
* Returns active capital projects from server
**/
export const useGetProjects = () => {
  
  return useQuery('getProjects', () => getProjects(), { staleTime: Infinity })
}