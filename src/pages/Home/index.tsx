import { useGetProjects } from './hooks'
import { MapProvider } from '@/components/map/context'

// Components
import Loading from '@/components/loading/Loading'
import MapContainer from '@/components/containers/MapContainer'

function Home() {
  const { data, isLoading } = useGetProjects()

  if(isLoading) return <Loading />

  return (
    <div className="w-screen h-screen">
      <MapProvider>
        <MapContainer projects={data?.data || []} />
      </MapProvider>
    </div>
  )
}

export default Home