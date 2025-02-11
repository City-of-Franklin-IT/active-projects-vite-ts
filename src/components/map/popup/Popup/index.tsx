// Types
import { ProjectInterface } from '../../../../context/App/types'

// Components
import { PopupHeader, ManagerBadge, TypeBadge, ProjectDescription, ProjectUpdate, ProjectSpending, CloseBtn } from './components'

function Popup({ project, closePopup }: { project: ProjectInterface | undefined, closePopup: () => void }) {
  if(!project) return null

  return (
    <div className="absolute flex flex-col gap-6 text-neutral-content font-jura bottom-[2%] left-[50%] translate-x-[-50%] bg-neutral/50 max-h-[80%] w-[90%] p-6 pt-0 items-center shadow-xl overflow-x-hidden overflow-y-scroll z-10 backdrop-blur-sm xl:max-w-[40%] xl:left-[2%] xl:bottom-[10%] xl:translate-x-0">
      <PopupHeader
        name={project.name}
        link={project.link} />
      <div className="flex flex-col justify-center items-center gap-2 pt-3 m-auto w-fit xl:flex-row xl:gap-6">
        <ManagerBadge name={project.manager} />
        <TypeBadge type={project.type} />
      </div>
      <ProjectDescription projectDescription={project.projectDescription} />
      <ProjectUpdate projectUpdates={project.Updates} />
      <ProjectSpending 
        projectSpending={project.Spending}
        approvedBudget={project.approvedBudget} />
      <CloseBtn handleClick={closePopup} />
    </div>
  )
}

export default Popup