import { formatCurrency } from './utils'

// Icons
import managerIcon from '../../../../assets/icons/manager/manager.svg'
import cofIcon from '../../../../assets/icons/cof/cof.png'
import linkIcon from '../../../../assets/icons/link/link.svg'
import typeIcon from '../../../../assets/icons/type/type.svg'

// Types
import { UpdateInterface, SpendingInterface } from '../../../../context/App/types'

export const PopupHeader = ({ name, link }: { name: string, link: string | null }) => {

  return (
    <div className="sticky flex flex-col gap-2 items-center py-3 px-8 bg-base-100 border-2 border-neutral/50 border-r-warning border-b-warning border-l-warning m-auto w-fit top-0 left-0 rounded-b-xl shadow-2xl">
      <img src={cofIcon} alt="cof icon" className="w-16" />
      <p className="text-warning text-xl font-bold uppercase text-center">{name}</p>
      <Link link={link} />
    </div>
  )
}

export const ManagerBadge = ({ name }: { name: string | null }) => {
  if(!name) return null

  return (
    <div className="flex gap-2 justify-around text-neutral-content px-2 py-3 w-fit">
      <div className="flex gap-2 justify-around w-fit">
        <img src={managerIcon} alt="manager icon" className="w- xl:w-14" />
        <div className="flex flex-col items-center text-sm m-auto w-fit whitespace-nowrap">
          <small>Project Manager:</small>
          <div className="uppercase">{name}</div>
        </div>
      </div>
    </div>
  )
}

export const TypeBadge = ({ type }: { type: string }) => {

  return (
    <div className="flex gap-2 justify-around text-neutral-content px-2 py-3 w-fit">
      <div className="flex gap-2 justify-around w-fit">
        <img src={typeIcon} alt="project type icon" className="w-10 xl:w-14" />
        <div className="flex flex-col items-center text-sm m-auto w-fit whitespace-nowrap">
          <small>Project Type:</small>
          <div className="uppercase">{type}</div>
        </div>
      </div>
    </div>
  )
}

export const ProjectDescription = ({ projectDescription }: { projectDescription: string | null }) => {
  if(!projectDescription) return null

  return (
    <div className="flex-1 flex flex-col items-center text-neutral-content text-center bg-neutral">
      <h3 className="pt-6 font-play uppercase xl:text-cl">Project Overview:</h3>
      <p className="p-6">{projectDescription}</p>
    </div>
  )
}

export const ProjectUpdate = ({ projectUpdates }: { projectUpdates: UpdateInterface[] }) => {
  if(!projectUpdates.length) return null

  const { projectUpdate, createdAt } = projectUpdates[0]

  return (
    <div className="flex flex-col bg-neutral text-center w-full">
      <h3 className="pt-6 font-play uppercase xl:text-cl">Project Update:</h3>
      <p className="italic p-6 xl:p-4">"{projectUpdate}"</p>
      <span className="ml-auto p-4">{createdAt?.split("T")[0]}</span>
    </div>
  )
}

export const ProjectSpending = ({ projectSpending, approvedBudget }: { projectSpending: SpendingInterface[], approvedBudget: number }) => {
  if(!projectSpending.length) {
    return <span className="text-neutral-content font-play uppercase xl:text-2xl">{formatCurrency(approvedBudget)} Approved Budget</span>
  }

  const { dollarsSpent, dollarsSpentDate } = projectSpending[0]

  const overBudget = dollarsSpent > approvedBudget

  return (
    <div className="flex flex-col font-bold py-6 m-auto">
      <div className="flex flex-col">
        <h3 className="text-success font-play uppercase mb-auto xl:text-xl">Project Spending</h3>
        <div className={`${ overBudget ? 'text-error' : null }`}>{formatCurrency(dollarsSpent)}
          <span className="text-neutral-content font-play uppercase"> / {formatCurrency(approvedBudget)}</span> <span className="text-neutral-content">Approved Budget</span>
        </div>
        <div className="text-neutral-content text-end uppercase italic ml-1">Updated {dollarsSpentDate}</div>
      </div>
    </div>
  )
}

export const CloseBtn = ({ handleClick }: { handleClick: () => void }) => {

  return (
    <button
      type="button"
      className="btn btn-outline uppercase text-xl w-full"
      onClick={handleClick}>
        Close
    </button>
  )
}

const Link = ({ link }: { link: string | null }) => {
  if(!link) return null

  return (
    <a href={link} target="_blank" className="text-neutral-content text-center font-bold uppercase ml-3 no-underline">
      <div className="flex gap-1 m-auto w-fit">
        <p className="m-auto">More on franklintn.gov</p>
        <img src={linkIcon} className="w-4" />
      </div>
    </a>
  )
}