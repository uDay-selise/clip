import type { TrainerArt } from "../../content/site"

type Props = {
  art: TrainerArt
}

const palettes: Record<TrainerArt, [string, string]> = {
  mara: ["hsl(var(--primary))", "hsl(var(--accent))"],
  dan: ["hsl(var(--destructive))", "hsl(var(--card))"],
  priya: ["hsl(var(--accent-foreground))", "hsl(var(--accent))"],
  sam: ["hsl(var(--ring))", "hsl(var(--secondary))"],
}

const hair: Record<TrainerArt, string> = {
  mara: "M96 96c0-30 24-52 54-52s54 22 54 52c0 12-6 20-8 30-2-14-8-22-18-26-14-6-42-6-56 0-10 4-16 12-18 26-2-10-8-18-8-30Z",
  dan: "M100 94c0-26 22-46 50-46s50 20 50 46c0 6-1 11-2 16-6-10-14-15-24-17-14-4-34-4-48 0-10 2-18 7-24 17-1-5-2-10-2-16Z",
  priya:
    "M98 112c-2-34 22-64 52-64s54 30 52 64c-1 16-4 30-8 44-3-16-1-30-8-40-8-12-22-18-36-18s-28 6-36 18c-7 10-5 24-8 40-4-14-7-28-8-44Z",
  sam: "M104 100c0-28 20-48 46-48s46 20 46 48c0 14-4 24-8 34-4-14-6-24-14-30-10-8-38-8-48 0-8 6-10 16-14 30-4-10-8-20-8-34Z",
}

export function TrainerArt({ art }: Props) {
  const [a, b] = palettes[art]
  const id = `trainer-art-${art}`

  return (
    <svg
      className="trainer-card__img"
      viewBox="0 0 300 340"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} stopOpacity="0.55" />
          <stop offset="100%" stopColor={b} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="300" height="340" fill={`url(#${id})`} />
      <circle cx="150" cy="128" r="58" fill="hsl(var(--foreground))" fillOpacity="0.28" />
      <path
        d={hair[art]}
        fill="hsl(var(--foreground))"
        fillOpacity="0.5"
      />
      <path
        d="M74 340c0-52 34-88 76-88s76 36 76 88Z"
        fill="hsl(var(--foreground))"
        fillOpacity="0.22"
      />
    </svg>
  )
}