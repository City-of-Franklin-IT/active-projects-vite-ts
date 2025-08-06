import { motion } from 'motion/react'
import { useHandleMapOptionsContainer } from './hooks'
import { motionProps } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { Filter, Legend, Basemap } from './components'

function MapOptionsContainer({ projects }: { projects: AppTypes.ProjectInterface[] }) {
  const { onClick, activeBtn, visible } = useHandleMapOptionsContainer()

  if(!visible) return null

  return (
    <motion.div 
      className="absolute flex flex-col bottom-4 right-4 gap-4 xl:bottom-10 xl:right-10"
      { ...motionProps }>
      <Basemap
        active={activeBtn === "Basemap"}
        onClick={onClick} />
      <Legend
        active={activeBtn === "Legend"}
        onClick={onClick}  />
      <Filter 
        projects={projects}
        active={activeBtn === "Filter"}
        onClick={onClick} />
    </motion.div>
  )
}

export default MapOptionsContainer