import './Navigation.css';

export type PageId = 'journey' | 'about' | 'projects' | 'research' | 'contact';

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'journey', label: 'Journey' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];

interface NavigationProps {
  active: PageId;
  onNavigate: (id: PageId) => void;
}

export function Navigation({ active, onNavigate }: NavigationProps) {
  return (
    <nav className="nav" aria-label="Main navigation">
      {/* Personal monogram — clicking returns to the journey */}
      <button
        className="nav__logo"
        onClick={() => onNavigate('journey')}
        aria-label="Home"
      >
        <span className="nav__logo-mark">d</span>
        <svg className="nav__logo-leaf" width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
          <path d="M2 12 Q6 8 12 3" stroke="#2c2c2c" strokeWidth="0.8" strokeLinecap="round" opacity="0.55"/>
          <path d="M6 8 Q4 6 3 3" stroke="#2c2c2c" strokeWidth="0.65" strokeLinecap="round" opacity="0.45"/>
          <path d="M9 5 Q11 4 13 2" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
          <circle cx="12" cy="3" r="1.1" stroke="#2c2c2c" strokeWidth="0.7" fill="none" opacity="0.45"/>
        </svg>
      </button>

      <ul className="nav__list" role="list">
        {NAV_ITEMS.map((item, i) => (
          <li key={item.id} className="nav__item-wrapper">
            {i > 0 && <span className="nav__dot" aria-hidden="true" />}
            <button
              className={`nav__item ${active === item.id ? 'nav__item--active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={active === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <span className="nav__botanical nav__botanical--right" aria-hidden="true">
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
          <path d="M24 22 Q20 14 14 10 Q8 6 4 2" stroke="#2c2c2c" strokeWidth="0.7" strokeLinecap="round" opacity="0.35"/>
          <path d="M14 10 Q18 8 20 4" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
          <path d="M14 10 Q12 7 8 6" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
        </svg>
      </span>
    </nav>
  );
}
