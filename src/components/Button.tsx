import { motion } from 'motion/react'

type ButtonP = {
  name?: string
  description?: string
  complexity?: string
}

const Button = (props: ButtonP) => {

  return (
    <motion.button whileHover={{ scale: 1.1}} whileTap={{ scale: 0.95 }} onHoverStart={() => console.log('test')} className='w-42 h-16 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-3xl shadow-md whitespace-normal break-words hover:drop-shadow-lg'>
      <p>{props.name}</p>
    </motion.button>
  )
}

export default Button