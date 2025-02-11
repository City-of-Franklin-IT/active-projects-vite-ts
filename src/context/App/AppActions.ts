import { API_URL } from "../../config"

// Types
import { GetProjectsResponse } from "./types"

export const getProjects = async (): Promise<GetProjectsResponse> => {
  const result = await fetch(`${ API_URL }`)

  return await result.json()
}