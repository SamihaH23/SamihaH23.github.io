import { useEffect, useRef, useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import { useAppEvent } from '../lib/events'
import Section from './Section'
import { CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

const reasons = [
  { label: 'Job opportunity', emoji: '💼' },
  { label: 'Collaboration', emoji: '🤝' },
  { label: 'Research', emoji: '📚' },
  { label: 'Just saying hi', emoji: '👋' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [reason, setReason] = useState(reasons[0].label)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [flash, setFlash] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // The hero's "I'm hiring" button pre-selects a reason
  useAppEvent('contact:reason', (r) => {
    setReason(r)
    setFlash(true)
  })

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(false), 1200)
    return () => clearTimeout(t)
  }, [flash])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const send = (e: FormEvent) => {
    e.preventDefault()
    const subject = `${reason}${name.trim() ? ` from ${name.trim()}` : ''}`
    const body = `${message.trim()}${name.trim() ? `\n\n${name.trim()}` : ''}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const firstName = profile.name.split(' ')[0]

  return (
    <Section id="contact" eyebrow="06 · Contact" title="Let's work together" note="say hello!">
      <div className="card contact reveal">
        <div className="contact__intro">
          <p>
            I'm open to software engineering roles, research collaborations and interesting
            projects to build. Drop me a note, or reach me directly:
          </p>
          <div className="contact__actions">
            <a href={`mailto:${profile.email}`} className="btn btn--primary">
              <MailIcon size={18} /> {profile.email}
            </a>
            <button
              className={`btn btn--ghost copy-btn ${copied ? 'copy-btn--done' : ''}`}
              onClick={copy}
              aria-label="Copy email address"
            >
              {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <span className="sr-only" aria-live="polite">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
          <div className="socials">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
          </div>
        </div>

        <form ref={formRef} className={`compose ${flash ? 'compose--flash' : ''}`} onSubmit={send}>
          <p className="hand compose__label">write me a quick note ✎</p>

          <div className="reasons" role="group" aria-label="What is this about?">
            {reasons.map((r) => (
              <button
                type="button"
                key={r.label}
                aria-pressed={reason === r.label}
                className={`reason ${reason === r.label ? 'reason--on' : ''}`}
                onClick={() => setReason(r.label)}
              >
                <span aria-hidden="true">{r.emoji}</span> {r.label}
              </button>
            ))}
          </div>

          <label className="field">
            <span>Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane from Acme"
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${firstName}, …`}
              rows={4}
              required
            />
          </label>

          <button type="submit" className="btn btn--primary compose__send">
            <MailIcon size={17} /> Write the email
          </button>
          <p className="compose__hint">Opens your email app with this message ready to send.</p>
        </form>
      </div>
    </Section>
  )
}
