import { useEffect, useState } from 'react';
import type { CreatureType } from '../data/creatures';
import { visitorService } from '../services/visitorService';
import type { VisibleCreature } from '../services/visitorService';

interface VisitorState {
  sessionId: string | null;
  creatureType: CreatureType | null;
  visitorCount: number;
  visibleCreatures: VisibleCreature[];
}

export function useVisitor(): VisitorState {
  const [state, setState] = useState<VisitorState>({
    sessionId: null,
    creatureType: null,
    visitorCount: 0,
    visibleCreatures: [],
  });

  useEffect(() => {
    async function init() {
      /*
       * Register first (may perform an /up call) — only then read the
       * count and creatures, so the number reflects this visit.
       */
      const { sessionId, creatureType } = await visitorService.registerVisitor();
      const [count, creatures] = await Promise.all([
        visitorService.getVisitorCount(),
        visitorService.getVisibleCreatures(),
      ]);
      setState({ sessionId, creatureType, visitorCount: count, visibleCreatures: creatures });
    }
    init();
  }, []);

  return state;
}
