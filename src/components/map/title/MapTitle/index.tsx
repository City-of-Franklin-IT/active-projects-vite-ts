function MapTitle({ visible }: { visible: boolean }) {
  if(!visible) return null

  return (
    <div className="absolute flex flex-col text-warning font-jura text-2xl font-bold uppercase [text-shadow:_8px_8px_2px_rgb(0_0_0_/_40%)] m-auto p-10 py-5 bg-neutral/50 left-[50%] translate-x-[-50%] w-fit rounded-b-xl backdrop-blur-sm xl:text-5xl xl:text-start xl:gap-3 xl:left-10 xl:top-10 xl:translate-x-0 xl:rounded-none">
      <span className="whitespace-nowrap">City of Franklin</span>
      <div className="flex text-neutral-content xl:flex-col">
        <span className="text-neutral-content">Capital</span>
        <span className="text-neutral-content">Projects</span>
      </div>
    </div>
  )
}

export default MapTitle