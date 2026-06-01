import { motion } from 'framer-motion'

const clients = ['FMCO','Al Bawani Services','SETE Energy Saudi','EFSiM','Capital Garden','ESOM','Initial','United SAAM','UCC']

export default function Clients(){
  return (
    <section id="clients" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl">Clients</h2>
        <p className="text-gray-300 max-w-prose">We are proud to have worked with leading companies across Saudi Arabia, including:</p>
        <motion.div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
          {clients.map((c,idx)=> (
            <motion.div key={c} whileHover={{ scale:1.03 }} className="bg-[#0f0f0f] rounded-lg p-4 text-center font-semibold text-gray-100 shadow-md">{c}</motion.div>
          ))}
          <div className="bg-[#0f0f0f] rounded-lg p-4 text-center font-semibold text-gray-100">And many more</div>
        </motion.div>
      </div>
    </section>
  )
}
