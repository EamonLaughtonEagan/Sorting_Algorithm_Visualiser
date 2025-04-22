import { AnimatePresence, motion, useDragControls } from "motion/react";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import ArrayVisualiser from "./ArrayVisualiser";
import { algorithms } from "../static/object";

export default function Draggable({ i, containerRect, ref }: { i: number, containerRect: DOMRect | undefined, ref: React.RefObject<HTMLDivElement | null> }) {
  const [isVisible, setIsVisible] = useState(true)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [isInside, setIsInside] = useState(true)


  const checkForOverlap = () => {
    if (!containerRect || !constraintsRef.current) return
    const box = constraintsRef.current.getBoundingClientRect()
    let isWithinX = box.left >= containerRect.left && box.right <= containerRect.right
    setIsInside(isWithinX)
  }
  
  const handleMinimize = () => {
    if (isInside) return
    setIsVisible(false)
  }

  const handleMaximize = () => {
    if (isInside) return
    setIsVisible(true)
  }

  const handleRemove = () => {

  }

  useEffect(() => {
    setIsVisible(true)
  }, [isInside])

  const dragControls = useDragControls()

  return (
      <motion.div
        ref={constraintsRef}
        drag
        dragSnapToOrigin={isInside ? true : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={ref}
        dragTransition={{ power: 0.1, timeConstant: 100 }}
        whileDrag={{ zIndex: 1000, cursor: "grabbing" }}
        dragElastic={0.01}
        onDrag={checkForOverlap}
        style={{ width: isInside ? '140px' : '250px'}}
        className="absolute -top-4 left-0 flex justify-between items-center bg-[#C0C0C0] border-t border-l border-gray-500 border-b-2 border-r-2 text-sm px-2 py-0.5"  
      >
        <motion.span 
          className="text-xs pt-0.5 select-none bg-[#C0C0C0] font-mono w-full flex justify-center"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div>{algorithms[i].name}</div>
        </motion.span>
        {!isInside && (
          <motion.div 
            className="flex space-x-[2px] pr-1 select-none"
          >
          <Button 
            onClick={handleMinimize}
          >
            🗕
          </Button>
          <Button 
            onClick={handleMaximize}
          >
            🗖
          </Button>
          <Button 
            onClick={handleRemove}
          >
            ✕
          </Button>
          <AnimatePresence>
            {isVisible && <Card />}
          </AnimatePresence>
        </motion.div>
        )} 
      </motion.div>
  )

  function Card() {
    return (
      <motion.div 
        className="absolute top-7 left-0 h-32 bg-[#C0C0C0] border border-gray-500 text-black shadow-inner p-1 cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="h-full border-t border-l flex justify-start border-gray-500 border-b-2 border-r-2 bg-gray-100 text-sm cursor-default">
          {/** Fill this in with the visualizaton */}
          <div className="flex justify-center items-center pl-2 w-min">
            {/* <LoadingDots /> */}
            <ArrayVisualiser i={i} sortFunction={algorithms[i].sortingFn!}/>
          </div>
        </div>
      </motion.div>
    )
  }

  type ButtonProps = ComponentPropsWithoutRef<typeof motion.button> & {
    delay?: number
  }

  function Button({ children, delay, ...rest}: ButtonProps) {
    return (
      <motion.button
      className="w-5 h-5 bg-[#C0C0C0] border-t border-l border-gray-500 border-b-2 border-r-2 text-xs leading-none flex items-center justify-center hover:bg-gray-300 hover:cursor-pointer"
        whileTap={{ y: 1 }}
        {...rest}
      >
        {children}
      </motion.button>
  )
  }
}