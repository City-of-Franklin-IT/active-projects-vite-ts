import { createContext, useReducer } from "react"

// Types
import * as AppTypes from '@/context/App/types'

type MapCtx = {
  dispatch: React.Dispatch<MapAction>
  basemap: AppTypes.BasemapType
  filters: AppTypes.ProjectType[]
  selection: string
  zoom: number
}

type MapState = Omit<MapCtx, 'dispatch'>

export type MapAction =
  | { type: 'SET_FILTERS', payload: AppTypes.ProjectType[] }
  | { type: 'SET_BASEMAP', payload: AppTypes.BasemapType }
  | { type: 'ZOOM_IN' }
  | { type: 'ZOOM_OUT' }
  | { type: 'SET_SELECTION', payload: string }

const MapCtx = createContext<MapCtx>({
  dispatch: () => null,
  basemap: 'dark-gray-vector',
  filters: ['Facilities', 'Parks', 'Stormwater', 'Transportation', 'Water Management'],
  selection: '',
  zoom: 12
})

const initialState: MapState = {
  basemap: 'dark-gray-vector',
  filters: ['Facilities', 'Parks', 'Stormwater', 'Transportation', 'Water Management'],
  selection: '',
  zoom: 12
}

const mapReducer = (state: MapState, action: MapAction) => {
  switch(action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload
      }
    case 'SET_BASEMAP':
      return {
        ...state,
        basemap: action.payload
      }
    case 'SET_SELECTION':
      return {
        ...state,
        selection: action.payload
      }
    case 'ZOOM_IN':
      return {
        ...state,
        zoom: state.zoom + 1
      }
    case 'ZOOM_OUT':
      return {
        ...state,
        zoom: state.zoom - 1
      }
    default:
      return state
  }
}

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [state, dispatch] = useReducer(mapReducer, initialState)

  return (
    <MapCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </MapCtx.Provider>
  ) 
}

export default MapCtx