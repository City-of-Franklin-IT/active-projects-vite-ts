// Icons
import managerIcon from '@/assets/icons/manager/manager.svg'
import cofIcon from '@/assets/icons/cof/cof.png'
import linkIcon from '@/assets/icons/link/link.svg'
import typeIcon from '@/assets/icons/type/type.svg'

// Types
import { AnimationGeneratorType } from 'motion'

type IconMapType =
  | "cof"
  | "manager"
  | "link"
  | "type"

export const iconMap = new Map<IconMapType, string>([
  ['cof', cofIcon],
  ['manager', managerIcon],
  ['link', linkIcon],
  ['type', typeIcon]
])

export const motionProps = {
  initial: {
    x: -400,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1
  },
  exit: {
    x: -400,
    opacity: 0
  },
  transition: {
    type: "spring" as AnimationGeneratorType,
    stiffness: 300,
    damping: 25,
    mass: 0.8
  }
}