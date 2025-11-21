import { useContext, useState } from "react"
import MapCtx from "@/components/map/context"
import { iconSrcMap } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'
import { MapOptionsContainerBtnsType } from './utils'

export const useHandleMapOptionsContainer = () => {
  const { selection } = useContext(MapCtx)

  const [state, setState] = useState<{ activeBtn: MapOptionsContainerBtnsType | null }>({ activeBtn: null })

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = e.currentTarget.value as MapOptionsContainerBtnsType

    const payload = type !== state.activeBtn ? type : null
    setState({ activeBtn: payload })
  }

  return { onClick, activeBtn: state.activeBtn, visible: !selection }
}

export const useHandleFilterOption = (type: AppTypes.ProjectType) => {
  const { filters, dispatch } = useContext(MapCtx)

  const active = !!filters.find(filter => filter === type)

  const onClick = () => {
    const payload = active ? filters.filter(option => option !== type) : [ ...filters, type ]

    dispatch({ type: 'SET_FILTERS', payload })
  }

  const btnClassName = `btn btn-neutral w-full text-start ${ active ? 'opacity-100' : 'opacity-50' }`

  const iconSrc = iconSrcMap.get(type)

  const iconClassName = `w-8 ${ active ? 'opacity-100' : 'opacity-50' }`

  const btnProps = {
    onClick,
    className: btnClassName
  }

  const iconProps = {
    src: iconSrc,
    className: iconClassName
  }

  return { btnProps, iconProps }
}

export const useHandleMapOption = (option: 'filter' | 'legend' | 'basemap',active: boolean, onClick: React.MouseEventHandler<HTMLButtonElement>) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })
  
  const btnClassName = `btn rounded-none w-20 h-20 ${ state.hovered || active ? 'btn-warning text-neutral' : 'btn-neutral text-warning' }`

  const iconSrc = state.hovered || active ? iconSrcMap.get(`hovered ${ option }`)! : iconSrcMap.get(option)!
  
  const btnProps = {
    className: btnClassName,
    onMouseEnter: () => setState(({ hovered: true })),
    onMouseLeave: () => setState(({ hovered: false })),
    onClick
  }

  return { btnProps, iconSrc }
}