import { motion } from 'motion/react'
import { setFilterOptions, iconSrcMap, legendOptions, motionProps } from './utils'
import { useHandleMapOption, useHandleFilterOption } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

type FilterProps = { projects: AppTypes.ProjectInterface[], active: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }

export const Filter = (props: FilterProps) => {
  const { btnProps, iconSrc } = useHandleMapOption('filter', props.active, props.onClick)

  return (
    <div className="relative flex gap-2 items-end h-fit mt-dauto">
      <FilterOptions 
        projects={props.projects}
        visible={props.active} />
      <button
        type="button"
        value="Filter"
        { ...btnProps }>
          <div className="flex flex-col items-center gap-1">
            <span className="uppercase">Filter</span>
            <img src={iconSrc} alt="filter icon" className="w-10" />
          </div>
      </button>
    </div>
  )
}

type LegendProps = { active: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }

export const Legend = (props: LegendProps) => {
  const { btnProps, iconSrc } = useHandleMapOption('legend', props.active, props.onClick)

  return (
    <div className="relative flex gap-2 items-end h-fit mt-auto">
      <LegendOptions visible={props.active} />
      <button
        type="button"
        value="Legend"
        { ...btnProps }>
          <div className="flex flex-col gap-1 items-center">
            <span className="uppercase">Legend</span>
            <img src={iconSrc} alt="legend icon" className="w-10" />
          </div>
      </button>
    </div>
  )
}

type FilterOptionsProps = { projects: AppTypes.ProjectInterface[], visible: boolean }

const FilterOptions = (props: FilterOptionsProps) => {
  if(!props.visible) return null

  const options = setFilterOptions(props.projects)

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
  const { btnProps, iconProps } = useHandleFilterOption(type)

  return (
    <button
      type="button"
      { ...btnProps }>
        <div className="flex justify-between gap-6 items-center w-full">
          <span className="text-[jura] text-neutral-content font-bold">{type}</span>
          <img { ...iconProps } />
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
