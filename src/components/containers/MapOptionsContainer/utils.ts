// Types
import { AnimationGeneratorType } from 'motion'
import * as AppTypes from '@/context/App/types'

// Icons
import facilitiesIcon from '@/assets/markers/Facilities.svg'
import parksIcon from '@/assets/markers/Parks.svg'
import stormwaterIcon from '@/assets/markers/Stormwater.svg'
import transportationIcon from '@/assets/markers/Transportation.svg'
import waterIcon from '@/assets/markers/Water.svg'
import filterIcon from '@/assets/icons/filter/filter.svg'
import filterHoveredIcon from '@/assets/icons/filter/filter-hovered.svg'
import legendIcon from '@/assets/icons/map-legend/map-legend.svg'
import legendHoveredIcon from '@/assets/icons/map-legend/map-legend-hovered.svg'
import basemapIcon from '@/assets/icons/basemap/basemap.svg'
import basemapHoveredIcon from '@/assets/icons/basemap/basemap-hovered.svg'

export const setFilterOptions = (projects: AppTypes.ProjectInterface[]) => {
  const options = [ ...new Set(projects.map(project => project.type)) ]

  return options.sort((a, b) => a.localeCompare(b))
}

type MapOptionsContainerIconType =
  | 'filter'
  | 'hovered filter'
  | 'legend'
  | 'hovered legend'
  | 'basemap'
  | 'hovered basemap'

export const iconSrcMap = new Map<AppTypes.ProjectType|MapOptionsContainerIconType, string>([
  ['Facilities', facilitiesIcon],
  ['Parks', parksIcon],
  ['Stormwater', stormwaterIcon],
  ['Transportation', transportationIcon],
  ['Water Management', waterIcon],
  ['filter', filterIcon],
  ['hovered filter', filterHoveredIcon],
  ['legend', legendIcon],
  ['hovered legend', legendHoveredIcon],
  ['basemap', basemapIcon],
  ['hovered basemap', basemapHoveredIcon]
])

export const legendOptions: AppTypes.ProjectType[] = [
  'Facilities',
  'Parks',
  'Stormwater',
  'Transportation',
  'Water Management'
]

export const basemapOptions: AppTypes.BasemapType[] = [
  'dark-gray-vector',
  'gray-vector',
  'navigation-3d',
  'navigation-dark-3d',
  'satellite',
  'streets-night-vector',
  'streets-relief-vector',
  'streets-vector',
  'topo-vector'
]

export const motionProps = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  },
  transition: {
    type: "spring" as AnimationGeneratorType,
    stiffness: 300,
    damping: 25,
    mass: 0.8
  }
}

export type MapOptionsContainerBtnsType =
  | "Basemap"
  | "Legend"
  | "Filter"