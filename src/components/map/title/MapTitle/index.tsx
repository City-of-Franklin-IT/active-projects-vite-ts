import { useContext } from "react"
import { motion } from "motion/react"
import cofIcon from '@/assets/icons/cof/cof.png'
import MapCtx from "../../context"
import { motionProps } from "@/components/containers/MapOptionsContainer/utils"

function MapTitle() {
  const { selection } = useContext(MapCtx)

  if(!!selection) return null

  return (
    <motion.div 
      className="absolute flex flex-col gap-2 items-center text-warning font-[play] uppercase text-2xl p-10 py-5 bg-neutral/50 bottom-0 left-[50%] translate-x-[-50%] w-fit h-fit rounded-t-xl backdrop-blur-sm z-10 xl:text-4xl xl:text-start xl:gap-3 xl:left-10 xl:top-10 xl:translate-x-0 xl:rounded-none"
      { ...motionProps }>
      <img src={cofIcon} alt="cof icon" className="hidden xl:block xl:w-30" />
      <div className="flex flex-col items-center">
        <h1 className="whitespace-nowrap">City of Franklin</h1>
        <span className="text-neutral-content text-center text-lg xl:text-2xl">Capital Projects</span>
      </div>
    </motion.div>
  )
}

export default MapTitle