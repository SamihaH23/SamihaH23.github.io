import { useEffect } from 'react'

// Fades in any element with the `reveal` class when it scrolls into view.
// Elements that appear together are staggered slightly.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`
            el.classList.add('visible')
            observer.unobserve(el)

            // Once shown, drop the reveal styles so hover effects feel instant.
            const done = (e: TransitionEvent) => {
              if (e.target !== el) return
              el.removeEventListener('transitionend', done)
              el.style.transitionDelay = ''
              el.classList.remove('reveal')
            }
            el.addEventListener('transitionend', done)
          })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
