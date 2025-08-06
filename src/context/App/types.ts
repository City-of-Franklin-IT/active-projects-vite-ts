export interface ProjectInterface {
  projectId: number
  name: string
  projectDescription: string | null
  type: ProjectType
  manager: string | null
  link: string | null
  approvedBudget: number
  xCoordinate: number
  yCoordinate: number
  uuid: string
  Phase: Phase
  Milestones: MilestoneInterface[]
  Updates: UpdateInterface[]
}

export interface UpdateInterface {
  projectUpdate: string
  parentId: string
  uuid: string
  createdAt: string
}

export interface MapHitInterface {
  graphic: {
    attributes: {
      name: string
      uuid: string
    }
  }
}

export type ProjectType =
  | "Facilities"
  | "Parks"
  | "Stormwater"
  | "Transportation"
  | "Water Management"

export type BasemapType =
  | "dark-gray-vector"
  | "gray-vector"
  | "navigation-3d"
  | "navigation-dark-3d"
  | "satellite"
  | "streets-vector"
  | "streets-night-vector"
  | "streets-relief-vector"
  | "topo-vector"

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