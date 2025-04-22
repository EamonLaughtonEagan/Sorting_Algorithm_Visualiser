import { AnimatePresence, useMotionValue, type Variants } from "motion/react"
import * as motion from "motion/react-client"
import { useEffect, useState, useRef } from "react"
import Draggable from "./Draggable"
import { algorithms } from "../static/object"
import Title from "./Title"

export { Propagation }

function Propagation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const containerRect = containerRef.current?.getBoundingClientRect()
  const { height } = useDimensions(containerRef)

  const draggableRef = useRef<HTMLDivElement>(null)
    
  return (
    <div>
      <div 
        className="relative flex justify-start items-stretch flex-1 w-screen h-[800px] bg-gradient-to-b from-[#018281] to-[#005a5a] rounded-xl overflow-hidden crt"
        ref={draggableRef}
      >
        <Title />
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          className="w-[300px] pointer-events-auto z-10"
        >
          <motion.div className="bg-[#C0C0C0] border border-gray-500 shadow-inner border-b-2 border-r-2 p-3 absolute top-0 left-0 bottom-0 w-[200px]" variants=     {sidebarVariants}>

          </motion.div>
          <Navigation containerRect={containerRect} ref={draggableRef}/>
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </motion.nav>
      </div>
    </div>
  )
}

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transiotion: { staggerChildren: 0.05, staggerDirections: -1}
  }
}

const Navigation = ({containerRect, ref}: {containerRect: DOMRect | undefined, ref: React.RefObject<HTMLDivElement | null>}) => {

  return (
    <motion.ul className="list-none p-[25px] m-0 absolute top-[80px] w-[230px]" variants={navVariants}>
      {Array.from({ length: algorithms.length }).map((_, i) => (
        <MenuItem i={i} key={i} containerRect={containerRect} ref={ref}/>
      ))}
    </motion.ul>
  )
  
}

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000 ,velocity: -1}
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

const MenuItem = ({ i, containerRect, ref }: { i: number, containerRect: DOMRect | undefined, ref: React.RefObject<HTMLDivElement | null>}) => {
  
  return (
    <motion.li
      className="relative flex items-center justify-start p-0 m-0 list-none mb-5 cursor-pointer h-5"
      variants={itemVariants}
    >
      <motion.div className="flex items-center justify-start">
        <Draggable i={i} containerRect={containerRect} ref={ref}/>
      </motion.div>
    </motion.li>
  )
}

const sidebarVariants = {
  open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
          type: "spring",
          stiffness: 20,
          restDelta: 2,
      },
  }),
  closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
          delay: 0.2,
          type: "spring",
          stiffness: 400,
          damping: 40,
      },
  },
}

interface PathProps {
  d?: string
  variants: Variants
  transition?: { durantion: number }
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
)

const MenuToggle = ({ toggle }: {toggle: () => void}) => (
  <button className="absolute top-[18px] left-[28px] w-[50px] h-[50px] rounded-full bg-transparent cursor-pointer outline-none border-none select-none" onClick={toggle}>
    <svg width={'23'} height={'23'} viewBox="0 0 23 23">
      <Path
          variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
          }}
      />
      <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
          }}
          transition={{ durantion: 0.1 }}
      />
      <Path
          variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
          }}
      />
    </svg>
  </button>
)

/**
 * ==============   Utils   ================
 */
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 })
  useEffect(() => {
      if (ref.current) {
          dimensions.current.width = ref.current.offsetWidth
          dimensions.current.height = ref.current.offsetHeight
      }
  }, [ref])

  return dimensions.current
}


