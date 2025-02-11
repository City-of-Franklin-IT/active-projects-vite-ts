import { useEffect, useRef, useState, useContext } from "react"
import AppContext from "../../../context/App/AppContext"
import { setMapView } from './utils'
import { useFilterProjects } from './hooks'

// Types
import MapView from "@arcgis/core/views/MapView"
import { ProjectInterface } from "../../../context/App/types"
import { MapHit } from "./types"

function ProjectsMap({ projects, handleProjectSelection, closePopup }: { projects: ProjectInterface[], handleProjectSelection: (e: MapHit) => void, closePopup: (() => void) | undefined }) {
  const { basemap } = useContext(AppContext)

  const [state, setState] = useState<{ view: MapView  | null }>({ view: null })

  const mapRef = useRef<HTMLDivElement>(null)

  const filteredProjects = useFilterProjects(projects)

  useEffect(() => {
    setMapView(filteredProjects, basemap, mapRef, setState, handleProjectSelection, closePopup)

    return () => {
      if(state.view) {
        state.view.destroy
      }
    }
  }, [filteredProjects, handleProjectSelection, basemap])

  return (
    <div className="w-full h-full" ref={mapRef}></div>
  )
}

export default ProjectsMap