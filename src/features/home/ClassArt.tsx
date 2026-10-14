import type { ClassCard } from "../../content/site"

type Props = {
  art: ClassCard["art"]
}

const palettes: Record<ClassCard["art"], [string, string]> = {
  spin: ["hsl(var(--primary))", "hsl(var(--accent))"],
  boxing: ["hsl(var(--destructive))", "hsl(var(--card))"],
  strength: ["hsl(var(--accent-foreground))", "hsl(var(--accent))"],
  hiit: ["hsl(var(--ring))", "hsl(var(--secondary))"],
}

export function ClassArt({ art }: Props) {
  const [a, b] = palettes[art]
  const id = `art-${art}`

  return (
    <svg
      className="class-card__img"
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} stopOpacity="0.55" />
          <stop offset="100%" stopColor={b} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="300" height="400" fill={`url(#${id})`} />
      {art === "spin" && (
        <g stroke="hsl(var(--primary-foreground))" strokeOpacity="0.55" fill="none" strokeWidth="6">
          <circle cx="150" cy="165" r="70" />
          <circle cx="150" cy="165" r="34" />
          <path d="M150 95v140M80 165h140M100 115l100 100M200 115L100 215" />
        </g>
      )}
      {art === "boxing" && (
        <g fill="hsl(var(--foreground))" fillOpacity="0.5">
          <circle cx="150" cy="120" r="46" />
          <rect x="104" y="176" width="92" height="150" rx="34" />
        </g>
      )}
      {art === "strength" && (
        <g stroke="hsl(var(--foreground))" strokeOpacity="0.5" fill="none" strokeWidth="10" strokeLinecap="round">
          <path d="M70 150h160" />
          <path d="M60 120v60M240 120v60M90 132v36M210 132v36" />
          <path d="M150 150v150" />
        </g>
      )}
      {art === "hiit" && (
        <g stroke="hsl(var(--foreground))" strokeOpacity="0.5" fill="none" strokeWidth="9" strokeLinecap="round">
          <path d="M40 300l60-90 50 60 50-120 60 150" />
        </g>
      )}
    </svg>
  )
}