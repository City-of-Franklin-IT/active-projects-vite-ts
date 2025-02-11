// Types
import { Dispatch } from "react"
import { BasemapEnum } from "../../components/containers/MapContainer/types"

export interface AppState {
  dispatch: Dispatch<AppAction>
  basemap: BasemapEnum
  filters: string[]
}

export type AppAction =
  | { type: 'SET_FILTERS', payload: string[] }
  | { type: 'SET_BASEMAP', payload: BasemapEnum }

export interface ProjectInterface {
  projectId: number
  name: string
  projectDescription: string | null
  type: ProjectTypeEnum
  manager: string | null
  link: string | null
  approvedBudget: number
  xCoordinate: number
  yCoordinate: number
  uuid: string
  Phase: Phase
  Milestones: MilestoneInterface[]
  Updates: UpdateInterface[]
  Spending: SpendingInterface[]
}

export interface GetProjectsResponse {
  success: boolean
  data: ProjectInterface[]
}

export interface UpdateInterface {
  projectUpdate: string
  parentId: string
  uuid: string
  createdAt: string
}

export interface SpendingInterface {
  dollarsSpent: number
  dollarsSpentDate: string
  uuid: string
  createdAt: string
}

export enum ProjectTypeEnum {
  Facilities = "Facilities",
  Parks = "Parks",
  Stormwater = "Stormwater",
  Transportation = "Transportation",
  WaterManagement = "Water Management"
}

interface MilestoneInterface {
  milestoneDesc: string
  milestoneEst: string
  milestoneRealized: string | null
  parentId: string
  uuid: string
}

interface Phase {
  phase: "Design" | "ROW" | "Construction"
  parentId: string
  uuid: string
  createdAt: string
}