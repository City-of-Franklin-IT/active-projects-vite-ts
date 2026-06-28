import { useContext } from "react"
import MapCtx from "../../context"
import cofIcon from '@/assets/icons/cof/cof.png'

export const useHandleMapTitle = () => {
  const { selection } = useContext(MapCtx)

  const visible = !selection

  return { visible, cofIcon }
}