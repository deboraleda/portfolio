import React, { useEffect, useRef } from 'react';

interface BeetleSVGProps {
  walking: boolean;
  size?: number;
  className?: string;
}

// Fine-line beetle drawn entirely with SVG paths — no fills, only strokes.
export const BeetleSVG: React.FC<BeetleSVGProps> = ({ walking, size = 40, className }) => {
  const legsRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const antennaRef = useRef<SVGGElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!walking) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = (ts: number) => {
      tRef.current = ts;
      const t = ts * 0.002;

      // Legs: three pairs, alternating gait
      if (legsRef.current) {
        const legs = legsRef.current.querySelectorAll<SVGLineElement>('.beetle-leg');
        legs.forEach((leg, i) => {
          const phase = (i % 2 === 0 ? 0 : Math.PI) + i * 0.4;
          const angle = Math.sin(t * 3 + phase) * 12;
          leg.setAttribute('transform', `rotate(${angle}, ${leg.getAttribute('data-cx')}, ${leg.getAttribute('data-cy')})`);
        });
      }

      // Body: very subtle vertical bob
      if (bodyRef.current) {
        const bob = Math.sin(t * 3) * 0.4;
        bodyRef.current.setAttribute('transform', `translateY(${bob})`);
      }

      // Antennae: slow sway
      if (antennaRef.current) {
        const sway = Math.sin(t * 1.5) * 4;
        antennaRef.current.setAttribute('transform', `rotate(${sway}, 10, 6)`);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [walking]);

  const s = size / 40; // scale factor
  const stroke = '#2c2c2c';
  const sw = 0.9 / s; // stroke-width stays visually consistent

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <g transform={`scale(${s})`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        {/* Body shell */}
        <g ref={bodyRef}>
          {/* Thorax */}
          <ellipse cx="20" cy="20" rx="5" ry="4" />
          {/* Elytra (wing covers) */}
          <ellipse cx="20" cy="27" rx="7" ry="8" />
          {/* Center line on elytra */}
          <line x1="20" y1="19" x2="20" y2="35" />
          {/* Head */}
          <ellipse cx="20" cy="13" rx="4" ry="3" />
          {/* Eyes — tiny dots via small circles */}
          <circle cx="18" cy="12.5" r="0.5" />
          <circle cx="22" cy="12.5" r="0.5" />
          {/* Subtle wing-cover texture */}
          <path d="M16 23 Q20 20 24 23" />
          <path d="M15 27 Q20 24 25 27" />
        </g>

        {/* Antennae */}
        <g ref={antennaRef}>
          <path d="M18 10.5 Q15 7 13 5" />
          <path d="M22 10.5 Q25 7 27 5" />
          {/* Antenna tips */}
          <circle cx="13" cy="5" r="0.7" />
          <circle cx="27" cy="5" r="0.7" />
        </g>

        {/* Legs */}
        <g ref={legsRef}>
          {/* Left legs */}
          <line className="beetle-leg" x1="15" y1="19" x2="8" y2="16" data-cx="15" data-cy="19" />
          <line className="beetle-leg" x1="14" y1="23" x2="6" y2="22" data-cx="14" data-cy="23" />
          <line className="beetle-leg" x1="15" y1="27" x2="8" y2="30" data-cx="15" data-cy="27" />
          {/* Right legs */}
          <line className="beetle-leg" x1="25" y1="19" x2="32" y2="16" data-cx="25" data-cy="19" />
          <line className="beetle-leg" x1="26" y1="23" x2="34" y2="22" data-cx="26" data-cy="23" />
          <line className="beetle-leg" x1="25" y1="27" x2="32" y2="30" data-cx="25" data-cy="27" />
        </g>
      </g>
    </svg>
  );
};
