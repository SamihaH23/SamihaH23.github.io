import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/motion'

// Tiny event bus so one section can nudge another
// (e.g. the hero's "Show me AI work" sets the project filter).
export type AppEvents = {
  'projects:filter': string
  'contact:reason': string
}

export function emit<K extends keyof AppEvents>(name: K, detail: AppEvents[K]) {
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export function useAppEvent<K extends keyof AppEvents>(
  name: K,
  handler: (detail: AppEvents[K]) => void,
) {
  const saved = useRef(handler)
  saved.current = handler
  useEffect(() => {
    const on = (e: Event) => saved.current((e as CustomEvent<AppEvents[K]>).detail)
    window.addEventListener(name, on)
    return () => window.removeEventListener(name, on)
  }, [name])
}

export function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}
