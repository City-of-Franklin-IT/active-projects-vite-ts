import { useState } from "react"
import { handleProjectSelection } from "./utils"

// Types
import { ProjectInterface } from "../../../context/App/types"
import { MapHit } from "../../map/ProjectsMap/types"

// Components
import ProjectsMap from "../../map/ProjectsMap"
import Popup from "../../map/popup/Popup"
import MapTitle from "../../map/title/MapTitle"
import MapOptionsContainer from "../MapOptionsContainer"

function MapContainer({ projects }: { projects: ProjectInterface[] }) {
  const [state, setState] = useState<{ selection: string | null }>({ selection: null })

  const selectedProject = projects.find(project => project.uuid == state.selection)

  return (
    <div className="w-full h-full overflow-hidden touch-none">
      <MapTitle visible={!state.selection} />
      <ProjectsMap 
        projects={projects}
        handleProjectSelection={(e: MapHit) => handleProjectSelection(e, setState)} 
        closePopup={state.selection ? () => setState(prevState => ({ ...prevState, selection: null })) : undefined} />
      <MapOptionsContainer 
        projects={projects}
        visible={!state.selection} />
      <Popup 
        project={selectedProject}
        closePopup={() => setState(prevState => ({ ...prevState, selection: null }))} />
    </div>
  )
}

export default MapContainer