// Types
import { AppState, AppAction } from "./types"

const appReducer = (state: AppState, action: AppAction) => {
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
    default:
      return state
  }
}

export default appReducer