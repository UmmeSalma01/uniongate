import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { ScrollContext } from './ScrollProvider'

export default function Hero() {
  const { scrollY } = useContext(ScrollContext)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!scrollY) return
    const unsub = scrollY.onChange(v => setOffset(v))
    return () => unsub()
  }, [scrollY])

  const imgTranslate = Math.min(40, offset * 0.06)

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-[1200px] h-[1200px] bg-gradient-radial from-gold/20 via-transparent to-transparent opacity-10 transform rotate-12"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <img src="/images/logo.png" alt="Union Gate Trading" className="h-20 mb-6" />
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-gold">Building Solutions, Supplying Success</h1>
            <p className="mt-6 text-gray-200 max-w-prose">Union Gate Trading Establishment — Riyadh-based supplier of construction supplies, industrial equipment, technical solutions and manpower services across Saudi Arabia.</p>
            <div className="mt-8 flex gap-4">
              <a href="/UNITED GATE TRADING CATALOUGE.pdf" className="px-6 py-3 border border-gold text-gold rounded-md font-semibold">Download Catalog</a>
              <a href="mailto:contact@uniongatetrading.net" className="px-6 py-3 bg-gold text-black rounded-md font-semibold">Contact Us</a>
            </div>
          </motion.div>

          <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="relative">
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/40">
              <img src="/images/IMG-20260520-WA0005.jpg.jpeg" alt="Union Gate team" className="w-full h-[520px] object-cover" style={{ transform: `translateY(${imgTranslate}px)` }} />
              <div className="absolute inset-0 mix-blend-overlay pointer-events-none"></div>
            </div>
            <div className="mt-4 text-sm text-gray-300">Riyadh, Kingdom of Saudi Arabia</div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-center text-sm text-gray-300">Scroll</div>
        <div className="mt-2 h-10 w-6 border-2 border-gray-600 rounded-full flex items-start justify-center p-1">
          <div className="h-2 w-2 bg-gold rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
