import { motion } from 'framer-motion'

const items = [
  {title:'Reliable Execution', body:'Consistent performance and dependable project delivery.'},
  {title:'Quality & Safety', body:'High-quality materials, strict safety and compliance standards.'},
  {title:'Client-Focused', body:'Flexible, transparent solutions tailored to client requirements.'},
  {title:'Integrity & Commitment', body:'Professional conduct, ethical business, and long-term partnerships.'}
]

export default function Expertise(){
  return (
    <section id="expertise" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl">Our Expertise & Values</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it,idx)=> (
            <motion.div key={it.title} initial={{ y: 12, opacity:0 }} whileInView={{ y:0, opacity:1 }} transition={{ delay: idx*0.06 }} className="bg-[#0f0f0f] rounded-2xl p-6 border border-black/20 shadow-lg">
              <h3 className="text-gold font-semibold">{it.title}</h3>
              <p className="mt-2 text-gray-300">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
