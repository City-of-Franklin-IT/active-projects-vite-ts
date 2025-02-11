// Types
import { Dispatch, SetStateAction } from "react"
import { MapHit } from "../../map/ProjectsMap/types"

export const handleProjectSelection = (e: MapHit, setState: Dispatch<SetStateAction<{ selection: string | null }>>) => {
  setState(prevState => ({ ...prevState, selection: e?.graphic.attributes.uuid }))
}