// Icons
import managerIcon from '@/assets/icons/manager/manager.svg'
import cofIcon from '@/assets/icons/cof/cof.png'
import linkIcon from '@/assets/icons/link/link.svg'
import typeIcon from '@/assets/icons/type/type.svg'

// Types
import * as AppTypes from '@/context/App/types'
import { AnimationGeneratorType } from 'motion'

type IconMapType =
  | "cof"
  | "manager"
  | "link"
  | "type"

export const iconMap = new Map<IconMapType, string>([
  ['cof', cofIcon],
  ['manager', managerIcon],
  ['link', linkIcon],
  ['type', typeIcon]
])

export const motionProps = {
  initial: {
    x: -400,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1
  },
  exit: {
    x: -400,
    opacity: 0
  },
  transition: {
    type: "spring" as AnimationGeneratorType,
    stiffness: 300,
    damping: 25,
    mass: 0.8
  }
}

export const projectPhaseDescriptionMap = new Map<AppTypes.ProjectPhaseType, string>([
  ['Upcoming', 'The project has been approved to proceed, but work has not yet begun.'],
  ['Planning', 'A project’s purpose and objective(s) are refined (i.e., technical studies, master plan, etc.)'],
  ['Design', 'Engineers, architects, and other technical professionals create detailed plans and specifications for the project.'],
  ['Property Acquisition', 'City acquires any land, rights-of-way (ROW), and/or easements that are needed to construct the project.'],
  ['Bidding & Award', 'Following the completion of plans and specifications, preparations are made to publicly advertise the project for construction bids from qualified contractors.'],
  ['Construction', 'Physical work (i.e., building, grading, paving, etc.) at the project site.'],
  ['Closeout', 'Final inspections, corrective actions, paperwork, and administrative tasks are performed following the completion of construction activities.'],
  ['Complete', 'The project is finished, open, and fully operational.']
])