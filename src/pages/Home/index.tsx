import { useGetProjects } from './hooks'

// Components
import MapContainer from '../../components/containers/MapContainer'

function Home() {
  const projects = useGetProjects()

  return (
    <div className="w-screen h-screen">
      <MapContainer projects={projects.data?.data || []} />
    </div>
  )
}

export default Home