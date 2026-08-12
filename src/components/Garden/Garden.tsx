import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CREATURE_TYPES } from "../../data/creatures";
import journey from "../../data/journey";
import type { IllustrationType } from "../../data/journey";
import type { VisibleCreature } from "../../services/visitorService";
import "./Garden.css";
import { SharedGarden } from "../SharedGarden/SharedGarden";
import { Fern, GrassTuft, Rock, Wildflower } from "./GardenSVG";
import { MilestoneIllustration } from "../Milestone/MilestoneIllustration";

interface GardenProps {
  visitorCount: number;
}

const VIEWBOX_WIDTH = 1200;

/*
 * Journey layout — every metric scales with the number of
 * events in `journey.ts`. Adjust the constants below to
 * tune spacing without touching the path itself.
 */
const CENTER_X = 600;
const PATH_AMPLITUDE = 62;      // horizontal swing to each side
const TOP_MARGIN = 230;          // path start Y
const BOTTOM_MARGIN = 300;       // room after the last milestone
const MILESTONE_SPACING = 400;   // vertical distance per event

const VIEWBOX_HEIGHT =
  TOP_MARGIN + journey.length * MILESTONE_SPACING + BOTTOM_MARGIN;

// Milestone positions along the path — alternating sides.
const MILESTONE_POSITIONS = journey.map((_, i) => ({
  y: TOP_MARGIN + (i + 0.5) * MILESTONE_SPACING,
  side: (i % 2 === 0 ? "left" : "right") as "left" | "right",
}));

// Build a serpentine cubic-bezier path that visits every milestone.
function buildJourneyPath(): string {
  const sideX = (side: "left" | "right") =>
    side === "left" ? CENTER_X - PATH_AMPLITUDE : CENTER_X + PATH_AMPLITUDE;

  let d = `M ${CENTER_X} ${TOP_MARGIN}`;
  let prevX = CENTER_X;
  let prevY = TOP_MARGIN;

  for (const pos of MILESTONE_POSITIONS) {
    const x = sideX(pos.side);
    const y = pos.y;
    const dy = y - prevY;
    const cp1y = prevY + dy / 3;
    const cp2y = prevY + (dy * 2) / 3;
    d += ` C ${prevX} ${cp1y}, ${x} ${cp2y}, ${x} ${y}`;
    prevX = x;
    prevY = y;
  }

  // Trail off to bottom center.
  const finalY = VIEWBOX_HEIGHT;
  const dy = finalY - prevY;
  d += ` C ${prevX} ${prevY + dy / 3}, ${CENTER_X} ${prevY + (dy * 2) / 3}, ${CENTER_X} ${finalY}`;

  return d;
}

const JOURNEY_PATH = buildJourneyPath();

const milestones = journey.map((m, i) => ({
  id: String(i + 1).padStart(2, "0"),
  year: m.year,
  title: m.title,
  description: m.description,
  illustration: m.illustration,
  y: MILESTONE_POSITIONS[i].y,
  side: MILESTONE_POSITIONS[i].side,
}));

/*
 * Ambient butterflies — one per milestone segment, opposite the
 * illustration, so the empty space between events feels alive.
 */
const AMBIENT_BUTTERFLIES = journey.map((_, i) => ({
  x: i % 2 === 0 ? 220 : 980,
  y: TOP_MARGIN + i * MILESTONE_SPACING + MILESTONE_SPACING * 0.2,
  driftDelay: (i * 0.9) % 4,
  flapDelay: (i * 0.17) % 0.7,
}));

/* ---------------------------------------------------------
   SMALL LADYBUG
--------------------------------------------------------- */

function Ladybug({
  x = 0,
  y = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="ladybug">
      {/* body */}
      <ellipse
        cx="0"
        cy="0"
        rx="7"
        ry="9"
        className="bug-body"
      />

      {/* head */}
      <circle
        cx="0"
        cy="-8"
        r="4"
        className="bug-body"
      />

      {/* center line */}
      <path
        d="M0 -3 L0 8"
        className="bug-line"
      />

      {/* dots */}
      <circle cx="-3.5" cy="-2" r="1" className="bug-dot" />
      <circle cx="3.5" cy="-2" r="1" className="bug-dot" />
      <circle cx="-3.5" cy="4" r="1" className="bug-dot" />
      <circle cx="3.5" cy="4" r="1" className="bug-dot" />

      {/* legs */}
      <path d="M-5 -2 L-10 -5" className="bug-line" />
      <path d="M-6 2 L-11 2" className="bug-line" />
      <path d="M-5 6 L-10 9" className="bug-line" />

      <path d="M5 -2 L10 -5" className="bug-line" />
      <path d="M6 2 L11 2" className="bug-line" />
      <path d="M5 6 L10 9" className="bug-line" />

      {/* antennae */}
      <path d="M-2 -11 L-6 -16" className="bug-line" />
      <path d="M2 -11 L6 -16" className="bug-line" />
     </g>
    </g>
  );
}

