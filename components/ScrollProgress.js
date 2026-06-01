import { useContext, useEffect, useState } from 'react'
import { ScrollContext } from './ScrollProvider'

export default function ScrollProgress(){
  const { scrollY } = useContext(ScrollContext)
  const [pct, setPct] = useState(0)

  useEffect(()=>{
    if(!scrollY) return
    const onChange = (v) => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const p = docH > 0 ? Math.min(1, v / docH) : 0
      setPct(p)
    }
    const unsub = scrollY.onChange(onChange)
    onChange(scrollY.get())
    return ()=>unsub()
  },[scrollY])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none">
      <div className="h-1 bg-gold/60" style={{ width: `${pct*100}%`, transition: 'width .12s linear' }} />
    </div>
  )
}
