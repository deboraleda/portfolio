import type { IllustrationType } from '../../data/journey';

interface Props {
  type: IllustrationType;
  active: boolean;
}

const stroke = '#4d4740';
const sw = 0.8;
const base = { fill: 'none', stroke, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Tree({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 60 100" width={60} height={100} aria-hidden="true" style={{ overflow: 'visible' }}>
      <g {...base}>
        {/* Trunk */}
        <line x1="30" y1="100" x2="30" y2="55" />
        <line x1="30" y1="80" x2="20" y2="70" />
        <line x1="30" y1="72" x2="40" y2="62" />
        {/* Canopy layers */}
        <path d="M30 55 Q20 45 10 48 Q18 35 30 30 Q42 35 50 48 Q40 45 30 55Z" strokeDasharray={active ? 'none' : '2 2'} />
        <path d="M30 42 Q22 32 14 35 Q22 22 30 18 Q38 22 46 35 Q38 32 30 42Z" strokeDasharray={active ? 'none' : '2 2'} />
        <path d="M30 30 Q24 20 20 22 Q26 10 30 6 Q34 10 40 22 Q36 20 30 30Z" />
        {/* Root lines */}
        <path d="M28 98 Q22 100 18 98" />
        <path d="M32 98 Q38 100 42 98" />
      </g>
    </svg>
  );
}

function Flower({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 50 80" width={50} height={80} aria-hidden="true" style={{ overflow: 'visible' }}>
      <g {...base}>
        {/* Stem */}
        <path d="M25 78 Q24 60 25 40" />
        {/* Leaf */}
        <path d="M25 60 Q18 55 16 48 Q22 52 25 60" />
        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx={25 + Math.cos((angle * Math.PI) / 180) * 10}
            cy={25 + Math.sin((angle * Math.PI) / 180) * 10}
            rx={4}
            ry={7}
            transform={`rotate(${angle}, ${25 + Math.cos((angle * Math.PI) / 180) * 10}, ${25 + Math.sin((angle * Math.PI) / 180) * 10})`}
            opacity={active ? 1 : 0.5}
          />
        ))}
        {/* Center */}
        <circle cx="25" cy="25" r="5" />
        {/* Stippling in center */}
        {[0, 1, 2, 3, 4].map(i => (
          <circle key={i} cx={23 + (i % 3)} cy={24 + Math.floor(i / 3)} r={0.4} fill={stroke} stroke="none" />
        ))}
      </g>
    </svg>
  );
}

function Stone({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 70 50" width={70} height={50} aria-hidden="true" style={{ overflow: 'visible' }}>
      <g {...base}>
        {/* Main stone */}
        <path d="M10 45 Q5 35 10 25 Q18 12 35 10 Q52 12 60 25 Q65 35 60 45Z" strokeDasharray={active ? 'none' : '1.5 2'} />
        {/* Surface detail lines */}
        <path d="M20 20 Q28 17 40 20" opacity={0.5} />
        <path d="M15 32 Q25 28 45 30" opacity={0.4} />
        {/* Moss dots */}
        {[0,1,2,3,4,5].map(i => (
          <circle key={i} cx={22 + i * 5} cy={38} r={0.5} fill={stroke} stroke="none" opacity={0.6} />
        ))}
        {/* Small pebble */}
        <ellipse cx="55" cy="43" rx="6" ry="4" />
      </g>
    </svg>
  );
}

function Mushroom({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 50 70" width={50} height={70} aria-hidden="true" style={{ overflow: 'visible' }}>
      <g {...base}>
        {/* Stem */}
        <path d="M18 68 Q16 55 18 45 Q25 42 32 45 Q34 55 32 68" />
        {/* Cap */}
        <path d="M10 45 Q12 20 25 15 Q38 20 40 45" strokeDasharray={active ? 'none' : '2 1.5'} />
        <path d="M10 45 Q25 50 40 45" />
        {/* Cap spots */}
        {[{x:20,y:30},{x:28,y:25},{x:22,y:22},{x:33,y:35}].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} opacity={0.5} />
        ))}
        {/* Gills suggestion */}
        <path d="M15 44 Q25 48 35 44" opacity={0.4} />
        <path d="M13 42 Q25 46 37 42" opacity={0.3} />
      </g>
    </svg>
  );
}

function Bridge({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 120 60" width={120} height={60} aria-hidden="true" style={{ overflow: 'visible' }}>
      <g {...base}>
        {/* Arch */}
        <path d="M10 55 Q60 5 110 55" strokeDasharray={active ? 'none' : '3 2'} />
        {/* Deck */}
        <line x1="5" y1="55" x2="115" y2="55" />
        {/* Railings */}
        {[15, 30, 45, 60, 75, 90, 105].map((x, i) => {
          const archY = 55 - Math.sin(((x - 10) / 100) * Math.PI) * 50;
          return (
            <line key={i} x1={x} y1={55} x2={x} y2={archY + 4} opacity={0.6} />
          );
        })}
        {/* Handrail */}
        <path d="M15 48 Q60 20 105 48" opacity={0.5} />
        {/* Water lines below */}
        <path d="M0 58 Q30 56 60 58 Q90 60 120 58" opacity={0.3} />
        <path d="M5 61 Q35 59 65 61 Q95 63 115 61" opacity={0.2} />
      </g>
    </svg>
  );
}

function Sign({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 60 80" width={60} height={80} aria-hidden="true" style={{ overflow: 'visible' }}>
      <g {...base}>
        {/* Post */}
        <line x1="25" y1="78" x2="25" y2="30" />
        {/* Sign board */}
        <path d="M5 30 L45 30 L48 40 L45 50 L5 50 L2 40Z" strokeDasharray={active ? 'none' : '2 1.5'} />
        {/* Lines suggesting text */}
        <line x1="10" y1="37" x2="38" y2="37" opacity={0.4} />
        <line x1="10" y1="43" x2="32" y2="43" opacity={0.4} />
        {/* Ground suggestion */}
        <path d="M18 77 Q25 80 32 77" opacity={0.5} />
      </g>
    </svg>
  );
}

const ILLUSTRATIONS: Record<IllustrationType, React.FC<{ active: boolean }>> = {
  tree: Tree,
  flower: Flower,
  stone: Stone,
  mushroom: Mushroom,
  bridge: Bridge,
  sign: Sign,
  house: Sign, // placeholder until house SVG is built
};

export const MilestoneIllustration: React.FC<Props> = ({ type, active }) => {
  const Component = ILLUSTRATIONS[type] ?? Stone;
  return <Component active={active} />;
};