/* ---------------------------------------------------------
   MILESTONE
--------------------------------------------------------- */

function Milestone({
  id,
  year,
  title,
  description,
  y,
  side,
  illustration,
  active,
}: {
  id: string;
  year: string;
  title: string;
  description: string;
  y: number;
  side: "left" | "right";
  illustration: IllustrationType;
  active: boolean;
}) {
  const left = side === "left";

  // Illustration sits on the OPPOSITE side of the path from the text.
  const illustrationCX = left ? 800 : 400;

  /*
   * The description's <foreignObject> needs an explicit height, but
   * text length varies per milestone. Measure the rendered <div>
   * after mount and feed its natural height back into the SVG.
   */
  const descRef = useRef<HTMLDivElement | null>(null);
  const [descHeight, setDescHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (descRef.current) {
      setDescHeight(descRef.current.scrollHeight);
    }
  }, [description]);

  /*
   * The event is deliberately outside the path.
   *
   * LEFT:
   * event ---- | ---- dotted path
   *
   * RIGHT:
   * dotted path ---- | ---- event
   */

  const textX = left ? 330 : 870;
  const lineX1 = left ? 430 : 770;
  const lineX2 = left ? 540 : 660;

  /*
   * Text block layout — all offsets are relative to this frame.
   * Change TEXT_OFFSET_Y to shift the whole block up/down and the
   * marker follows automatically.
   */
  const TEXT_OFFSET_Y = -50;
  const DESCRIPTION_TOP = TEXT_OFFSET_Y + 45;
  const markerTop = TEXT_OFFSET_Y - 28;
  const markerBottom = DESCRIPTION_TOP + (descHeight ?? 100) + 6;

  return (
    <g transform={`translate(0 ${y})`}>
      {/* vertical event marker — spans the full text block */}
      <path
        d={`M${lineX1} ${markerTop} L${lineX1} ${markerBottom}`}
        className="event-marker"
      />

      <circle
        cx={lineX1}
        cy={markerTop}
        r="2.5"
        className="event-marker-dot"
      />

      <circle
        cx={lineX1}
        cy={markerBottom}
        r="2.5"
        className="event-marker-dot"
      />

      {/* horizontal connector towards the journey path */}
      <path
        d={`M${lineX1} 0 L${lineX2} 0`}
        className="event-connector"
      />

      <g
        transform={`translate(${textX} ${TEXT_OFFSET_Y})`}
        textAnchor={left ? "end" : "start"}
      >
        <text
          x="0"
          y="-14"
          className="event-number"
        >
          {id}
        </text>

        <text
          x="0"
          y="9"
          className="event-title"
        >
          {title}
        </text>

        <text
          x="0"
          y="32"
          className="event-year"
        >
          {year}
        </text>

        <foreignObject
          x={left ? -190 : 0}
          y="45"
          width="210"
          height={descHeight ?? 300}
          style={{ overflow: "visible" }}
        >
          <div
            ref={descRef}
            className={`event-description ${
              left ? "event-description--left" : ""
            }`}
          >
            {description}
          </div>
        </foreignObject>
      </g>

      {/* Milestone illustration on the opposite side of the path */}
      <foreignObject
        x={illustrationCX - 70}
        y={-70}
        width="140"
        height="140"
        className={`milestone-illustration-slot ${active ? "milestone-illustration-slot--active" : ""}`}
      >
        <div className="milestone-illustration-wrap">
          <MilestoneIllustration type={illustration} active={active} />
        </div>
      </foreignObject>
    </g>
  );
}

/* ---------------------------------------------------------
   GARDEN
--------------------------------------------------------- */

