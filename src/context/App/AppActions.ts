const API_URL = import.meta.env.VITE_API_URL

// Types
import type * as AppTypes from '@/context/App/types'

/**
* Get active capital projects
* 
* GET /api/v2/eng/public/active-projects
**/
export const getProjects = async (): Promise<{ success: boolean, data: AppTypes.ProjectInterface[] }> => {
  const res = await fetch(`${ API_URL }`)

  if(!res.ok) throw new Error(res.statusText)

  return await res.json()
}

/**
* Get capital project by uuid
* 
* GET /api/v2/eng/public/active-projects/:uuid
**/
export const getProject = async (uuid: string): Promise<{ success: boolean, data: AppTypes.ProjectInterface }> => {
  const res = await fetch(`${ API_URL }/${ uuid }`)

  if(!res.ok) throw new Error(res.statusText)

  return await res.json()
}