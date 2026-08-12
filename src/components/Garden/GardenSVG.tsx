// All elements use stroke only — no fills. Fine-line botanical aesthetic.
const INK = '#4d4740';

function GrassBlade({ x, y, h = 14, lean = 0, op = 1 }: { x: number; y: number; h?: number; lean?: number; op?: number }) {
  return (
    <path
      d={`M${x} ${y} Q${x + lean * 0.6} ${y - h * 0.55} ${x + lean} ${y - h}`}
      fill="none" stroke={INK} strokeWidth={0.65} strokeLinecap="round" opacity={op}
    />
  );
}

export function GrassTuft({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const s = scale;
  return (
    <>
      <GrassBlade x={x} y={y} h={10*s} lean={-3*s} op={0.45}/>
      <GrassBlade x={x+3*s} y={y} h={14*s} lean={1*s} op={0.5}/>
      <GrassBlade x={x+6*s} y={y} h={11*s} lean={3*s} op={0.4}/>
      <GrassBlade x={x+9*s} y={y} h={8*s} lean={-2*s} op={0.35}/>
      <GrassBlade x={x-4*s} y={y} h={9*s} lean={-4*s} op={0.38}/>
    </>
  );
}

export function Wildflower({ x, y, height = 30, op = 0.7 }: { x: number; y: number; height?: number; op?: number }) {
  return (
    <g fill="none" stroke={INK} strokeWidth={0.7} strokeLinecap="round" opacity={op}>
      <path d={`M${x} ${y} Q${x-3} ${y-height*0.5} ${x} ${y-height}`}/>
      <path d={`M${x} ${y-height*0.6} Q${x-8} ${y-height*0.68} ${x-7} ${y-height*0.78}`}/>
      {[0,60,120,180,240,300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const px = x + Math.cos(rad) * 4.5;
        const py = y - height + Math.sin(rad) * 4.5;
        return <ellipse key={i} cx={px} cy={py} rx={2} ry={1.2} transform={`rotate(${angle},${px},${py})`}/>;
      })}
      <circle cx={x} cy={y-height} r={2}/>
    </g>
  );
}

export function Fern({ x, y, scale = 1, op = 0.5 }: { x: number; y: number; scale?: number; op?: number }) {
  const s = scale;
  return (
    <g fill="none" stroke={INK} strokeWidth={0.65} strokeLinecap="round" opacity={op} transform={`translate(${x},${y})`}>
      <path d={`M0 0 Q${-2*s} ${-18*s} 0 ${-36*s}`}/>
      {[[-8,-9],[-7,-15],[-4,-21],[-2,-27],[7,-11],[5,-17],[3,-23],[1,-29]].map(([lx,ly],i) => (
        <path key={i} d={`M0 ${ly!*s} Q${lx!*s*0.5} ${(ly!-3)*s} ${lx!*s} ${(ly!-7)*s}`} opacity={0.7}/>
      ))}
    </g>
  );
}

export function Rock({ x, y, w = 20, h = 12 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g fill="none" stroke={INK} strokeWidth={0.65} strokeLinecap="round" opacity={0.35}>
      <path d={`M${x} ${y} Q${x-w*0.1} ${y-h} ${x+w*0.3} ${y-h*1.1} Q${x+w*0.8} ${y-h} ${x+w} ${y}Z`}/>
      <path d={`M${x+4} ${y-h*0.65} Q${x+w*0.4} ${y-h*0.88} ${x+w-4} ${y-h*0.55}`} opacity={0.5}/>
    </g>
  );
}

export function SlimTree({ x, y, height = 80 }: { x: number; y: number; height?: number }) {
  return (
    <g fill="none" stroke={INK} strokeWidth={0.75} strokeLinecap="round" strokeLinejoin="round" opacity={0.45}>
      <line x1={x} y1={y} x2={x} y2={y-height}/>
      <line x1={x} y1={y-height*0.38} x2={x-18} y2={y-height*0.56}/>
      <line x1={x} y1={y-height*0.52} x2={x+14} y2={y-height*0.68}/>
      <path d={`M${x-14} ${y-height*0.68} Q${x} ${y-height*0.58} ${x+12} ${y-height*0.72} Q${x+5} ${y-height*0.78} ${x+1} ${y-height*0.76} Q${x+9} ${y-height*0.88} ${x} ${y-height}`} strokeDasharray="2 1.5"/>
    </g>
  );
}

