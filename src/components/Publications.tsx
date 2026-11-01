import { publications, research, thesis } from '../data/portfolio'
import Section from './Section'
import { BookIcon, ExternalIcon } from './Icons'

export default function Publications() {
  return (
    <Section id="publications" eyebrow="05 · Research" title="Research & publications" note="the curious side of me">
      <div className="card research reveal">
        <h3 className="research__label">Research interests</h3>
        <div className="chips">
          {research.interests.map((i) => (
            <span key={i} className="chip chip--soft">
              {i}
            </span>
          ))}
        </div>
        <p className="research__summary">{research.summary}</p>
      </div>

      <h3 className="research__heading reveal">Publications</h3>
      <ul className="pubs">
        {publications.map((pub) => (
          <li key={pub.title} className="card pub reveal">
            <span className="pub__year">{pub.year ?? '—'}</span>
            <div>
              <h3>
                {pub.link ? (
                  <a href={pub.link} target="_blank" rel="noreferrer">
                    {pub.title} <ExternalIcon size={14} />
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              {pub.venue && <p className="pub__venue">{pub.venue}</p>}
              {pub.note && <span className="pub__note">{pub.note}</span>}
            </div>
          </li>
        ))}
      </ul>

      <h3 className="research__heading reveal">Research experience</h3>
      <div className="card pub reveal">
        <span className="pub__year">{thesis.year}</span>
        <div>
          <h3>{thesis.label}</h3>
          <p className="muted">{thesis.institution}</p>
          <p className="research__thesis">
            <BookIcon size={15} /> <em>{thesis.title}</em>
          </p>
          <p className="muted">
            Supervisor: {thesis.supervisor} ·{' '}
            <a href={`mailto:${thesis.supervisorEmail}`}>{thesis.supervisorEmail}</a>
          </p>
        </div>
      </div>
    </Section>
  )
}
