import { motion } from 'framer-motion'

export default function About(){
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="font-display text-3xl text-white">About The Company</h2>
            <p className="text-gray-300 max-w-prose">Union Gate Trading Establishment is a dynamic, professionally managed company based in Riyadh, Kingdom of Saudi Arabia. We provide reliable services and supply solutions for construction, facilities management and industrial projects across the Kingdom — combining professional expertise, skilled manpower, high-quality materials, timely delivery and safety-focused operations.</p>
            <ul className="mt-6 grid gap-3 text-gray-200 font-semibold">
              <li>Professional project coordination and support</li>
              <li>Skilled and semi-skilled manpower supply</li>
              <li>Quality materials and equipment</li>
              <li>Timely delivery and safety compliance</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/40">
              <img src="/images/IMG-20260520-WA0006.jpg.jpeg" alt="team" className="w-full h-[420px] object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
