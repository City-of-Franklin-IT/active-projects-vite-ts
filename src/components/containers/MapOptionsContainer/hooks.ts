import { useContext, useCallback, useState } from "react"
import MapCtx from "@/components/map/context"

// Types
import * as AppTypes from '@/context/App/types'
import { MapOptionsContainerBtnsType } from './utils'

export const useHandleMapOptionsContainer = () => {
  const { selection } = useContext(MapCtx)

  const [state, setState] = useState<{ activeBtn: MapOptionsContainerBtnsType | null }>({ activeBtn: null })

  const onClick = (type: MapOptionsContainerBtnsType) => {
    const payload = type !== state.activeBtn ? type : null
    setState({ activeBtn: payload })
  }

  return { onClick, activeBtn: state.activeBtn, visible: !selection }
}

export const useHandleFilterOptionBtnClick = (active: boolean, type: AppTypes.ProjectType) => {
  const { filters, dispatch } = useContext(MapCtx)

  const cb = useCallback(() => {
    const payload = active ? filters.filter(option => option !== type) : [ ...filters, type ]

    dispatch({ type: 'SET_FILTERS', payload })
  }, [active, type, filters])

  return cb
}