export function Garden({
  visitorCount,
}: GardenProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [arrivalStart, setArrivalStart] = useState<{ left: number; top: number } | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }

      setScrollProgress(
        Math.max(
          0,
          Math.min(1, window.scrollY / maxScroll)
        )
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const sharedGardenCreatures: VisibleCreature[] = Array.from(
    { length: Math.min(Math.max(visitorCount, 8), 24) },
    (_, index) => {
      const type = CREATURE_TYPES[(index + visitorCount) % CREATURE_TYPES.length];

      return {
        id: `garden-creature-${index}`,
        type,
        x: 0.08 + (index % 6) * 0.14,
        y: 0.1 + Math.floor(index / 6) * 0.24,
        isCurrentVisitor: index === 0,
      };
    }
  );

  const pathProgress = Math.min(scrollProgress / 0.94, 1);

  /*
   * Derived from scroll: as soon as the user leaves the end of the
   * path (scrolls back up), hasArrived flips false and the arrival
   * ladybug unmounts from the SharedGarden — reappearing on the trail.
   * Coming back down remounts it, restarting the fall animation.
   */
  const hasArrived = pathProgress >= 1;

  // Defaults match the path's starting point so the ladybug sits ON
  // the path from the very first render (before pathRef is populated).
  let insectX = CENTER_X;
  let insectY = TOP_MARGIN;

  if (pathRef.current) {
    const pathLength =
      pathRef.current.getTotalLength();

    const point =
      pathRef.current.getPointAtLength(
        pathLength * pathProgress
      );

    insectX = point.x;
    insectY = point.y;
  }

  useEffect(() => {
    if (pathProgress >= 1) {
      // compute screen position of the insect from svg coordinates
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const left = svgRect.left + (insectX / VIEWBOX_WIDTH) * svgRect.width;
        const top = svgRect.top + (insectY / VIEWBOX_HEIGHT) * svgRect.height;
        setArrivalStart({ left, top });
      }
    } else {
      setArrivalStart(null);
    }
  }, [pathProgress, insectX, insectY]);

  return (
    <section className="garden">
      <svg
        ref={svgRef}
        className="garden-svg"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMin meet"
        aria-label="Journey through the garden"
      >
        <rect
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
          className="garden-background"
        />
        {/* ==================================================
            AUTHOR INTRO
        ================================================== */}

        <foreignObject
          x={400}
          y={20}
          width={400}
          height={100}
        >
          <div className="journey-hero">
            <div className="journey-hero__name">Débora Lêda</div>
            <div className="journey-hero__title">Computer Scientist &amp; Researcher</div>
            <p className="journey-hero__bio">
              I study software engineering, artificial intelligence,
              and how AI agents behave in practice.
            </p>
          </div>
        </foreignObject>

        {/* ==================================================
            JOURNEY INVITATION
        ================================================== */}

        <text
          x="600"
          y="170"
          textAnchor="middle"
          className="journey-intro"
        >
          follow my journey
        </text>

        <path
          d="M470 190 C520 200 680 200 730 190"
          className="journey-intro-decoration"
        />

        {/* ==================================================
            UPPER GARDEN
        ================================================== */}

        <GrassTuft x={120} y={250} scale={0.8} />
        <GrassTuft x={260} y={330} scale={0.6} />
        <GrassTuft x={940} y={260} scale={0.75} />
        <GrassTuft x={1060} y={360} scale={0.7} />

        <Wildflower x={70} y={470} height={24} />
        <Wildflower x={1030} y={500} height={26} />

        <Wildflower x={350} y={440} height={26} />
        <Wildflower x={820} y={450} height={24} />

        <Rock x={210} y={510} w={18} h={10} />
        <Rock x={930} y={520} w={16} h={9} />

        <Fern x={170} y={610} scale={0.8} />
        <Fern x={1010} y={670} scale={0.9} />

        {/* ==================================================
            FIRST SECTION
        ================================================== */}

        <GrassTuft x={90} y={720} scale={0.7} />
        <GrassTuft x={300} y={790} scale={0.55} />
        <GrassTuft x={980} y={750} scale={0.7} />

        <Wildflower x={220} y={850} height={22} />
        <Wildflower x={850} y={880} height={24} />

        <Rock x={150} y={950} w={18} h={9} />
        <Fern x={1040} y={1080} scale={0.8} />
        <Fern x={250} y={1110} scale={0.75} />

        {/* ==================================================
            SECOND SECTION
        ================================================== */}

        <GrassTuft x={110} y={1450} scale={0.8} />
        <GrassTuft x={940} y={1470} scale={0.7} />

        <Wildflower x={300} y={1530} height={24} />
        <Wildflower x={800} y={1550} height={24} />

        <Wildflower x={200} y={1600} height={22} />
        <Wildflower x={1020} y={1640} height={24} />

        <Rock x={300} y={1780} w={18} h={9} />
        <Fern x={870} y={1810} scale={0.8} />

        <GrassTuft x={180} y={1930} scale={0.7} />
        <GrassTuft x={1020} y={1980} scale={0.8} />

        {/* ==================================================
            THIRD SECTION
        ================================================== */}

        <GrassTuft x={100} y={2200} scale={0.8} />
        <GrassTuft x={1030} y={2250} scale={0.75} />

        <Wildflower x={270} y={2310} height={22} />
        <Wildflower x={850} y={2350} height={23} />

        <Wildflower x={170} y={2420} height={20} />
        <Wildflower x={970} y={2440} height={22} />

        <Rock x={320} y={2520} w={18} h={9} />

        <Fern x={110} y={2730} scale={0.75} />
        <Fern x={980} y={2780} scale={0.85} />

        {/* ==================================================
            FOURTH SECTION
        ================================================== */}

        <GrassTuft x={200} y={3000} scale={0.75} />
        <GrassTuft x={1060} y={3050} scale={0.7} />

        <Wildflower x={310} y={3120} height={24} />
        <Wildflower x={900} y={3160} height={23} />

        <Wildflower x={100} y={3250} height={20} />
        <Wildflower x={1040} y={3300} height={22} />

        <Rock x={280} y={3350} w={18} h={9} />
        <Rock x={900} y={3380} w={16} h={8} />

        <GrassTuft x={120} y={3500} scale={0.8} />
        <GrassTuft x={1010} y={3520} scale={0.75} />

        {/* ==================================================
            FINAL JOURNEY SECTION
        ================================================== */}

        <GrassTuft x={170} y={3850} scale={0.7} />
        <GrassTuft x={1020} y={3900} scale={0.75} />

        <Wildflower x={290} y={3980} height={22} />
        <Wildflower x={850} y={4020} height={24} />

        <Wildflower x={100} y={4150} height={20} />
        <Wildflower x={1050} y={4180} height={22} />

        {/* ==================================================
            JOURNEY PATH
        ================================================== */}

        <path
          ref={pathRef}
          d={JOURNEY_PATH}
          className="journey-path"
        />

        {/* ==================================================
            EVENTS
        ================================================== */}

        {milestones.map((milestone) => (
          <Milestone
            key={milestone.id}
            {...milestone}
            active={insectY >= milestone.y}
          />
        ))}

        {/* ==================================================
            AMBIENT BUTTERFLIES
        ================================================== */}

        {AMBIENT_BUTTERFLIES.map((b, i) => (
          <g
            key={`butterfly-${i}`}
            transform={`translate(${b.x} ${b.y})`}
          >
            <g
              className="ambient-butterfly-drift"
              style={{ animationDelay: `${b.driftDelay}s` }}
            >
              <g
                className="ambient-butterfly-flap"
                style={{ animationDelay: `${b.flapDelay}s` }}
              >
                <ellipse cx="-5" cy="-3" rx="5" ry="3" transform="rotate(-22 -5 -3)" className="ambient-butterfly-wing" />
                <ellipse cx="5" cy="-3" rx="5" ry="3" transform="rotate(22 5 -3)" className="ambient-butterfly-wing" />
                <ellipse cx="-4" cy="3" rx="3.5" ry="2" transform="rotate(-15 -4 3)" className="ambient-butterfly-wing" />
                <ellipse cx="4" cy="3" rx="3.5" ry="2" transform="rotate(15 4 3)" className="ambient-butterfly-wing" />
                <line x1="0" y1="-5" x2="0" y2="5" className="ambient-butterfly-body" />
              </g>
            </g>
          </g>
        ))}

        {/* ==================================================
            CURRENT VISITOR
        ================================================== */}

        {scrollProgress < 0.94 && (
          <g transform={`translate(${insectX} ${insectY})`}>
            <g className="journey-visitor-bob">
              <Ladybug scale={0.8} />
            </g>
          </g>
        )}

        {/* ==================================================
            FINAL SHARED GARDEN
        ================================================== */}
      </svg>
      <SharedGarden
        creatures={sharedGardenCreatures}
        visitorCount={visitorCount}
        visible
        hasArrived={hasArrived}
        arrivalStart={arrivalStart}
      />
    </section>
  );
}