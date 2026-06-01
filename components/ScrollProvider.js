import React, { createContext, useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

export const ScrollContext = createContext({ scrollY: null, velocity: null })

// Lightweight smooth-scrolling approximation: we track the native scroll position
// and expose a smoothed motion value that interpolates toward the real scroll.
// This provides lenis-like smoothed values for parallax and motion without a
// third-party dependency. If you later install Lenis, this provider can be
// extended to use it instead.
export default function ScrollProvider({ children }){
  const scrollY = useMotionValue(0)
  const velocity = useMotionValue(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let rafId = null
    let current = window.scrollY || window.pageYOffset || 0
    let target = current
    let last = current
    const ease = 0.12

    const onScroll = () => {
      target = window.scrollY || window.pageYOffset || 0
    }

    // initial set
    scrollY.set(current)
    velocity.set(0)

    window.addEventListener('scroll', onScroll, { passive: true })

    const loop = () => {
      current += (target - current) * ease
      // small threshold to snap
      if (Math.abs(target - current) < 0.1) current = target
      scrollY.set(current)
      velocity.set(current - last)
      last = current
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [scrollY, velocity])

  return (
    <ScrollContext.Provider value={{ scrollY, velocity }}>
      {children}
    </ScrollContext.Provider>
  )
}
