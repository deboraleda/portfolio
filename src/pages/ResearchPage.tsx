import { GardenDecoration } from '../components/GardenDecoration/GardenDecoration';
import './Page.css';

interface Publication {
  id: string;
  year: string;
  title: string;
  venue: string;
  note?: string;
}

const PUBLICATIONS: Publication[] = [
  {
    id: 'yuma',
    year: '2025',
    title: 'Yuma: Geração de Workflows Multiagentes a partir de Linguagem Natural',
    venue: 'WebMedia 2025 — SBC Open Library (SOL)',
    note: 'Best paper — Tools track (WFA).',
  },
  {
    id: 'code-slm',
    year: '2025',
    title: 'Code Generation with Small Language Models: A Codeforces-Based Study',
    venue: 'ICMLA 2025 — Regular papers',
    note: 'Accepted.',
  },
  {
    id: 'gemini-gpt',
    year: '2024',
    title: 'Comparing Gemini Pro and GPT-3.5 in Algorithmic Problems',
    venue: 'FSE 2024 — Student Research Competition (ACM)',
    note: '2nd place — SRC, graduate track.',
  },
  {
    id: 'chatgpt-programming',
    year: '2023',
    title: 'Study Case: Use of ChatGPT for Programming Problem-Solving',
    venue: 'CBSOFT — CTIC 2023 — SBC Open Library (SOL)',
    note: '1st place — CBSoft 2023 Undergraduate Research competition.',
  },
];

interface Award {
  year: string;
  title: string;
  venue: string;
}

const AWARDS: Award[] = [
  {
    year: '2025',
    title: 'Best paper — Tools track (WFA)',
    venue: 'WebMedia 2025',
  },
  {
    year: '2024',
    title: '2nd place — Student Research Competition (graduate)',
    venue: 'FSE 2024',
  },
  {
    year: '2023',
    title: '1st place — Undergraduate Research competition',
    venue: 'CBSoft 2023',
  },
];

export function ResearchPage() {
  return (
    <div className="page">
      <GardenDecoration/>

      <main className="page__content">
        <div className="page__article">
          <span className="page__label">Research</span>
          <h1 className="page__title">Papers & recognitions.</h1>

          <div className="page__body">
            <p>
              PhD student in Software Engineering at UFCG, working on architectures for
              intelligent agents and automatic code generation via LLMs. Lead researcher at
              Agents4Good — a Kunumi × UFCG lab building multi-agent workflows for social impact.
            </p>
          </div>

          <div className="page__divider" aria-hidden="true">
            <svg viewBox="0 0 300 20" width="300" height="20" fill="none">
              <path d="M0 10 Q75 6 150 10 Q225 14 300 10" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.2"/>
              <circle cx="150" cy="10" r="2" stroke="#2c2c2c" strokeWidth="0.6" opacity="0.25"/>
            </svg>
          </div>

          <div className="page__section">
            <span className="page__section-label">Publications</span>

            <div className="projects-grid">
              {PUBLICATIONS.map(p => (
                <article key={p.id} className="project-card">
                  <header className="project-card__header">
                    <span className="project-card__year">{p.year}</span>
                    <h2 className="project-card__title">{p.title}</h2>
                  </header>
                  <p className="project-card__desc">{p.venue}</p>
                  {p.note && (
                    <p className="project-card__note">{p.note}</p>
                  )}
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

          <div className="page__section">
            <span className="page__section-label">Awards</span>
            <ul className="page__list">
              {AWARDS.map((a, i) => (
                <li key={i}>
                  <strong>{a.title}</strong> — {a.venue} ({a.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
