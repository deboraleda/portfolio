import { CREATURE_TYPES } from '../data/creatures';
import type { CreatureType } from '../data/creatures';

export interface VisibleCreature {
  id: string;
  type: CreatureType;
  x: number; // 0–1 relative position in shared garden
  y: number;
  isCurrentVisitor: boolean;
}

export interface VisitorService {
  getVisitorCount(): Promise<number>;
  registerVisitor(): Promise<{ sessionId: string; creatureType: CreatureType }>;
  getVisibleCreatures(): Promise<VisibleCreature[]>;
}

// counterapi.dev v2 — public, no auth, one counter per (workspace, name).
const COUNTER_URL =
  'https://api.counterapi.dev/v2/debora-portfolio/debora-portfolio';

// Session guards
const SESSION_KEY = 'garden_session_id';
const REGISTERED_KEY = 'garden_registered';

function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateMockCreatures(count: number, currentId: string): VisibleCreature[] {
  const visible = Math.min(count, 50);
  return Array.from({ length: visible }, (_, i) => {
    const r1 = seededRandom(i * 3 + 1);
    const r2 = seededRandom(i * 3 + 2);
    const r3 = seededRandom(i * 3 + 3);
    const type = CREATURE_TYPES[Math.floor(r3 * CREATURE_TYPES.length)];
    return {
      id: `creature_${i}`,
      type,
      x: r1,
      y: r2,
      isCurrentVisitor: false,
    };
  }).concat([
    {
      id: currentId,
      type: CREATURE_TYPES[Math.floor(seededRandom(currentId.length) * CREATURE_TYPES.length)],
      x: 0.5 + seededRandom(currentId.charCodeAt(0)) * 0.3,
      y: 0.4 + seededRandom(currentId.charCodeAt(1) || 1) * 0.2,
      isCurrentVisitor: true,
    },
  ]).slice(0, 50);
}

// counterapi.dev v2 responses look like { data: { up_count, down_count, ... } }.
// Fall back through likely keys so we don't break if the shape shifts.
function parseCount(payload: unknown): number {
  const p = payload as {
    data?: { up_count?: number; count?: number };
    count?: number;
    up_count?: number;
  };
  return (
    p?.data?.up_count ??
    p?.data?.count ??
    p?.up_count ??
    p?.count ??
    0
  );
}

async function fetchCount(url: string): Promise<number> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Counter API error: ${response.status}`);
  }
  const json = await response.json();
  return parseCount(json);
}

async function incrementVisitorCount(): Promise<number> {
  return fetchCount(`${COUNTER_URL}/up`);
}

async function getRemoteVisitorCount(): Promise<number> {
  return fetchCount(COUNTER_URL);
}

export function createCounterApiVisitorService(): VisitorService {
  return {
    async getVisitorCount() {
      try {
        return await getRemoteVisitorCount();
      } catch (err) {
        console.warn('[visitorService] getVisitorCount failed', err);
        return 0;
      }
    },

    async registerVisitor() {
      const sessionId = getOrCreateSessionId();
      const alreadyRegistered =
        sessionStorage.getItem(REGISTERED_KEY) === '1';

      if (!alreadyRegistered) {
        /*
         * Set the flag BEFORE the network call so React StrictMode's
         * double-invoke in dev doesn't double-increment the counter.
         */
        sessionStorage.setItem(REGISTERED_KEY, '1');
        try {
          await incrementVisitorCount();
        } catch (err) {
          console.warn('[visitorService] increment failed', err);
        }
      }

      const type = CREATURE_TYPES[
        Math.floor(
          seededRandom(sessionId.length + sessionId.charCodeAt(0)) *
            CREATURE_TYPES.length
        )
      ];
      return { sessionId, creatureType: type };
    },

    async getVisibleCreatures() {
      const sessionId = getOrCreateSessionId();
      let count = 0;
      try {
        count = await getRemoteVisitorCount();
      } catch {
        count = 0;
      }
      return generateMockCreatures(count, sessionId);
    },
  };
}

export const visitorService = createCounterApiVisitorService();
