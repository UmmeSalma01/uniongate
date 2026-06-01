import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { ScrollContext } from './ScrollProvider'
import { useRef } from 'react'

let gsap
let ScrollTrigger

const projects = [
  {title:'Capital Garden — Manual Excavation', desc:'Manual excavation project: 8 KM of excavation work demonstrating our capability to manage large manual operations with precision and safety.'},
  {title:'United SAAM — Waterproofing', desc:'Waterproofing project: Total area 2,350 SQM — executed using high-quality materials and proven techniques for long-term protection.'}
]

export default function Projects(){
  const { scrollY } = useContext(ScrollContext)
  const [y, setY] = useState(0)

  useEffect(()=>{
    if(!scrollY) return
    const unsub = scrollY.onChange(v=> setY(v))
    return ()=> unsub()
  },[scrollY])

  const bgOffset = Math.min(120, y * 0.04)

  return (
    <section id="projects" className="py-24 relative">
      <div ref={el=>{
        if(!el) return
        // dynamic import gsap for advanced pin
        import('gsap').then(mod=>{
          gsap = mod.default
          ScrollTrigger = mod.ScrollTrigger
          if(gsap && ScrollTrigger){
            try{
              gsap.registerPlugin(ScrollTrigger)
              ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: '+=400',
                pin: true,
                pinSpacing: false
              })
            }catch(e){console.warn('gsap pin failed',e)}
          }
        })
      }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ transform: `translateY(${bgOffset}px)` }} className="absolute left-0 top-10 w-full h-[380px] bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-10 blur-xl" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="font-display text-3xl">Ongoing Projects</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p,idx)=> (
            <motion.article key={p.title} initial={{ scale: .98, opacity:0 }} whileInView={{ scale: 1, opacity:1 }} transition={{ delay: idx*0.08 }} className="rounded-2xl overflow-hidden shadow-2xl bg-[#0c0c0c] border border-black/20 p-6">
              <h3 className="text-gold font-display text-xl">{p.title}</h3>
              <p className="mt-3 text-gray-300">{p.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
