import { motion } from 'framer-motion'

const services = [
  'Construction Supplies','Construction Machines','General Tools','Electrical Supplies','Electrical Appliances','Electrical Tools','Construction Tools','General Machines','Water Treatment Chemicals','Heavy Machines','Heavy Equipment','Building Materials','Plumbing Tools','Plumbing Supplies','Water Treatment Supplies','Manpower Supply','Manual Excavation Works','Waterproofing Solutions','General Trading & Supply'
]

export default function Services(){
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-black/40 to-transparent">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl mb-4">Our Services</h2>
        <p className="text-gray-300 max-w-[70ch]">Comprehensive supply and service solutions tailored to project needs.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s,i)=> (
            <motion.div key={s} initial={{ y: 18, opacity: 0 }} whileInView={{ y:0, opacity:1 }} transition={{ delay: i*0.04 }} className="bg-[#0f0f0f] border border-black/20 rounded-2xl p-6 shadow-xl hover:scale-[1.02] hover:shadow-2xl">
              <div className="text-gold font-semibold text-lg">{s}</div>
              <div className="mt-2 text-gray-300">Premium supply & service solutions for {s.toLowerCase()}.</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
