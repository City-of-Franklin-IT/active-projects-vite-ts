import { useContext, useState } from 'react'
import { setFilterOptions, setIconSrc } from './utils'
import { useHandleFilterOptionBtnClick } from './hooks'

// Icons
import filterIcon from '../../../assets/icons/filter/filter.svg'
import filterHoveredIcon from '../../../assets/icons/filter/filter-hovered.svg'
import legendIcon from '../../../assets/icons/map-legend/map-legend.svg'
import legendHoveredIcon from '../../../assets/icons/map-legend/map-legend-hovered.svg'
import basemapIcon from '../../../assets/icons/basemap/basemap.svg'
import basemapHoveredIcon from '../../../assets/icons/basemap/basemap-hovered.svg'

// Types
import { ProjectInterface, ProjectTypeEnum } from '../../../context/App/types'
import { BasemapEnum } from '../MapContainer/types'
import AppContext from '../../../context/App/AppContext'

export const Filter = ({ projects, active, handleBtnClick }: { projects: ProjectInterface[], active: boolean, handleBtnClick: () => void }) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const icon = state.hovered || active ? filterHoveredIcon : filterIcon

  return (
    <div className="relative flex gap-2 items-end h-fit mt-auto">
      <FilterOptions 
        projects={projects}
        visible={active} />
      <button
        type="button"
        className={`btn rounded-none w-20 h-20 ${ state.hovered || active ? 'btn-warning text-neutral' : 'btn-neutral text-warning' }`}
        onClick={handleBtnClick}
        onMouseEnter={() => setState(({ hovered: true }))}
        onMouseLeave={() => setState(({ hovered: false }))}>
          <div className="flex flex-col items-center gap-1">
            <span className="uppercase">Filter</span>
            <img src={icon} alt="filter icon" className="w-10" />
          </div>
      </button>
    </div>
  )
}

export const Legend = ({ active, handleBtnClick }: { active: boolean, handleBtnClick: () => void }) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const icon = state.hovered || active ? legendHoveredIcon : legendIcon

  return (
    <div className="relative flex gap-2 items-end h-fit mt-auto">
      <LegendOptions visible={active} />
      <button
        type="button"
        className={`btn rounded-none w-20 h-20 ${ state.hovered || active ? 'btn-warning text-neutral' : 'btn-neutral text-warning' }`}
        onClick={handleBtnClick}
        onMouseEnter={() => setState(({ hovered: true }))}
        onMouseLeave={() => setState(({ hovered: false }))}>
          <div className="flex flex-col gap-1 items-center">
            <span className="uppercase">Legend</span>
            <img src={icon} alt="legend icon" className="w-10" />
          </div>
      </button>
    </div>
  )
}

export const Basemap = ({ active, handleBtnClick }: { active: boolean, handleBtnClick: () => void }) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const icon = state.hovered || active ? basemapHoveredIcon : basemapIcon

  return (
    <div className="relative flex gap-2 items-end h-fit mt-auto">
      <BasemapOptions visible={active} />
      <button
        type="button"
        className={`btn rounded-none w-20 h-20 ${ state.hovered || active ? 'btn-warning text-neutral' : 'btn-neutral text-warning' }`}
        onClick={handleBtnClick}
        onMouseEnter={() => setState(({ hovered: true }))}
        onMouseLeave={() => setState(({ hovered: false }))}>
          <div className="flex flex-col gap-1 items-center">
            <span className="uppercase">Basemap</span>
            <img src={icon} alt="basemap icon" className="w-9" />
          </div>
      </button>
    </div>
  )
}

const FilterOptions = ({ projects, visible }: { projects: ProjectInterface[], visible: boolean }) => {
  if(!visible) return null

  const options = setFilterOptions(projects)

  return (
    <div className="absolute flex flex-col gap-2 items-center p-6 bg-neutral right-[120%] bottom-0 w-[240px] xl:w-[300px]">
      <h3 className="font-jura text-warning font-bold uppercase text-center">Filter By Project Type</h3>

      {options.map(option => {
        return (
          <FilterOption
            key={`filter-option-${ option }`} 
            type={option} />
        ) 
      })}
    </div>
  )
}

const FilterOption = ({ type }: { type: ProjectTypeEnum }) => {
  const { filters } = useContext(AppContext)

  const active = !!filters.find(filter => filter === type)

  const handleFilterOptionBtnClick = useHandleFilterOptionBtnClick(active, type)

  return (
    <button
      type="button"
      className={`btn btn-ghost w-full text-start ${ active ? 'opacity-100' : 'opacity-50' }`}
      onClick={handleFilterOptionBtnClick}>
        <div className="flex justify-between gap-6 items-center w-full">
          <span className="text-jura text-neutral-content font-bold">{type}</span>
          <img src={setIconSrc(type)} alt="filter type icon" className={`w-8 ${ active ? 'opacity-100' : 'opacity-50' }`} />
        </div>
    </button>
  )
}

const LegendOptions = ({ visible }: { visible: boolean }) => {
  if(!visible) return null

  const options = Object.values(ProjectTypeEnum)

  return (
    <div className="absolute flex flex-col gap-4 items-center p-6 bg-neutral right-[120%] -bottom-[96px] w-[240px] xl:w-[300px]">
      <h3 className="font-jura text-warning font-bold uppercase text-center">Map Legend</h3>

      {options.map(option => {
        return (
          <LegendOption
            key={`legend-option-${ option }`} 
            type={option} />
        ) 
      })}
    </div>
  )
}

const LegendOption = ({ type }: { type: ProjectTypeEnum }) => {

  return (
    <div className="flex justify-between gap-6 items-center w-full">
      <span className="text-jura text-neutral-content font-bold">{type}</span>
      <img src={setIconSrc(type)} alt="legend type icon" className="w-8" />
    </div>
  )
}

const BasemapOptions = ({ visible }: { visible: boolean }) => {
  if(!visible) return null

  const options = Object.values(BasemapEnum)

  return (
    <div className="absolute flex flex-col gap-2 items-center p-6 bg-neutral right-[120%] -bottom-[192px] w-[240px] xl:w-[300px]">
      <h3 className="font-jura text-warning font-bold uppercase text-center">Basemap</h3>

      {options.map(option => {
        return (
          <BasemapOption
            key={`basemap-option-${ option }`} 
            type={option} />
        ) 
      })}
    </div>
  )
}

const BasemapOption = ({ type }: { type: BasemapEnum }) => {
  const { basemap, dispatch } = useContext(AppContext)

  const active = type === basemap
  
  return (
    <button
      type="button"
      value={type}
      className={`btn btn-ghost w-full ${ active ? 'opacity-100' : 'opacity-50' }`}
      onClick={() => dispatch({ type: 'SET_BASEMAP', payload: type })}>
        <span className="text-jura text-neutral-content font-bold">{type}</span>
    </button>
  )
}