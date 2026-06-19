'use client'

import { useState, useEffect } from 'react'
import Header from './header'

export default function HeaderClient() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <Header scrollY={scrollY} />
}
