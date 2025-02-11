import { useContext, useMemo } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { ProjectInterface } from "../../../context/App/types"

export const useFilterProjects = (projects: ProjectInterface[]) => {
  const { filters } = useContext(AppContext)

  return useMemo(() => {
    return projects.filter(project => filters.some(filter => filter === project.type))
  }, [filters, projects])
}