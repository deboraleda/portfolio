import { useRef, useEffect } from 'react';

import type { VisibleCreature } from '../../services/visitorService';

import {
  GrassTuft,
  Wildflower,
  Fern,
  Rock,
  Pond,
} from '../Garden/GardenSVG';

import './SharedGarden.css';

const CANVAS_W = 1200;
const CANVAS_H = 380;

function drawCreature(
  ctx: CanvasRenderingContext2D,
  type: string,
  x: number,
  y: number,
  isOwn: boolean
) {
  ctx.save();

  ctx.translate(x, y);

  ctx.strokeStyle = isOwn
    ? '#2c2c2c'
    : 'rgba(44,44,44,0.55)';

  ctx.lineWidth = 0.7;
  ctx.fillStyle = 'none';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (type) {
    case 'butterfly': {
      ctx.beginPath();
      ctx.ellipse(-6, -3, 5, 3, -0.4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(6, -3, 5, 3, 0.4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(0, 6);
      ctx.stroke();

      break;
    }

    case 'bee': {
      ctx.beginPath();
      ctx.ellipse(0, 0, 5, 3, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-2, -3);
      ctx.lineTo(-2, 3);
      ctx.moveTo(1, -3);
      ctx.lineTo(1, 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(-3, -5, 4, 2, -0.5, 0, Math.PI * 2);
      ctx.ellipse(3, -5, 4, 2, 0.5, 0, Math.PI * 2);
      ctx.stroke();

      break;
    }

    case 'moth': {
      ctx.beginPath();
      ctx.ellipse(-7, -1, 6, 4, -0.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(7, -1, 6, 4, 0.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(-5, 3, 4, 2, 0.3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(5, 3, 4, 2, -0.3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(0, 7);
      ctx.stroke();

      break;
    }

    case 'firefly': {
      ctx.beginPath();
      ctx.ellipse(0, 0, 3, 2, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -4, 1, 0, Math.PI * 2);
      ctx.stroke();

      break;
    }

    default: {
      ctx.beginPath();
      ctx.ellipse(0, 2, 4, 6, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, -3, 3, 2.5, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -1);
      ctx.lineTo(0, 8);
      ctx.stroke();

      break;
    }
  }

  if (isOwn) {
    ctx.beginPath();
    ctx.arc(0, 10, 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(44,44,44,0.3)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  ctx.restore();
}

interface SharedGardenProps {
  creatures: VisibleCreature[];
  visitorCount: number;
  visible: boolean;
  hasArrived: boolean;
  arrivalStart?: { left: number; top: number } | null;
}

export const SharedGarden: React.FC<SharedGardenProps> = ({
  creatures,
  visitorCount,
  visible,
  hasArrived,
  arrivalStart,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  const currentVisitor = creatures.find(
    (c) => c.isCurrentVisitor
  );

  /*
   * The current visitor is rendered separately
   * as the arriving ladybug.
   */
  const visibleCreatures = creatures.filter(
    (c) => !c.isCurrentVisitor
  );

  /*
   * Draw existing creatures.
   */
  useEffect(() => {
    if (!visible) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const positions = visibleCreatures.map((c) => ({
      creature: c,
      x: c.x * CANVAS_W,
      y: 80 + c.y * 160,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.04,
    }));

    const render = () => {
      ctx.clearRect(
        0,
        0,
        CANVAS_W,
        CANVAS_H
      );

      positions.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (
          p.x < 20 ||
          p.x > CANVAS_W - 20
        ) {
          p.vx *= -1;
        }

        if (
          p.y < 60 ||
          p.y > CANVAS_H - 40
        ) {
          p.vy *= -1;
        }

        drawCreature(
          ctx,
          p.creature.type,
          p.x,
          p.y,
          p.creature.isCurrentVisitor
        );
      });

      animRef.current =
        requestAnimationFrame(render);
    };

    animRef.current =
      requestAnimationFrame(render);

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [visible, creatures]);

  /*
   * For now the arriving creature falls from
   * the top center of the garden.
   */
  const arrivalLeft = '50%';
  const arrivalTop = '-30%';

  return (
    <section
      className="shared-garden"
      aria-label="Shared visitor garden"
    >
      <div className="shared-garden__header">
        <p className="shared-garden__count">
          <span className="shared-garden__count-number">
            {visitorCount.toLocaleString()}
          </span>{' '}
          creatures have wandered through this garden.
        </p>
      </div>

      <div className="shared-garden__scene">

        {/* BOTANICAL BACKGROUND */}

        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          width="100%"
          height={CANVAS_H}
          className="shared-garden__bg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <line
            x1={0}
            y1={CANVAS_H - 30}
            x2={CANVAS_W}
            y2={CANVAS_H - 30}
            stroke="#2c2c2c"
            strokeWidth={0.8}
            strokeDasharray="6 4"
            strokeLinecap="round"
          />

          {[60, 160, 300, 480, 640, 800, 950, 1100].map(
            (x, i) => (
              <GrassTuft
                key={i}
                x={x}
                y={CANVAS_H - 30}
              />
            )
          )}

          {[200, 500, 850, 1050].map(
            (x, i) => (
              <Wildflower
                key={i}
                x={x}
                y={CANVAS_H - 30}
                height={22}
              />
            )
          )}

          {[380, 720].map(
            (x, i) => (
              <Fern
                key={i}
                x={x}
                y={CANVAS_H - 30}
                scale={0.7}
              />
            )
          )}

          {[120, 600, 1000].map(
            (x, i) => (
              <Rock
                key={i}
                x={x}
                y={CANVAS_H - 30}
                w={14}
                h={8}
              />
            )
          )}

          <Pond
            x={420}
            y={CANVAS_H - 38}
          />

          <Pond
            x={900}
            y={CANVAS_H - 38}
          />
        </svg>

        {/* EXISTING CREATURES */}

        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="shared-garden__canvas"
          aria-label={`${Math.min(
            visibleCreatures.length,
            50
          )} creatures visible in the garden`}
        />

        {/* ARRIVING LADYBUG */}

        {hasArrived && currentVisitor && (
          <div
            className="shared-garden__arrival"
            aria-hidden="true"
            style={{
              left: arrivalLeft,
              top: arrivalTop,
            }}
          >
            <div style={{
              animationName: 'ladybug-fall',
              animationDuration: '6s',
              animationTimingFunction: 'linear',
              animationIterationCount: '1',
              animationFillMode: 'forwards',
            }}>
              <svg
                className="arrival-ladybug"
                viewBox="-20 -25 60 70"
                width="58"
                height="58"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center center',

                    animationName: 'ladybug-wobble',
                    animationDuration: '1.8s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                  }}
                >

                  <ellipse
                    cx="10"
                    cy="15"
                    rx="9"
                    ry="11"
                    className="arrival-bug-body"
                  />

                  <circle
                    cx="10"
                    cy="6"
                    r="4"
                    className="arrival-bug-body"
                  />

                  <path
                    d="M10 10 L10 26"
                    className="arrival-bug-line"
                  />

                  <circle
                    cx="4"
                    cy="13"
                    r="1"
                    className="arrival-bug-dot"
                  />

                  <circle
                    cx="16"
                    cy="13"
                    r="1"
                    className="arrival-bug-dot"
                  />

                  <circle
                    cx="4"
                    cy="5"
                    r="1"
                    className="arrival-bug-dot"
                  />

                  <circle
                    cx="16"
                    cy="5"
                    r="1"
                    className="arrival-bug-dot"
                  />

                  <path
                    d="M2 17 L-5 21"
                    className="arrival-bug-line"
                  />

                  <path
                    d="M18 17 L25 21"
                    className="arrival-bug-line"
                  />

                  <path
                    d="M1 23 L-6 27"
                    className="arrival-bug-line"
                  />

                  <path
                    d="M19 23 L26 27"
                    className="arrival-bug-line"
                  />

                  <path
                    d="M7 3 L3 -4"
                    className="arrival-bug-line"
                  />

                  <path
                    d="M13 3 L17 -4"
                    className="arrival-bug-line"
                  />

                </g>
              </svg>
            </div>
          </div>
        )}
      </div>

      <p className="shared-garden__note">
        Your creature wanders here too, among those who came before.
      </p>
    </section>
  );
};
