import { motion } from "motion/react"
import { useState } from "react"

export default function Title() {
  const [activeDirection, setActiveDirection] = useState<"x" | "y" | null>(null)

  return (
    <>
      <Line direction="x" activeDirection={activeDirection}/>
      <motion.div 
        drag
        dragDirectionLock
        onDirectionLock={(direction) => setActiveDirection(direction)}
        onDragEnd={() => setActiveDirection(null)}
        dragConstraints={{ top: 0, left: 0, right: 750, bottom: 0}}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        dragElastic={0.2}
        whileDrag={{ cursor: "grabbing" }}
        className='absolute px-4 py-1 top-0 left-[200px] text-black text-2xl border border-gray-500 border-t border-l border-b-2 border-r-2 bg-[#C0C0C0] select-none hover: cursor-pointer font-sans font-extralight'>
        Visualizer_V.0.1_2025_04_21
      </motion.div>
    </>
  )
}

function Line({ direction, activeDirection }: { direction: 'x' | 'y', activeDirection: 'x' | 'y' | null }){
  return (
    <motion.div
      initial={false}
      animate={{ opacity: activeDirection === direction ? 1 : 0.3}}
      transition={{ duration: 0.1 }}
      className="absolute left-50 top-7 w-full h-[1px] border-t-[1px] border-dashed border-[#F5F5F5] select-none cursor-none"
    />
  )
}