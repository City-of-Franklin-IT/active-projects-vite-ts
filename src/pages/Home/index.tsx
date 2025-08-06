import { useGetProjects } from './hooks'
import { MapProvider } from '@/components/map/context'

// Components
import HandleLoading from '@/utils/HandleLoading'
import MapContainer from '@/components/containers/MapContainer'

function Home() {
  const { data, isSuccess } = useGetProjects()

  return (
    <div className="w-screen h-screen">
      <HandleLoading isSuccess={isSuccess}>
        <MapProvider>
          <MapContainer projects={data?.data || []} />
        </MapProvider>
      </HandleLoading>
    </div>
  )
}

export default Home