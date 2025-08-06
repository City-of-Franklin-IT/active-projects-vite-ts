import icon from '@/assets/icons/loading/loading.svg'

function Loading() {
  
  return (
    <img src={icon} alt="loading icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 animate-pulse" />
  )
}

export default Loading