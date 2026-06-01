import { motion } from 'framer-motion'
import { useState } from 'react'
import Lightbox from './Lightbox'

// Use the canonical certificate files present in assets/certs and map them to their types.
const certs = [
  { src: '/assets/certs/registration_certificate.jpg', title: 'Registration Certificate' },
  { src: '/assets/certs/vat_registration_certificate.jpg', title: 'VAT Registration Certificate' },
  { src: '/assets/certs/address_proof.jpg', title: 'Address Proof' },
  { src: '/assets/certs/commercial_registration_certificate.jpg', title: 'Commercial Registration Certificate' },
]

export default function Certifications(){
  const [open, setOpen] = useState(null)

  return (
    <section id="certifications" className="py-24 bg-gradient-to-b from-black/40 to-transparent">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl">Certifications & Official Documents</h2>
        <p className="text-gray-300 max-w-prose">Official registrations and certificates (click to enlarge).</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {certs.map(c=> (
            <motion.button key={c.src} onClick={()=>setOpen(c)} whileHover={{ scale:1.02 }} className="block bg-[#0f0f0f] rounded-xl overflow-hidden shadow-lg border border-black/20 text-left">
              <img src={c.src} alt={c.title} className="w-full h-48 object-cover" />
              <div className="p-4 text-gray-200 font-semibold">{c.title}</div>
            </motion.button>
          ))}
        </div>
        {open && <Lightbox src={open.src} alt={open.title} onClose={()=>setOpen(null)} />}
      </div>
    </section>
  )
}
