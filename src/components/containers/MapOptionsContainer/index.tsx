import { useState } from 'react'

// Types
import { ProjectInterface } from '../../../context/App/types'

// Components
import { Filter, Legend, Basemap } from './components'

function MapOptionsContainer({ projects, visible }: { projects: ProjectInterface[], visible: boolean }) {
  const [state, setState] = useState<{ activeBtn: "Filter" | "Legend" | "Basemap" | null }>({ activeBtn: null })

  if(!visible) return null

  return (
    <div className="absolute flex flex-col bottom-4 right-4 gap-4 xl:bottom-10 xl:right-10">
      <Basemap
        active={state.activeBtn === "Basemap"}
        handleBtnClick={() => setState(prevState => ({ activeBtn: prevState.activeBtn !== "Basemap" ? "Basemap" : null }))} />
      <Legend
        active={state.activeBtn === "Legend"}
        handleBtnClick={() => setState(prevState => ({ activeBtn: prevState.activeBtn !== "Legend" ? "Legend" : null }))}  />
      <Filter 
        projects={projects}
        active={state.activeBtn === "Filter"}
        handleBtnClick={() => setState(prevState => ({ activeBtn: prevState.activeBtn !== "Filter" ? "Filter" : null }))} />
    </div>
  )
}

export default MapOptionsContainer