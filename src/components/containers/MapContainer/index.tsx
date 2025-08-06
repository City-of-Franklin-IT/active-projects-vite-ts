// Types
import * as AppTypes from '@/context/App/types'

// Components
import ProjectsMap from "../../map/ProjectsMap"
import Popup from "../../map/popup/Popup"
import MapTitle from "../../map/title/MapTitle"
import MapOptionsContainer from "../MapOptionsContainer"

function MapContainer({ projects }: { projects: AppTypes.ProjectInterface[] }) {

  return (
    <div className="w-full h-full overflow-hidden touch-none">
      <MapTitle />
      <ProjectsMap projects={projects} />
      <MapOptionsContainer projects={projects} />
      <Popup />
    </div>
  )
}

export default MapContainer