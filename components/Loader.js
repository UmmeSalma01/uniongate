import { motion } from 'framer-motion'

export default function Loader(){
  return (
    <div className="fixed inset-0 bg-sitebg z-50 flex items-center justify-center">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .8 }} className="text-center">
        <img src="/images/logo.png" alt="logo" className="h-20 mx-auto mb-6" />
        <motion.h2 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .2 }} className="font-display text-3xl text-gold">Building Solutions, Supplying Success</motion.h2>
        <motion.div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent rounded-full" animate={{ scaleX: [0.8,1,0.8] }} transition={{ duration: 1.2, repeat: Infinity }} />
      </motion.div>
    </div>
  )
}
