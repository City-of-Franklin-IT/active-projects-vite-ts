// Types
import { ProjectInterface, ProjectTypeEnum } from "../../../context/App/types"

// Icons
import facilitiesIcon from '../../../assets/markers/Facilities.svg'
import parksIcon from '../../../assets/markers/Parks.svg'
import stormwaterIcon from '../../../assets/markers/Stormwater.svg'
import transportationIcon from '../../../assets/markers/Transportation.svg'
import waterIcon from '../../../assets/markers/Water.svg'

export const setFilterOptions = (projects: ProjectInterface[]) => {
  const options = [ ...new Set(projects.map(project => project.type)) ]

  return options.sort((a, b) => a.localeCompare(b))
}

export const setIconSrc = (type: ProjectTypeEnum) => {
  
  switch(type) {
    case 'Facilities':
      return facilitiesIcon
    case 'Parks':
      return parksIcon
    case 'Stormwater':
      return stormwaterIcon
    case 'Transportation':
      return transportationIcon
    case 'Water Management':
      return waterIcon
  }
}