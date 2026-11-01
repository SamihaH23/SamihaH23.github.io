import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Contact from './components/Contact'
import { ArrowUpIcon } from './components/Icons'
import { useReveal } from './hooks/useReveal'
import { prefersReducedMotion, useSpotlight } from './hooks/motion'

export default function App() {
  useReveal()
  useSpotlight()

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <span className="hand footer__sig">Samiha</span>
          <p>
            © {new Date().getFullYear()} Samiha Hossain · Designed & built with care in React &
            TypeScript
          </p>
        </div>
      </footer>
      <BackToTop />
      <Cursor />
    </>
  )
}

// A soft ring that trails the mouse and grows over anything clickable.
function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (prefersReducedMotion()) return

    let x = 0
    let y = 0
    let cx = 0
    let cy = 0
    let raf = 0
    let started = false

    const loop = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0
    }

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!started) {
        started = true
        cx = x
        cy = y
      }
      const target = e.target as Element | null
      el.classList.add('cursor--on')
      el.classList.toggle(
        'cursor--hover',
        !!target?.closest?.('a, button, input, textarea, select, label, [role="button"]'),
      )
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onLeave = () => el.classList.remove('cursor--on')
    const onDown = () => el.classList.add('cursor--down')
    const onUp = () => el.classList.remove('cursor--down')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span />
    </div>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#top"
      className={`to-top ${show ? 'to-top--show' : ''}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUpIcon />
    </a>
  )
}
