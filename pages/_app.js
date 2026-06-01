import '../styles/globals.css'
import { motion } from 'framer-motion'
import ScrollProvider from '../components/ScrollProvider'
import Loader from '../components/Loader'
import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="EtS30W-3FtizCU2VQatLbObfBOkR1_i1xMn55YOeyWI"
        />
      </Head>

      <ScrollProvider>
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Component {...pageProps} />
          </motion.div>
        )}
      </ScrollProvider>
    </>
  )
}
