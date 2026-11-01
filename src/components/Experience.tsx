import { experience } from '../data/portfolio'
import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="03 · Experience" title="Where I've worked" note="the journey so far">
      <ol className="timeline">
        {experience.map((job) => {
          const current = job.period.includes('Present')
          return (
            <li key={job.role + job.period} className="timeline__item reveal">
              <span className={`timeline__dot ${current ? 'timeline__dot--live' : ''}`} />
              <div className="card job">
                <div className="job__head">
                  <div>
                    <h3>
                      {job.role}
                      {current && <span className="badge">Current</span>}
                    </h3>
                    <p className="job__company">{job.company}</p>
                  </div>
                  <span className="job__period">{job.period}</span>
                </div>
                <ul className="job__points">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
