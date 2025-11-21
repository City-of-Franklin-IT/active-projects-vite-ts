import { useContext, useMemo, useState, useEffect } from "react"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import Search from "@arcgis/core/widgets/Search"
import { TextSymbol } from "@arcgis/core/symbols"
import Multipoint from '@arcgis/core/geometry/Multipoint'
import MapCtx from "../context"
import { mapHitTest, projectMarkerMap } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'
import { ProjectInterface } from "../../../context/App/types"

export const useFilterProjects = (projects: ProjectInterface[]) => {
  const { filters } = useContext(MapCtx)

  return useMemo(() => {
    return projects.filter(project => filters.some(filter => filter === project.type))
  }, [filters, projects])
}

export const useSetMapView = (mapRef: React.RefObject<HTMLDivElement>, projects: AppTypes.ProjectInterface[]) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, setState)
  useUpdateMapExtent(state.view, projects)
  useSetMapGraphics(projects, state)

  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])
}

export const useDebounce = <T>(value: T, delay: number): T => { // Debouncer
  const [state, setState] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setState(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return state
}

export const useHandleBasemapSelect = () => {
  const { basemap, dispatch } = useContext(MapCtx)

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_BASEMAP', payload: e.currentTarget.value as AppTypes.BasemapType})
  }

  return { onChange, basemap }
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { basemap, dispatch } = useContext(MapCtx)
  
  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap })

    const mapView = new MapView({
      container: mapRef.current,
      map,
      center: [-86.86897349, 35.92531721],
      zoom: 12,
      ui: { components: [] }
    })

    mapView.when(() => {
      const searchWidget = new Search({ view: mapView })
      
      mapView.ui.add(searchWidget, {
        position: 'top-right'
      })

      setState(prevState => ({ ...prevState, view: mapView }))
    })

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    const textGraphicsLayer = new GraphicsLayer({ id: 'textGraphicsLayer', minScale: 20000 })

    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    const onMapClick = mapView.on("click", async (e) => {
      const results = (await mapView.hitTest(e)).results

      const mapHit = mapHitTest(results)

      if(mapHit) {
        const hit = mapHit as AppTypes.MapHitInterface
        dispatch({ type: 'SET_SELECTION', payload: hit.graphic.attributes.uuid })
      } else dispatch({ type: 'SET_SELECTION', payload: '' })
    })

    return () => {
      setTimeout(() => {
        onMapClick.remove()
        mapView.destroy()
      }, 50)
    }
  }, [dispatch, mapRef, basemap, setState])
}

const useSetMapGraphics = (projects: AppTypes.ProjectInterface[], state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view) return

    const pointGraphicsLayer = state.view.map?.findLayerById('pointGraphicsLayer') as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById('textGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer.removeAll()
    textGraphicsLayer.removeAll()

    projects.forEach(project => {
      const point = new Point({
        longitude: project.xCoordinate,
        latitude: project.yCoordinate
      })

      const pictureMarker = new PictureMarkerSymbol({
        url: projectMarkerMap.get(project.type),
        width: "32px",
        height: "32px",
        yoffset: "14px"
      })

      const graphic = new Graphic({
        geometry: point,
        symbol: pictureMarker,
        attributes: { uuid: project.uuid }
      })

      const labelText = new TextSymbol({
        text: project.name,
        color: "#FFFFFF",
        yoffset: -14,
        font: { size: 10 }
      })

      const label = new Graphic({
        geometry: point,
        symbol: labelText
      })

      pointGraphicsLayer.add(graphic)
      textGraphicsLayer.add(label)
    })
  }, [state, projects])
}

const useUpdateMapExtent = (view: __esri.MapView | null, projects: AppTypes.ProjectInterface[]) => {

  useEffect(() => {
    if(!view) return

    if(projects.length) {
      const multipoint = new Multipoint({
        points: projects.map(project => [project.xCoordinate, project.yCoordinate])
      })

      const viewExtent = multipoint.extent

      if(viewExtent) {
        view.goTo(viewExtent.expand(1.1), {
          animate: true,
          duration: 300
        }).catch(err => console.log(err))
      }
    }
  }, [view, projects])
}