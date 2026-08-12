import { useState } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import type { PageId } from './components/Navigation/Navigation';
import { Garden } from './components/Garden/Garden';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResearchPage } from './pages/ResearchPage';
import { ContactPage } from './pages/ContactPage';
import { useVisitor } from './hooks/useVisitor';
import './styles/global.css';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('journey');
  const { visitorCount } = useVisitor();

  function handleNavigate(id: PageId) {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return (
    <>
      <Navigation active={activePage} onNavigate={handleNavigate}/>

      {activePage === 'journey' && (
        <main>
          <Garden visitorCount={visitorCount}/>
        </main>
      )}

      {activePage === 'about'    && <AboutPage/>}
      {activePage === 'projects' && <ProjectsPage/>}
      {activePage === 'research' && <ResearchPage/>}
      {activePage === 'contact'  && <ContactPage/>}
    </>
  );
}
