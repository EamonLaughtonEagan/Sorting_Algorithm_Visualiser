import { motion, Variants } from "motion/react"

export default LoadingDots
function LoadingDots() {
  
  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="flex justify-center items-center gap[10px]"
    >
      {[0, 1, 2].map((i) => (
        <Dot key={i}/>
      ))}
    </motion.div>
  )
}

function Dot() {
  const dotVariants: Variants = {
    jump: {
      y: -15,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        reapeatType: "mirror",
        ease: "easeInOut",
      }
    }
  }
  return (
    <motion.div 
      className="w-[15px] h-[15px] mx-0.5 border bg-[#C0C0C0] border-gray-500 will-change-transform"
      variants={dotVariants}
    />
  )
}