export function Branch({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  const f = flip ? -1 : 1;
  return (
    <g fill="none" stroke={INK} strokeWidth={0.7} strokeLinecap="round" opacity={0.3}>
      <path d={`M${x} ${y} Q${x+40*f} ${y-8} ${x+72*f} ${y+18}`}/>
      {[14,30,46,62].map((t,i) => {
        const bx = x + t*f, by = y - 8 + (t/72)*26;
        const lx = bx - 9*f*(i%2===0?1:-1), ly = by-11;
        return <path key={i} d={`M${bx} ${by} Q${(bx+lx)/2} ${by-7} ${lx} ${ly}`} opacity={0.7}/>;
      })}
    </g>
  );
}

export function Pond({ x, y }: { x: number; y: number }) {
  return (
    <g fill="none" stroke={INK} strokeLinecap="round" opacity={0.35}>
      <ellipse cx={x} cy={y} rx={38} ry={13} strokeWidth={0.75}/>
      <ellipse cx={x} cy={y} rx={24} ry={8} strokeWidth={0.5} strokeDasharray="2 3"/>
      <path d={`M${x-16} ${y-4} Q${x-9} ${y-7} ${x-2} ${y-4}`} strokeWidth={0.5}/>
      <path d={`M${x+7} ${y-6} Q${x+14} ${y-10} ${x+21} ${y-6} Q${x+14} ${y-3} ${x+7} ${y-6}`} strokeWidth={0.65}/>
    </g>
  );
}

export function ClimbingVine({ x, y, height = 60 }: { x: number; y: number; height?: number }) {
  return (
    <g fill="none" stroke={INK} strokeWidth={0.6} strokeLinecap="round" opacity={0.3}>
      <path d={`M${x} ${y} Q${x+6} ${y-height*0.25} ${x-4} ${y-height*0.5} Q${x+8} ${y-height*0.75} ${x} ${y-height}`}/>
      {[0.2,0.4,0.6,0.8].map((t,i) => {
        const vy = y - height*t;
        const vx = x + (i%2===0 ? 6 : -4);
        return <path key={i} d={`M${vx} ${vy} Q${vx+(i%2===0?8:-8)} ${vy-5} ${vx+(i%2===0?6:-6)} ${vy-11}`} opacity={0.7}/>;
      })}
    </g>
  );
}

// The walking path — prominent double-dashed trail
export function JourneyPath({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      {/* Outer edge lines */}
      <line x1={x1} y1={y-8} x2={x2} y2={y-8}
        fill="none" stroke={INK} strokeWidth={0.5} strokeDasharray="4 6" strokeLinecap="round" opacity={0.2}/>
      <line x1={x1} y1={y+3} x2={x2} y2={y+3}
        fill="none" stroke={INK} strokeWidth={0.5} strokeDasharray="4 6" strokeLinecap="round" opacity={0.2}/>
      {/* Main center path — the trail */}
      <line x1={x1} y1={y-2} x2={x2} y2={y-2}
        fill="none" stroke={INK} strokeWidth={1.2} strokeDasharray="10 8" strokeLinecap="round" opacity={0.55}/>
    </g>
  );
}

// Ground baseline
export function Ground({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <path
      d={`M${x1} ${y} Q${(x1+x2)/3} ${y-1} ${(x1+x2)/2} ${y} Q${(x1+x2)*0.7} ${y+1} ${x2} ${y}`}
      fill="none" stroke={INK} strokeWidth={0.8} strokeLinecap="round" opacity={0.3}
    />
  );
}

// Tiny stippling dots for texture
export function StippleCluster({ x, y, count = 6 }: { x: number; y: number; count?: number }) {
  return (
    <>
      {Array.from({length: count}, (_,i) => {
        const ox = (i % 3) * 3 - 3;
        const oy = Math.floor(i / 3) * 3;
        return <circle key={i} cx={x+ox} cy={y+oy} r={0.5} fill={INK} opacity={0.2}/>;
      })}
    </>
  );
}
