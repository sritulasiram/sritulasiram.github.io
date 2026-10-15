/**
 * Architecture diagram for the HR Assistive Intelligence project.
 * Shows only the generic retrieval pipeline: no document names or policy content.
 * Fixed dark palette (like the telemetry bento grids) so it reads the same in both themes.
 */

const ACCENT = "#40CBE0";
const WARN = "#FF6961";
const PANEL = "#1C1C1E";
const STROKE = "#2C2C2E";
const TEXT = "#F5F5F7";
const MUTED = "#8E8E93";

interface NodeProps {
  x: number;
  y: number;
  w: number;
  title: string;
  sub: string;
  color?: string;
}

function Node({ x, y, w, title, sub, color }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={56}
        rx={12}
        fill={PANEL}
        stroke={color ?? STROKE}
        strokeWidth={color ? 1.5 : 1}
      />
      <text x={x + w / 2} y={y + 24} textAnchor="middle" fontSize={12.5} fontWeight={600} fill={TEXT}>
        {title}
      </text>
      <text x={x + w / 2} y={y + 42} textAnchor="middle" fontSize={10} fill={MUTED}>
        {sub}
      </text>
    </g>
  );
}

function Arrow({ d, color = MUTED }: { d: string; color?: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd={`url(#arrow-${color.replace("#", "")})`}
    />
  );
}

export default function RagPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 650 400"
      role="img"
      aria-label="Pipeline: an employee question is rewritten, searched against the document index and checked against a similarity cut-off. Relevant excerpts go to the language model, which writes a cited answer. Otherwise the assistant says it was not found and points to HR, without calling the model."
      className="w-full h-full"
    >
      <defs>
        {[MUTED, ACCENT, WARN].map((c) => (
          <marker
            key={c}
            id={`arrow-${c.replace("#", "")}`}
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill={c} />
          </marker>
        ))}
      </defs>

      <text x={24} y={34} fontSize={10} fontWeight={600} letterSpacing={1.5} fill={MUTED}>
        ANSWER PIPELINE
      </text>

      {/* Row 1: understand and retrieve */}
      <Node x={24} y={62} w={130} title="Question" sub="Employee, in chat" />
      <Node x={185} y={62} w={130} title="Understand" sub="Follow-ups rewritten" />
      <Node x={346} y={62} w={130} title="Vector search" sub="Cosine similarity" />
      <Node x={507} y={62} w={119} title="Relevance gate" sub="Cut-off + margin" color={ACCENT} />
      <Arrow d="M154 90 H181" />
      <Arrow d="M315 90 H342" />
      <Arrow d="M476 90 H503" />

      {/* Row 2: outcomes */}
      <Node x={507} y={222} w={119} title="Not found" sub="Points to HR" color={WARN} />
      <Arrow d="M566.5 118 V218" color={WARN} />
      <text x={574} y={176} fontSize={9.5} fill={WARN}>
        below cut-off
      </text>
      <text x={574} y={190} fontSize={9.5} fill={WARN}>
        no model call
      </text>

      <path
        d="M540 118 V150 H411 V218"
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#arrow-${ACCENT.replace("#", "")})`}
      />
      <text x={418} y={144} fontSize={9.5} fill={ACCENT}>
        relevant excerpts
      </text>

      <Node x={346} y={222} w={130} title="Generate" sub="Streams the answer" color={ACCENT} />
      <Node x={185} y={222} w={130} title="Cited answer" sub="[1] [2] source links" color={ACCENT} />
      <Arrow d="M346 250 H319" color={ACCENT} />

      {/* Knowledge base strip */}
      <rect x={24} y={332} width={602} height={40} rx={12} fill="none" stroke={STROKE} strokeDasharray="4 4" />
      <text x={325} y={356} textAnchor="middle" fontSize={11} fill={MUTED}>
        Indexed from official HR documents · DOCX · PDF · TXT · MD
      </text>
    </svg>
  );
}
