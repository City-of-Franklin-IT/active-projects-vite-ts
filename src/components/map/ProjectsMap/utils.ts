// Markers
import facilitiesMarker from '@/assets/markers/Facilities.svg'
import parksMarker from '@/assets/markers/Parks.svg'
import waterMarker from '@/assets/markers/Water.svg'
import transportationMarker from '@/assets/markers/Transportation.svg'
import stormwaterMarker from '@/assets/markers/Stormwater.svg'

// Types
import * as AppTypes from '@/context/App/types'

export const mapHitTest = (results: __esri.MapViewViewHit[]) => { // Checks if a feature is present in map hit results
  return results.find(result => {
    const hit = result as AppTypes.MapHitInterface

    return hit.graphic?.attributes?.uuid
  })
}

export const projectMarkerMap = new Map<AppTypes.ProjectType, string>([
  ['Facilities', facilitiesMarker],
  ['Parks', parksMarker],
  ['Water Management', waterMarker],
  ['Transportation', transportationMarker],
  ['Stormwater', stormwaterMarker]
])