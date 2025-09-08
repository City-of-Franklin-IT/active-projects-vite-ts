import { motion } from 'motion/react'
import { useHandlePopup } from './hooks'
import { motionProps } from './utils'

// Components
import * as Components from './components'

function Popup() {
  const { project, visible } = useHandlePopup()

  if(!visible) return

  return (
    <motion.div 
      className="absolute flex flex-col gap-6 text-neutral-content font-jura bottom-[2%] left-[50%] translate-x-[-50%] bg-neutral/50 max-h-[80%] w-[90%] p-6 pt-0 items-center shadow-xl overflow-x-hidden overflow-y-scroll z-10 backdrop-blur-sm xl:max-w-[40%] xl:left-[2%] xl:bottom-[10%] xl:translate-x-0"
      { ...motionProps }
    >
      <Components.PopupHeader project={project} />
      <div className="flex flex-col justify-center items-center gap-2 pt-3 m-auto w-fit xl:flex-row xl:gap-6">
        <Components.ManagerBadge name={project?.manager} />
        <Components.TypeBadge type={project?.type} />
      </div>
      <Components.ProjectPhase phase={project?.Phases.length ? project.Phases[0].phase : undefined} />
      <Components.ProjectDescription projectDescription={project?.projectDescription} />
      <Components.ProjectUpdate projectUpdates={project?.Updates} />
      <Components.CloseBtn />
    </motion.div>
  )
}

export default Popup