import { useEffect, useRef, useState } from 'react'
import { competencies, education, now, profile, projects } from '../data/portfolio'
import { prefersReducedMotion } from '../hooks/motion'
import Section from './Section'
import { CapIcon } from './Icons'

const stats = [
  { value: '2+', label: 'Years of experience' },
  { value: '4', label: 'Roles across 3 companies' },
  { value: String(projects.length), label: 'Personal projects' },
]

export default function About() {
  return (
    <Section id="about" eyebrow="01 · About" title="A bit about me" note="hi again :)">
      <div className="about">
        <div className="about__text reveal">
          {profile.about.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}

          <div className="chips">
            {competencies.map((c) => (
              <span key={c} className="chip chip--soft">
                {c}
              </span>
            ))}
          </div>
        </div>

        <aside className="about__side reveal">
          <div className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <CountUp value={s.value} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="card now">
            <p className="hand now__label">
              <span className="now__dot" /> right now
            </p>
            <ul>
              {now.map((n) => (
                <li key={n.label}>
                  <span>{n.label}</span>
                  {n.value}
                </li>
              ))}
            </ul>
          </div>

          <div className="card edu">
            <CapIcon size={22} />
            <div>
              <h3>{education.degree}</h3>
              <p>{education.school}</p>
              <p className="muted">{education.major}</p>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  )
}

// Counts up from 0 when the number scrolls into view, e.g. "2+" → 0+, 1+, 2+.
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const ref = useRef<HTMLElement>(null)
  const [n, setN] = useState(target)

  useEffect(() => {
    const el = ref.current
    if (!el || !match || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    setN(0)
    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1000, 1)
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return <strong ref={ref}>{match ? `${n}${suffix}` : value}</strong>
}
