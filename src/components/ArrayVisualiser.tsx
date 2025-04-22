import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { algorithms } from "../static/object";
import { SortFunction } from "./SortingFunctions";

export default function ArrayVisualiser({i, sortFunction}: {i: number, sortFunction: SortFunction}) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [array, setArray] = useState<number[]>(Array.from({ length: 100 }, () => Math.floor(Math.random() * 100)+1))

  const [orginalArray, setOriginalArray] = useState<number[]>([])
  const [isSorted, setIsSorted] = useState(false)
  const [isSorting, setIsSorting] = useState(false)

  useEffect(() => {
    const initalArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100)+1)
    setArray(initalArray)
    setOriginalArray(initalArray)
  }, [])

  const handleSort = async () => {
    setIsSorted(false)
    setIsSorting(true)
    const stopTimer = startLiveTimer()
    await sortFunction(array, setArray, setCurrentIndex)
    stopTimer()
    setIsSorted(true)
    setIsSorting(false)
  }

  const handleReset = async () => {
    setArray(orginalArray)
    setCurrentIndex(null)
    setIsSorted(false)
  }


  const time = useMotionValue(0)
  const roundedTime = useTransform(time, (v) => (v / 1000).toFixed(4)) // toSeconds

  const startLiveTimer = () => {
    let animationFrameId: number
    const start = performance.now()

    const update = () => {
      const now = performance.now()
      time.set(now - start)
      animationFrameId = requestAnimationFrame(update)
    }

    update() // start loop
    return () => cancelAnimationFrame(animationFrameId) // cleanup
  }
  
  return (
    <div className="flex justify-around items-start gap-2">
      <div className="flex justify-start items-start absolute bottom-[-30px] left-0 gap-2 h-6">
        <div className="flex-col flex gap-2">
          <motion.button 
            onClick={handleSort}
            whileHover={{ scale: 1.1}}
            whileTap={{ scale: 0.9}}
            disabled={isSorting || isSorted ? true : false}
            className="bg-gray-100 border-t border-l border-gray-500 border-b-2 border-r-2 text-xs hover:bg-gray-300 hover:cursor-pointer font-mono px-2 py-1 disabled:bg-red-900 disabled:cursor-not-allowed disabled:text-white"
          >
            Begin
          </motion.button>
          {isSorted && (
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.1}}
              whileTap={{ scale: 0.9}}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="bg-gray-100 border-t border-l border-gray-500 border-b-2 border-r-2 text-xs hover:bg-gray-300 hover:cursor-pointer font-mono px-2 py-1"
            >
              Reset
            </motion.button>
          )}
        </div>
        <motion.div className="bg-[#C0C0C0] px-2 border-t border-l border-gray-500 border-b-2 border-r-2 text-lg font-mono">
          {roundedTime}
        </motion.div>
        <div className="bg-[#C0C0C0] px-2 border-t border-l border-gray-500 border-b-2 text-sm font-bold font-mono">{algorithms[i].description}</div>
      </div>
      <div className="bg-gray-500 flex justify-center items-end border border-gray-500 text-black border-b-2 border-r-2 border-t-1 border-l-1">
        {array.map((v, i) => (
          <motion.div
            key={i}
            layout
            className="bg-[#C0C0C0] w-1.5"
            style={{ height: `${v}px`, background: i === currentIndex ? 'red' : ''}}
            transition={{ type: "tween", stiffness: 120}}
          />
        ))}
      </div>
      <div className="bg-[#C0C0C0] absolute top-[-30px] right-0 px-2 border-t border-l border-gray-500 border-b-2 text-xs font-mono py-1">Time Complexity: {algorithms[i].complexity}</div>
      <div>
      </div>
    </div>
  )
}