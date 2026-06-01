import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Expertise from '../components/Expertise'
import Projects from '../components/Projects'
import Clients from '../components/Clients'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import ScrollProgress from '../components/ScrollProgress'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Union Gate Trading Establishment — Building Solutions, Supplying Success</title>
        <meta name="description" content="Union Gate Trading Establishment — construction supplies, industrial equipment, manpower supply and technical solutions. Based in Riyadh, Saudi Arabia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="bg-sitebg text-white font-body">
        <ScrollProgress />
        <Header />
        <Hero />
        <main>
          <About />
          <Services />
          <Expertise />
          <Projects />
          <Clients />
          <Certifications />
          <Contact />
        </main>
      </div>
    </>
  )
}
