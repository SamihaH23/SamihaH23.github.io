import type { ReactNode } from 'react'
import { skillGroups, type SkillGroup } from '../data/portfolio'
import Section from './Section'

const total = skillGroups.reduce((n, g) => n + g.items.length, 0)

export default function Skills() {
  return (
    <Section id="skills" eyebrow="02 · Skills" title="What I work with" note="my everyday toolbox">
      <div className="skills">
        {skillGroups.map((g) => (
          <SkillCard key={g.name} group={g} />
        ))}
      </div>
      <p className="skills__total muted reveal">
        {total} skills across {skillGroups.length} areas, and always learning more.
      </p>
    </Section>
  )
}

function SkillCard({ group: g }: { group: SkillGroup }) {
  const chips = (
    <div className="chips">
      {g.items.map((item) => (
        <span key={item} className="chip chip--interactive">
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`card skill reveal ${g.featured ? 'skill--featured' : ''}`}
      style={{ gridArea: g.area }}
    >
      <div className="skill__head">
        <span className="skill__icon">{icons[g.icon]}</span>
        <div className="skill__titles">
          <h3>{g.name}</h3>
          <p>{g.blurb}</p>
        </div>
        <span className="skill__count" aria-label={`${g.items.length} skills`}>
          {g.items.length}
        </span>
      </div>
      {g.featured && <span className="hand skill__tag">core strength ★</span>}
      {g.highlights && (
        <ul className="skill__highlights">
          {g.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {g.featured ? (
        <div className="skill__stack">
          <span className="skill__stack-label">My stack</span>
          {chips}
        </div>
      ) : (
        chips
      )}
    </div>
  )
}

const svg = (children: ReactNode) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const icons: Record<SkillGroup['icon'], ReactNode> = {
  code: svg(<path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />),
  layout: svg(
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>,
  ),
  check: svg(
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>,
  ),
  plug: svg(
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>,
  ),
  spark: svg(
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />,
  ),
  tool: svg(
    <path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3.5-3.5a4 4 0 0 0-5-5L3 11l8-8z" />,
  ),
}
