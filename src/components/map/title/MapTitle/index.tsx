import { useContext } from "react"
import { motion } from "motion/react"
import MapCtx from "../../context"
import { motionProps } from "@/components/containers/MapOptionsContainer/utils"

function MapTitle() {
  const { selection } = useContext(MapCtx)

  if(!!selection) return null

  return (
    <motion.div 
      className="absolute flex flex-col items-center text-warning font-[play] uppercase text-2xl m-auto p-10 py-5 bg-neutral/50 left-[50%] translate-x-[-50%] w-fit rounded-b-xl backdrop-blur-sm xl:text-4xl xl:text-start xl:gap-3 xl:left-10 xl:top-10 xl:translate-x-0 xl:rounded-none"
      { ...motionProps }>
      <h1 className="whitespace-nowrap">City of Franklin</h1>
      <span className="text-neutral-content text-lg xl:text-2xl">Capital Projects</span>
    </motion.div>
  )
}

export default MapTitle