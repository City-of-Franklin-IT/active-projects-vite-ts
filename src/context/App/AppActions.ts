import { NODE_ENV } from "../../config"

const API_URL = NODE_ENV === 'development' ? 'https://cofasv38.franklin-gov.com/api/v2/eng/public/active-projects' : 'https://dev.franklintn.gov/api/v2/eng/public/active-projects'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Get active capital projects
* 
* GET /api/v2/eng/public/active-projects
**/
export const getProjects = async (): Promise<{ success: boolean, data: AppTypes.ProjectInterface[] }> => {
  const res = await fetch(`${ API_URL }`)

  return await res.json()
}

/**
* Get capital project by uuid
* 
* GET /api/v2/eng/public/active-projects/:uuid
**/
export const getProject = async (uuid: string): Promise<{ success: boolean, data: AppTypes.ProjectInterface }> => {
  const res = await fetch(`${ API_URL }/${ uuid }`)

  return await res.json()
}