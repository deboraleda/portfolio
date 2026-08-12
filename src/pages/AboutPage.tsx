import { GardenDecoration } from '../components/GardenDecoration/GardenDecoration';
import './Page.css';

export function AboutPage() {
  return (
    <div className="page">
      <GardenDecoration/>

      <main className="page__content">
        <article className="page__article">
          <span className="page__label">About</span>

          <h1 className="page__title">Hello, it's me.</h1>

          <div className="page__body">
            <p>
              I'm a researcher and developer with a curiosity for intelligent systems,
              interfaces, and the space where humans and machines meet.
            </p>
            <p>
              I grew up asking questions that led to more questions. Computer science
              gave me a language to try to answer them.
            </p>
            <p>
              When I'm not writing code or reading papers, I'm probably drawing,
              painting, or trying to understand complex systems I didn't ask
              to understand.
            </p>
          </div>

          {/* Fine-line divider */}
          <div className="page__divider" aria-hidden="true">
            <svg viewBox="0 0 300 20" width="300" height="20" fill="none">
              <path d="M0 10 Q75 6 150 10 Q225 14 300 10" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.2"/>
              <circle cx="150" cy="10" r="2" stroke="#2c2c2c" strokeWidth="0.6" opacity="0.25"/>
            </svg>
          </div>

          <div className="page__section">
            <span className="page__section-label">Interests</span>
            <ul className="page__list">
              <li>Artificial intelligence and machine learning</li>
              <li>Distributed systems</li>
              <li>Interfaces and user experience</li>
              <li>Data visualization</li>
              <li>Computing systems research</li>
            </ul>
          </div>

          <div className="page__section">
            <span className="page__section-label">Technologies</span>
            <ul className="page__list">
              <li>Python · TypeScript · Java · Go</li>
              <li>React · Node.js · FastAPI</li>
              <li>PostgreSQL · Redis</li>
              <li>Docker · Kubernetes</li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
}
