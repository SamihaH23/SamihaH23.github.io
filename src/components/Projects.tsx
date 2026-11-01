import { useState } from 'react'
import { projects, type Project } from '../data/portfolio'
import { useAppEvent } from '../lib/events'
import Section from './Section'
import { CloseIcon, ExternalIcon, GitHubIcon, SearchIcon } from './Icons'

const filters = ['All', 'AI', 'Web App'] as const
type Filter = (typeof filters)[number]
const isFilter = (v: string): v is Filter => (filters as readonly string[]).includes(v)

const countFor = (f: Filter) =>
  f === 'All' ? projects.length : projects.filter((p) => p.category === f).length

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  // The hero's "Show me AI work" button lands here
  useAppEvent('projects:filter', (f) => {
    if (!isFilter(f)) return
    setFilter(f)
    setQuery('')
  })

  const shown = projects.filter(
    (p) =>
      (filter === 'All' || p.category === filter) &&
      (!q || [p.name, p.description, ...p.tags].some((s) => s.toLowerCase().includes(q))),
  )

  const pickTag = (tag: string) => {
    setFilter('All')
    setQuery(tag)
  }

  const reset = () => {
    setFilter('All')
    setQuery('')
  }

  return (
    <Section
      id="projects"
      eyebrow="04 · Projects"
      title="Things I've built"
      note="psst… the tags are clickable"
    >
      <div className="toolbar reveal">
        <div className="filters" role="group" aria-label="Filter projects by category">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              className={`filter ${filter === f ? 'filter--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f} <span className="filter__count">{countFor(f)}</span>
            </button>
          ))}
        </div>

        <label className="search">
          <SearchIcon size={16} />
          <input
            type="search"
            placeholder="Search projects or tech…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search projects"
          />
          {query && (
            <button className="search__clear" onClick={() => setQuery('')} aria-label="Clear search">
              <CloseIcon size={14} />
            </button>
          )}
        </label>
      </div>

      <p className="results muted" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
        {q && (
          <>
            {' '}
            matching <strong>“{query.trim()}”</strong>
          </>
        )}
      </p>

      {shown.length > 0 ? (
        <div className="projects">
          {shown.map((p) => (
            <ProjectCard key={p.name} project={p} onTag={pickTag} activeTag={q} />
          ))}
        </div>
      ) : (
        <div className="card empty">
          <h3>No projects match</h3>
          <p className="muted">Try a different search or category.</p>
          <button className="btn btn--ghost" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
    </Section>
  )
}

function ProjectCard({
  project: p,
  onTag,
  activeTag,
}: {
  project: Project
  onTag: (tag: string) => void
  activeTag: string
}) {
  return (
    <article className="card project">
      <div className="project__top">
        <span className="project__cat">{p.category}</span>
        <div className="project__links">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.name} on GitHub`}>
              <GitHubIcon />
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" aria-label={`${p.name} live demo`}>
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>
      <h3>
        {p.github ? (
          <a href={p.github} target="_blank" rel="noreferrer" className="project__title">
            {p.name}
          </a>
        ) : (
          p.name
        )}
      </h3>
      <p>{p.description}</p>
      <div className="tags">
        {p.tags.map((t) => (
          <button
            key={t}
            className={`tag ${activeTag === t.toLowerCase() ? 'tag--active' : ''}`}
            onClick={() => onTag(t)}
            title={`Show projects using ${t}`}
          >
            {t}
          </button>
        ))}
      </div>
    </article>
  )
}
