import { useContext } from 'react'
import MapCtx from '../../context'
import { iconMap, projectPhaseDescriptionMap } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const PopupHeader = ({ project }: { project: AppTypes.ProjectInterface | undefined }) => {

  return (
    <div className="sticky flex flex-col gap-2 items-center py-3 px-8 bg-neutral border-2 border-neutral/50 border-r-warning border-b-warning border-l-warning m-auto w-fit top-0 left-0 rounded-b-xl shadow-2xl">
      <img src={iconMap.get('cof')} alt="cof icon" className="w-16" />
      <p className="text-warning text-xl font-bold uppercase text-center">{project?.name}</p>
      <ProjectLink href={project?.link} />
    </div>
  )
}

export const ManagerBadge = ({ name }: { name: string | null | undefined }) => {
  if(!name) return null

  return (
    <div className="flex gap-2 justify-around text-neutral-content px-2 py-3 w-fit">
      <div className="flex gap-2 justify-around w-fit">
        <img src={iconMap.get('manager')} alt="manager icon" className="w- xl:w-14" />
        <div className="flex flex-col items-center text-sm m-auto w-fit whitespace-nowrap">
          <small>Project Manager:</small>
          <div className="uppercase">{name}</div>
        </div>
      </div>
    </div>
  )
}

export const TypeBadge = ({ type }: { type: string | undefined }) => {

  return (
    <div className="flex gap-2 justify-around text-neutral-content px-2 py-3 w-fit">
      <div className="flex gap-2 justify-around w-fit">
        <img src={iconMap.get('type')} alt="project type icon" className="w-10 xl:w-14" />
        <div className="flex flex-col items-center text-sm m-auto w-fit whitespace-nowrap">
          <small>Project Type:</small>
          <div className="uppercase">{type}</div>
        </div>
      </div>
    </div>
  )
}

export const ProjectDescription = ({ projectDescription }: { projectDescription: string | null | undefined }) => {
  if(!projectDescription) return null

  return (
    <PopupSection>
      <>
        <PopupSectionHeader>Project Overview</PopupSectionHeader>
        <p className="p-8">{projectDescription}</p>
      </>
    </PopupSection>
  )
}

export const ProjectUpdate = ({ projectUpdates }: { projectUpdates: AppTypes.UpdateInterface[] | undefined }) => {
  if(!projectUpdates?.length) return null

  const { projectUpdate, createdAt } = projectUpdates[0]

  return (
    <PopupSection>
      <>
        <PopupSectionHeader>Project Update</PopupSectionHeader>
        <p className="italic p-8">"{projectUpdate}"</p>
        <small className="ml-auto p-6 pt-0">{createdAt?.split("T")[0]}</small>
      </>
    </PopupSection>
  )
}

export const ProjectPhase = ({ phase }: { phase: AppTypes.ProjectPhaseType | undefined }) => {
  if(!phase) return null

  const projectPhaseDescription = projectPhaseDescriptionMap.get(phase)

  return (
    <PopupSection>
      <>
        <PopupSectionHeader>Project Phase: {phase}</PopupSectionHeader>
        <span className="p-6 pb-8">{projectPhaseDescription}</span>
      </>
    </PopupSection>
  )
}

export const CloseBtn = () => {
  const { dispatch } = useContext(MapCtx)

  return (
    <button
      type="button"
      className="btn btn-outline uppercase text-xl w-full"
      onClick={() => dispatch({ type: 'SET_SELECTION', payload: '' })}>
        Close
    </button>
  )
}

const PopupSection = ({ children }: { children: React.ReactElement }) => {

  return (
    <div className="flex flex-col items-center text-neutral-content text-center bg-neutral w-full">
      {children}
    </div>
  )
}

const PopupSectionHeader = ({ children }: { children: React.ReactNode }) => {

  return (
    <h3 className="pt-6 uppercase font-bold xl:text-xl">{children}</h3>
  )
}

const ProjectLink = ({ href }: { href: string | null | undefined }) => {
  if(!href) return null

  return (
    <a href={href} target="_blank" className="text-neutral-content text-center font-bold uppercase ml-3 no-underline">
      <div className="flex gap-1 m-auto w-fit">
        <p className="m-auto">Click here for project details</p>
        <img src={iconMap.get('link')} className="w-4" />
      </div>
    </a>
  )
}