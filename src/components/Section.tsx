import type { ReactNode } from 'react'

type Props = {
  id: string
  eyebrow: string
  title: string
  // Optional handwritten aside next to the title
  note?: string
  children: ReactNode
}

export default function Section({ id, eyebrow, title, note, children }: Props) {
  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <div className="section__title">
            <h2>{title}</h2>
            {note && <span className="hand section__note">{note}</span>}
          </div>
        </header>
        {children}
      </div>
    </section>
  )
}
