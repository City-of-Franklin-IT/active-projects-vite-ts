import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import * as AppActions from '@/context/App/AppActions'
import MapCtx from "../../context"

/**
* Returns popup visibility and selected capital project data
**/
export const useHandlePopup = () => {
  const { selection } = useContext(MapCtx)

  const { data } = useGetProject()

  return { visible: !!selection, project: data?.data }
}

/**
* Returns selected capital project data
**/
const useGetProject = () => {
  const { selection } = useContext(MapCtx)

  return useQuery({
    queryKey: ['getProject', selection],
    queryFn: () => AppActions.getProject(selection),
    enabled: !!selection
  })
}