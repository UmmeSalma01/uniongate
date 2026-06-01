import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header(){
  return (
    <header className="fixed top-6 left-0 right-0 z-40">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a initial={{ opacity: .6 }} whileHover={{ opacity: 1 }} href="#hero" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="logo" className="h-10" />
        </motion.a>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#about" className="text-gray-300 hover:text-white">About</a>
          <a href="#services" className="text-gray-300 hover:text-white">Services</a>
          <a href="#projects" className="text-gray-300 hover:text-white">Projects</a>
          <a href="/UNITED GATE TRADING CATALOUGE.pdf" className="text-gold font-semibold">Catalog</a>
        </nav>
      </div>
    </header>
  )
}
