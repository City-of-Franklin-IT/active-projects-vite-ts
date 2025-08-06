import React, { useContext, useState } from 'react'
import { motion } from 'motion/react'
import { setFilterOptions, iconSrcMap, legendOptions, basemapOptions, motionProps } from './utils'
import { useHandleFilterOptionBtnClick } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'
import MapCtx from '@/components/map/context'

export const Filter = ({ projects, active, onClick }: { projects: AppTypes.ProjectInterface[], active: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const icon = state.hovered || active ? iconSrcMap.get('hovered filter') : iconSrcMap.get('filter') 

  return (
    <div className="relative flex gap-2 items-end h-fit mt-auto">
      <FilterOptions 
        projects={projects}
        visible={active} />
      <button
        type="button"
        className={`btn rounded-none w-20 h-20 ${ state.hovered || active ? 'btn-warning text-neutral' : 'btn-neutral text-warning' }`}
        value="Filter"
        onClick={onClick}
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

export const Legend = ({ active, onClick }: { active: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const icon = state.hovered || active ? iconSrcMap.get('hovered legend') : iconSrcMap.get('legend')

  return (
    <div className="relative flex gap-2 items-end h-fit mt-auto">
      <LegendOptions visible={active} />
      <button
        type="button"
        className={`btn rounded-none w-20 h-20 ${ state.hovered || active ? 'btn-warning text-neutral' : 'btn-neutral text-warning' }`}
        value="Legend"
        onClick={onClick}
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

export const Basemap = ({ active, onClick }: { active: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const icon = state.hovered || active ? iconSrcMap.get('hovered basemap') : iconSrcMap.get('basemap')

  return (
    <div className="relative flex gap-2 items-end h-fit mt-auto">
      <BasemapOptions visible={active} />
      <button
        type="button"
        className={`btn rounded-none w-20 h-20 ${ state.hovered || active ? 'btn-warning text-neutral' : 'btn-neutral text-warning' }`}
        value="Basemap"
        onClick={onClick}
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

const FilterOptions = ({ projects, visible }: { projects: AppTypes.ProjectInterface[], visible: boolean }) => {
  if(!visible) return null

  const options = setFilterOptions(projects)

  return (
    <motion.div 
      className="absolute flex flex-col gap-2 items-center p-6 bg-neutral right-[120%] bottom-0 w-[240px] xl:w-[300px]"
      { ...motionProps }>
      <h3 className="font-jura text-warning font-bold uppercase text-center">Filter By Project Type</h3>

      {options.map(option => {
        return (
          <FilterOption
            key={`filter-option-${ option }`} 
            type={option} />
        ) 
      })}
    </motion.div>
  )
}

const FilterOption = ({ type }: { type: AppTypes.ProjectType }) => {
  const { filters } = useContext(MapCtx)

  const active = !!filters.find(filter => filter === type)

  const handleFilterOptionBtnClick = useHandleFilterOptionBtnClick(active, type)

  return (
    <button
      type="button"
      className={`btn btn-ghost w-full text-start ${ active ? 'opacity-100' : 'opacity-50' }`}
      onClick={handleFilterOptionBtnClick}>
        <div className="flex justify-between gap-6 items-center w-full">
          <span className="text-[jura] text-neutral-content font-bold">{type}</span>
          <img src={iconSrcMap.get(type)} alt="filter type icon" className={`w-8 ${ active ? 'opacity-100' : 'opacity-50' }`} />
        </div>
    </button>
  )
}

const LegendOptions = ({ visible }: { visible: boolean }) => {
  if(!visible) return null

  return (
    <motion.div 
      className="absolute flex flex-col gap-4 items-center p-6 bg-neutral right-[120%] -bottom-[96px] w-[240px] xl:w-[300px]"
      { ...motionProps }>
      <h3 className="font-jura text-warning font-bold uppercase text-center">Map Legend</h3>

      {legendOptions.map(option => {
        return (
          <LegendOption
            key={`legend-option-${ option }`} 
            type={option} />
        ) 
      })}
    </motion.div>
  )
}

const LegendOption = ({ type }: { type: AppTypes.ProjectType }) => {

  return (
    <div className="flex justify-between gap-6 items-center w-full">
      <span className="text-[jura] text-neutral-content font-bold">{type}</span>
      <img src={iconSrcMap.get(type)} alt="legend type icon" className="w-8" />
    </div>
  )
}

const BasemapOptions = ({ visible }: { visible: boolean }) => {
  if(!visible) return null

  return (
    <motion.div
      data-testid="basemap-options" 
      className="absolute flex flex-col gap-2 items-center p-6 bg-neutral right-[120%] -bottom-[192px] w-[240px] xl:w-[300px]"
      { ...motionProps }>
      <h3 className="font-jura text-warning font-bold uppercase text-center">Basemap</h3>

      {basemapOptions.map(option => {
        return (
          <BasemapOption
            key={`basemap-option-${ option }`} 
            type={option} />
        ) 
      })}
    </motion.div>
  )
}

const BasemapOption = ({ type }: { type: AppTypes.BasemapType }) => {
  const { basemap, dispatch } = useContext(MapCtx)

  const active = type === basemap
  
  return (
    <button
      type="button"
      value={type}
      className={`btn btn-ghost w-full ${ active ? 'opacity-100' : 'opacity-50' }`}
      onClick={() => dispatch({ type: 'SET_BASEMAP', payload: type })}>
        <span className="text-[jura] text-neutral-content font-bold">{type}</span>
    </button>
  )
}