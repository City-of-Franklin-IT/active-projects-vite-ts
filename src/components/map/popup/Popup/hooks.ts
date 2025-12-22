import { useContext } from "react"
import { useQuery } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import MapCtx from "../../context"

/**
* Handles visibility and active project selection, fetches project data
**/
export const useHandlePopup = () => {
  const { selection } = useContext(MapCtx)

  const { data } = useGetProject()

  return { visible: !!selection, project: data?.data }
}

/**
* Gets active project data by uuid when selection is in context
**/
const useGetProject = () => {
  const { selection } = useContext(MapCtx)

  return useQuery(['getProject', selection], () => AppActions.getProject(selection), { enabled: !!selection })
}