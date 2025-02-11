import { useContext, useCallback } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { ProjectTypeEnum } from "../../../context/App/types"

export const useHandleFilterOptionBtnClick = (active: boolean, type: ProjectTypeEnum) => {
  const { filters, dispatch } = useContext(AppContext)

  const cb = useCallback(() => {
    const payload = active ? filters.filter(option => option !== type) : [ ...filters, type ]

    dispatch({ type: 'SET_FILTERS', payload })
  }, [active, type, filters])

  return cb
}