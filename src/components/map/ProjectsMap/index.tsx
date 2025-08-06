import { useRef } from "react"
import { useDebounce, useSetMapView, useFilterProjects } from './hooks'

// Types
import { ProjectInterface } from "../../../context/App/types"

function ProjectsMap({ projects }: { projects: ProjectInterface[] }) {
  const mapRef = useRef<HTMLDivElement>(null)

  const filtered = useFilterProjects(projects)

  const debounced = useDebounce(filtered, 500)

  useSetMapView(mapRef as React.RefObject<HTMLDivElement>, debounced)

  return (
    <div className="w-full h-full" ref={mapRef}></div>
  )
}

export default ProjectsMap