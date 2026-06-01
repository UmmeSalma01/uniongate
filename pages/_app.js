import '../styles/globals.css'
import { motion } from 'framer-motion'
import ScrollProvider from '../components/ScrollProvider'
import Loader from '../components/Loader'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <ScrollProvider>
      {loading ? (
        <Loader />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Component {...pageProps} />
        </motion.div>
      )}
    </ScrollProvider>
  )
}
