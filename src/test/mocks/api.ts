import { faker } from '@faker-js/faker'

// Types
import * as AppTypes from '@/context/App/types'

export const createMockProject = (overrides?: Partial<AppTypes.ProjectInterface>): AppTypes.ProjectInterface => ({
  projectId: faker.number.int({ min: 1, max: 99 }),
  name: faker.company.name(),
  projectDescription: faker.lorem.paragraph(),
  type: faker.helpers.arrayElement(projectTypes),
  manager: faker.internet.email(),
  link: faker.internet.url(),
  approvedBudget: faker.number.int({ min: 10000, max: 1000000 }),
  xCoordinate: faker.number.float(),
  yCoordinate: faker.number.float(),
  uuid: faker.string.uuid(),
  Phases: [createMockPhase()],
  Milestones: Array.from({ length: 3 }).map(() => createMockMilestone()),
  Updates: Array.from({ length: 5 }).map(() => createMockUpdate()),
  ...overrides
})

export const createMockPhase = (overrides?: Partial<AppTypes.Phase>): AppTypes.Phase => ({
  phase: faker.helpers.arrayElement(projectPhases) as AppTypes.ProjectPhaseType,
  parentId: faker.string.uuid(),
  uuid: faker.string.uuid(),
  createdAt: faker.date.anytime().toISOString(),
  ...overrides
})

export const createMockMilestone = (overrides?: Partial<AppTypes.MilestoneInterface>): AppTypes.MilestoneInterface => ({
  milestoneDesc: faker.lorem.words({ min: 1, max: 3 }),
  milestoneEst: faker.date.anytime().toISOString(),
  milestoneRealized: faker.date.anytime().toISOString(),
  parentId: faker.string.uuid(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockUpdate = (overrides?: Partial<AppTypes.UpdateInterface>): AppTypes.UpdateInterface => ({
  projectUpdate: faker.lorem.paragraph(),
  parentId: faker.string.uuid(),
  uuid: faker.string.uuid(),
  createdAt: faker.date.anytime().toISOString(),
  ...overrides
})

const projectTypes: AppTypes.ProjectType[] = [
  'Facilities',
  'Parks',
  'Stormwater',
  'Transportation',
  'Water Management'
]

const projectPhases = ["Design", "ROW", "Construction"]