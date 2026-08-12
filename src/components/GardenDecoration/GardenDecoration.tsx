import './GardenDecoration.css';

// Reusable botanical decorations for non-journey pages
export function GardenDecoration() {
  return (
    <div className="garden-deco" aria-hidden="true">
      {/* Bottom ground strip with plants */}
      <svg className="garden-deco__ground" viewBox="0 0 1400 90" preserveAspectRatio="xMidYMax meet" fill="none">
        {/* Ground line */}
        <path d="M0 68 Q350 64 700 68 Q1050 72 1400 68" stroke="#2c2c2c" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>

        {/* Grass tufts scattered along the ground */}
        {[40, 110, 200, 290, 380, 450, 540, 620, 700, 790, 870, 960, 1050, 1140, 1230, 1320].map((x, i) => (
          <g key={i} transform={`translate(${x}, 68)`}>
            <path d={`M0 0 Q-2 -${8 + (i%3)*3} -3 -${12 + (i%3)*3}`} stroke="#2c2c2c" strokeWidth="0.65" strokeLinecap="round" opacity="0.4"/>
            <path d={`M2 0 Q3 -${10 + (i%4)*2} 1 -${14 + (i%4)*2}`} stroke="#2c2c2c" strokeWidth="0.65" strokeLinecap="round" opacity="0.45"/>
            <path d={`M5 0 Q7 -${7 + (i%3)*2} 8 -${10 + (i%3)*2}`} stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
          </g>
        ))}

        {/* Small flowers along the bottom */}
        {[160, 430, 680, 920, 1180].map((x, i) => (
          <g key={i} transform={`translate(${x}, 68)`}>
            <line x1="0" y1="0" x2="0" y2="-22" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
            {[0, 72, 144, 216, 288].map((a, j) => {
              const rad = (a * Math.PI) / 180;
              return (
                <ellipse key={j}
                  cx={Math.cos(rad) * 4}
                  cy={-22 + Math.sin(rad) * 4}
                  rx="2" ry="1.2"
                  transform={`rotate(${a}, ${Math.cos(rad)*4}, ${-22 + Math.sin(rad)*4})`}
                  stroke="#2c2c2c" strokeWidth="0.6" opacity="0.3"
                />
              );
            })}
            <circle cx="0" cy="-22" r="1.8" stroke="#2c2c2c" strokeWidth="0.6" opacity="0.35"/>
          </g>
        ))}

        {/* Rocks */}
        {[330, 800, 1100].map((x, i) => (
          <path key={i}
            d={`M${x} 68 Q${x-2} ${63-(i%2)*2} ${x+8} ${62-(i%2)*2} Q${x+18} ${63-(i%2)*2} ${x+20} 68Z`}
            stroke="#2c2c2c" strokeWidth="0.6" opacity="0.25"
          />
        ))}

        {/* Fern-like plants */}
        {[550, 1010].map((x, i) => (
          <g key={i} transform={`translate(${x}, 68)`}>
            <path d="M0 0 Q-1 -14 0 -28" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
            {[[-6,-8],[-5,-14],[-3,-20],[5,-10],[4,-16],[2,-22]].map(([lx, ly], j) => (
              <path key={j} d={`M0 ${ly! + 2} Q${lx!*0.5} ${ly!-2} ${lx!} ${ly!-6}`}
                stroke="#2c2c2c" strokeWidth="0.55" strokeLinecap="round" opacity="0.28"/>
            ))}
          </g>
        ))}
      </svg>

      {/* Left corner botanical */}
      <svg className="garden-deco__corner garden-deco__corner--tl" viewBox="0 0 100 120" fill="none">
        <path d="M2 118 Q10 80 30 50 Q50 20 80 4" stroke="#2c2c2c" strokeWidth="0.7" strokeLinecap="round" opacity="0.18"/>
        <path d="M30 50 Q18 44 12 30" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.15"/>
        <path d="M30 50 Q42 44 50 30" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.15"/>
        <path d="M52 80 Q44 68 40 55" stroke="#2c2c2c" strokeWidth="0.55" strokeLinecap="round" opacity="0.12"/>
        <path d="M52 80 Q62 70 68 58" stroke="#2c2c2c" strokeWidth="0.55" strokeLinecap="round" opacity="0.12"/>
        {/* dots */}
        <circle cx="18" cy="40" r="0.8" fill="#2c2c2c" opacity="0.15"/>
        <circle cx="55" cy="28" r="0.8" fill="#2c2c2c" opacity="0.12"/>
        <circle cx="40" cy="60" r="0.6" fill="#2c2c2c" opacity="0.12"/>
      </svg>

      {/* Right corner botanical */}
      <svg className="garden-deco__corner garden-deco__corner--tr" viewBox="0 0 100 120" fill="none">
        <path d="M98 118 Q90 80 70 50 Q50 20 20 4" stroke="#2c2c2c" strokeWidth="0.7" strokeLinecap="round" opacity="0.18"/>
        <path d="M70 50 Q82 44 88 30" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.15"/>
        <path d="M70 50 Q58 44 50 30" stroke="#2c2c2c" strokeWidth="0.6" strokeLinecap="round" opacity="0.15"/>
        <path d="M48 80 Q56 68 60 55" stroke="#2c2c2c" strokeWidth="0.55" strokeLinecap="round" opacity="0.12"/>
        <circle cx="82" cy="40" r="0.8" fill="#2c2c2c" opacity="0.15"/>
        <circle cx="45" cy="28" r="0.8" fill="#2c2c2c" opacity="0.12"/>
      </svg>
    </div>
  );
}
