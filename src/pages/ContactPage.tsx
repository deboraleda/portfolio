import { GardenDecoration } from '../components/GardenDecoration/GardenDecoration';
import './Page.css';

export function ContactPage() {
  return (
    <div className="page">
      <GardenDecoration/>

      <main className="page__content">
        <article className="page__article">
          <span className="page__label">Contact</span>
          <h1 className="page__title">Let's talk.</h1>

          <div className="page__body">
            <p>
              Open to conversations about research, collaborations, work opportunities,
              or simply ideas that won't leave my head.
            </p>
          </div>

          <div className="page__divider" aria-hidden="true">
            <svg viewBox="0 0 300 20" width="300" height="20" fill="none">
              <path d="M0 10 Q75 6 150 10 Q225 14 300 10" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.2"/>
              <circle cx="150" cy="10" r="2" stroke="#2c2c2c" strokeWidth="0.6" opacity="0.25"/>
            </svg>
          </div>

          <nav className="contact-links" aria-label="Contact links">
            <a href="mailto:hello@example.com" className="contact-link">
              <span className="contact-link__icon" aria-hidden="true">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <rect x="1" y="1" width="16" height="12" rx="1.5" stroke="#2c2c2c" strokeWidth="0.8"/>
                  <path d="M1 2 L9 8 L17 2" stroke="#2c2c2c" strokeWidth="0.7" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="contact-link__label">hello@example.com</span>
              <span className="contact-link__hint">Email</span>
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link__icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1C4.58 1 1 4.68 1 9.19c0 3.62 2.29 6.7 5.47 7.79.4.07.55-.18.55-.39v-1.38c-2.23.5-2.7-1.1-2.7-1.1-.36-.95-.89-1.2-.89-1.2-.73-.51.06-.5.06-.5.8.06 1.23.84 1.23.84.71 1.24 1.87.88 2.33.67.07-.52.28-.88.5-1.08-1.78-.21-3.65-.91-3.65-4.06 0-.9.31-1.63.82-2.2-.08-.21-.36-1.04.08-2.17 0 0 .67-.22 2.2.84A7.4 7.4 0 019 5.4c.68 0 1.37.09 2.01.27 1.53-1.06 2.2-.84 2.2-.84.44 1.13.16 1.96.08 2.17.51.57.82 1.3.82 2.2 0 3.16-1.88 3.85-3.66 4.05.29.25.54.75.54 1.52v2.25c0 .21.14.47.55.39C15.72 15.89 18 12.81 18 9.19 18 4.68 14.42 1 9 1z" stroke="#2c2c2c" strokeWidth="0.7"/>
                </svg>
              </span>
              <span className="contact-link__label">github.com/username</span>
              <span className="contact-link__hint">GitHub</span>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link__icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="1" width="16" height="16" rx="2" stroke="#2c2c2c" strokeWidth="0.8"/>
                  <line x1="5" y1="8" x2="5" y2="13" stroke="#2c2c2c" strokeWidth="0.9" strokeLinecap="round"/>
                  <circle cx="5" cy="6" r="0.8" fill="#2c2c2c"/>
                  <path d="M8 8 v5 M8 10.5 Q8 8 11 8 v5" stroke="#2c2c2c" strokeWidth="0.8" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="contact-link__label">linkedin.com/in/username</span>
              <span className="contact-link__hint">LinkedIn</span>
            </a>

            <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link__icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2 L1 7 L9 12 L17 7 Z" stroke="#2c2c2c" strokeWidth="0.8" strokeLinejoin="round"/>
                  <path d="M4 9.5 V14 Q9 17 14 14 V9.5" stroke="#2c2c2c" strokeWidth="0.8" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="contact-link__label">Google Scholar</span>
              <span className="contact-link__hint">Publications</span>
            </a>
          </nav>
        </article>
      </main>
    </div>
  );
}
