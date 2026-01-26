import { useQuery } from "@tanstack/react-query"
import { getProjects } from "../../context/App/AppActions"

/**
* Returns active capital projects from server
**/
export const useGetProjects = () => {

  return useQuery({
    queryKey: ['getProjects'],
    queryFn: () => getProjects(),
    staleTime: Infinity
  })
}