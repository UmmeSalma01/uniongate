import { motion } from 'framer-motion'

export default function Lightbox({ src, alt, onClose }){
  if(!src) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale:1, opacity:1 }} exit={{ opacity:0 }} className="max-w-3xl w-full p-4">
        <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-2xl" />
      </motion.div>
    </div>
  )
}
