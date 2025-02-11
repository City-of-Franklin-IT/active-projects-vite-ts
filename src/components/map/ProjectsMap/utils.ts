import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import TextSymbol from "@arcgis/core/symbols/TextSymbol"
import Point from "@arcgis/core/geometry/Point"
import { PictureMarkerSymbol } from "@arcgis/core/symbols"
import { MAP_SERVICE_URL } from "../../../config"

// Markers
import facilitiesMarker from '../../../assets/markers/Facilities.svg'
import parksMarker from '../../../assets/markers/Parks.svg'
import waterMarker from '../../../assets/markers/Water.svg'
import transportationMarker from '../../../assets/markers/Transportation.svg'
import stormwaterMarker from '../../../assets/markers/Stormwater.svg'

// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { ProjectInterface } from "../../../context/App/types"
import { MapHit } from './types'

export const setMapView = (projects: ProjectInterface[], basemap: string, mapRef: RefObject<HTMLDivElement | null>, setState: Dispatch<SetStateAction<{ view: MapView | null }>>, handleProjectSelection: (e: MapHit) => void, closePopup: (() => void) | undefined) => {

  const map = new Map({ basemap })

  const ids = projects.map(project => project.projectId)

  const mapService = new MapImageLayer({
    url: MAP_SERVICE_URL,
    minScale: 20000,
    sublayers: [{
      id: 1,
      definitionExpression: `projectId IN (${ ids.join(",") })`
    },{
      id: 2,
      definitionExpression: `projectId IN (${ ids.join(",") })`
    },{
      id: 3,
      definitionExpression: `projectId IN (${ ids.join(",") })`
    }]
  })

  map.add(mapService)

  const view = new MapView({
    container: mapRef.current as HTMLDivElement,
    map,
    center: determineMapCenter(projects),
    zoom: 12,
    ui: { components: [] }
  })

  setState(({ view }))

  const pointGraphicsArray: Graphic[] = []
  const textGraphicsArray: Graphic[] = []

  let pointGraphicsLayer = new GraphicsLayer()
  let textGraphicsLayer = new GraphicsLayer({ minScale: 20000 })

  map.addMany([pointGraphicsLayer, textGraphicsLayer])

  projects.map(project => {
    const point = new Point({
      longitude: project.xCoordinate,
      latitude: project.yCoordinate,
      spatialReference: view.spatialReference
    })

    const graphic = new Graphic({ // Project
      geometry: point,
      symbol: projectMarker(project.type),
      attributes: { uuid: project.uuid }
    })

    pointGraphicsArray.push(graphic)

    const label = new Graphic({
      geometry: point,
      symbol: setLabel(project.name)
    })
  
    textGraphicsArray.push(label)
  })

  pointGraphicsLayer.addMany(pointGraphicsArray)
  textGraphicsLayer.addMany(textGraphicsArray)
    
  view.on("click", async (e) => {
    const test = await view.hitTest(e)

    const graphics = test.results.filter(obj => obj.type === 'graphic' && obj?.graphic.attributes?.uuid)

    if(!graphics.length && closePopup) { // Close existing popup if active
      return closePopup()
    }

    const hit = graphics[0] as MapHit

    handleProjectSelection(hit)
  })
}

const determineMapCenter = (projects: ProjectInterface[]) => {
  const xCoordinates: number[] = []
  const yCoordinates: number[] = []

  projects.map(project => {
    xCoordinates.push(project.xCoordinate)
    yCoordinates.push(project.yCoordinate)
  })

  const averageX = xCoordinates.reduce((acc, current) => acc + current, 0) / xCoordinates.length
  const averageY = yCoordinates.reduce((acc, current) => acc + current, 0) / yCoordinates.length

  if(averageX) {
    return [averageX, averageY]
  } else return [-86.86897349, 35.92531721]
}

const projectMarker = (type: string): PictureMarkerSymbol => {
  let marker: string | null = ''

  switch(type) {
    case 'Facilities':
      marker = facilitiesMarker
      break
    case 'Parks':
      marker = parksMarker
      break
    case 'Water':
      marker = waterMarker
      break
    case 'Transportation':
      marker = transportationMarker
      break
    case 'Stormwater':
      marker = stormwaterMarker
      break
  }

  return new PictureMarkerSymbol({
    url: marker,
    height: "40px",
    width: "40px"
  })
}

const setLabel = (name: string) => { // Set vehicle name label
  return new TextSymbol({
    text: name,
    color: "#FFFFFF",
    yoffset: 18,
    font: {
      size: 10
    }
  })
}