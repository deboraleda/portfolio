import { GardenDecoration } from '../components/GardenDecoration/GardenDecoration';
import './Page.css';

interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'yuma',
    year: '2025',
    title: 'Yuma — Multi-Agent Workflow Generator',
    description:
      'Automatic generation of multi-agent workflows from natural language, built at Agents4Good (Kunumi × UFCG). Awarded best paper on the WebMedia 2025 tools track.',
    tags: ['Python', 'LLMs', 'Multi-Agent', 'Research'],
  },
  {
    id: 'lightning',
    year: '2023 — 2025',
    title: 'Lightning Notifications App',
    description:
      'Desktop notifications app integrated with Salesforce Lightning, built as a UFCG × Dell Brasil partnership. ReactJS + Electron.',
    tags: ['ReactJS', 'Electron', 'Salesforce', 'Frontend'],
  },
  {
    id: 'salesforce-ds',
    year: '2022 — 2023',
    title: 'Salesforce Data Pipeline',
    description:
      'Data science and engineering on the Dell × UFCG partnership. Dashboards in Splunk and Power BI supporting business analytics.',
    tags: ['Python', 'Splunk', 'Power BI', 'Data'],
  },
  {
    id: 'epol',
    year: '2020 — 2022',
    title: 'ePol — Investigation Graph Visualization',
    description:
      'Partnership with the Brazilian Federal Police for summarization, similarity, and graph visualization of investigations. Led the visualization team applying data mining and distributed computing.',
    tags: ['Python', 'MongoDB', 'Graph Viz', 'Distributed'],
  },
];

export function ProjectsPage() {
  return (
    <div className="page">
      <GardenDecoration/>

      <main className="page__content">
        <div className="page__article">
          <span className="page__label">Projects</span>
          <h1 className="page__title">What's been built.</h1>

          <div className="projects-grid">
            {PROJECTS.map(p => (
              <article key={p.id} className="project-card">
                <header className="project-card__header">
                  <span className="project-card__year">{p.year}</span>
                  <h2 className="project-card__title">{p.title}</h2>
                </header>
                <p className="project-card__desc">{p.description}</p>
                <footer className="project-card__tags">
                  {p.tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </footer>
                {/* Fine-line botanical corner decoration */}
                <span className="project-card__deco" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M2 30 Q8 18 18 10 Q24 6 30 2" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.2"/>
                    <path d="M18 10 Q14 6 12 2" stroke="#2c2c2c" strokeWidth="0.5" strokeLinecap="round" opacity="0.15"/>
                    <path d="M18 10 Q22 7 26 4" stroke="#2c2c2c" strokeWidth="0.5" strokeLinecap="round" opacity="0.15"/>
                  </svg>
                </span>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
