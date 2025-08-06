import { API_URL } from "../../config"

// Types
import * as AppTypes from '@/context/App/types'

export const getProjects = async (): Promise<{ success: boolean, data: AppTypes.ProjectInterface[] }> => {
  const res = await fetch(`${ API_URL }`)

  return await res.json()
}

export const getProject = async (uuid: string): Promise<{ success: boolean, data: AppTypes.ProjectInterface }> => {
  const res = await fetch(`${ API_URL }/${ uuid }`)

  return await res.json()
}