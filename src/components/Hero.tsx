import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'
import { prefersReducedMotion, useTypewriter } from '../hooks/motion'
import { emit, scrollToId } from '../lib/events'
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PlayIcon } from './Icons'

const roles = [profile.title, 'React & TypeScript Developer', 'Product Builder', 'LLM App Builder']

const checks = [
  'builds React + TypeScript UIs',
  'integrates REST & third-party APIs',
  'ships AI features with LLMs',
  'tests it all with Playwright',
  'works in Agile teams',
]

const intents = [
  {
    emoji: '💼',
    label: "I'm hiring",
    go: () => {
      emit('contact:reason', 'Job opportunity')
      scrollToId('contact')
    },
  },
  {
    emoji: '🤖',
    label: 'Show me AI work',
    go: () => {
      emit('projects:filter', 'AI')
      scrollToId('projects')
    },
  },
  { emoji: '📚', label: 'Read the research', go: () => scrollToId('publications') },
  { emoji: '👀', label: 'Just looking around', go: () => scrollToId('about') },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 5) return 'Hello, night owl'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Hero() {
  const role = useTypewriter(roles)
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="hero__hello">
            <span className="wave" role="img" aria-label="waving hand">
              👋
            </span>{' '}
            <span className="hand">{greeting()}, nice to meet you!</span>
          </p>
          <h1>
            I'm{' '}
            <span className="name">
              <span className="gradient-text">{profile.name}</span>
              <svg className="scribble" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength={1} d="M4 16 C 70 6, 140 4, 200 11 S 280 19, 296 8" />
              </svg>
            </span>
          </h1>
          <h2 className="hero__title" aria-label={profile.title}>
            <span aria-hidden="true">
              {role}
              <span className="caret" />
            </span>
          </h2>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">
              View my work
            </a>
            <a href={profile.resume} className="btn btn--ghost" download>
              <DownloadIcon size={16} /> Resume
            </a>
            <div className="socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>

          <div className="intents">
            <p className="hand intents__label">What brings you here?</p>
            <div className="intents__list">
              {intents.map((i) => (
                <button
                  key={i.label}
                  className={`intent ${picked === i.label ? 'intent--picked' : ''}`}
                  onClick={() => {
                    setPicked(i.label)
                    i.go()
                  }}
                >
                  <span className="intent__emoji" aria-hidden="true">
                    {i.emoji}
                  </span>
                  {i.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <p className="hand hand-note" aria-hidden="true">
            go on, hit run again
            <svg viewBox="0 0 60 40" className="hand-note__arrow">
              <path d="M4 6 C 22 4, 40 12, 48 30 M38 26 L48 32 L52 20" />
            </svg>
          </p>
          <TestTerminal />
        </div>
      </div>
    </section>
  )
}

// A small "test report" card that plays like a real Playwright run.
function TestTerminal() {
  const [run, setRun] = useState(0)
  const [step, setStep] = useState(checks.length)
  const running = step < checks.length

  useEffect(() => {
    if (prefersReducedMotion()) return
    setStep(0)
    const timers = checks.map((_, i) => setTimeout(() => setStep(i + 1), 600 + i * 420))
    return () => timers.forEach(clearTimeout)
  }, [run])

  return (
    <div className="hero__card">
      <div className="term__bar">
        <span /> <span /> <span />
        <em>~/samiha</em>
        <button
          className="term__run"
          onClick={() => setRun((r) => r + 1)}
          disabled={running}
          aria-label="Replay the terminal animation"
        >
          <PlayIcon size={11} /> {running ? 'Running…' : 'Run again'}
        </button>
      </div>
      <pre className="term__body" aria-hidden="true">
        <code>
          <span className="c-muted">$ npm run ship</span>
          {'\n\n'}
          {checks.map((c, i) => {
            const state = i < step ? 'done' : i === step ? 'running' : 'pending'
            return (
              <span key={c} className={`term__line term__line--${state}`}>
                <span className="term__mark">
                  {state === 'done' ? '✓' : state === 'running' ? <span className="spin">◐</span> : '○'}
                </span>{' '}
                {c}
                {'\n'}
              </span>
            )
          })}
          {'\n'}
          {running ? (
            <span className="c-muted">
              Building… ({step}/{checks.length})
            </span>
          ) : (
            <>
              <span className="c-ok">✔ {checks.length}/{checks.length} done</span>{' '}
              <span className="c-muted">· ready to ship</span> <span className="c-warm">♥</span>
            </>
          )}
        </code>
      </pre>
    </div>
  )
}
