import { createContext, useReducer } from "react"
import appReducer from './AppReducer'

// Types
import { ReactNode } from "react"
import { BasemapEnum } from "../../components/containers/MapContainer/types"
import { AppState, ProjectTypeEnum } from "./types"

const AppContext = createContext<AppState>({
  dispatch: () => {},
  filters: [ ...Object.values(ProjectTypeEnum) ],
  basemap: BasemapEnum.DarkGrayVector
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState : AppState = {
    dispatch: () => {},
    filters: [ ...Object.values(ProjectTypeEnum) ],
    basemap: BasemapEnum.DarkGrayVector
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext