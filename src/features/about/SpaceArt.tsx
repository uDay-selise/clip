export function SpaceArt() {
  return (
    <svg
      className="about-space__img"
      viewBox="0 0 640 420"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="The HumoDynamic training floor"
    >
      <defs>
        <linearGradient id="about-space" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="url(#about-space)" />

      <rect
        x="0"
        y="300"
        width="640"
        height="120"
        fill="hsl(var(--foreground))"
        fillOpacity="0.16"
      />

      <g stroke="hsl(var(--foreground))" strokeOpacity="0.5" fill="none" strokeWidth="8" strokeLinecap="round">
        <path d="M150 215h150" />
        <path d="M138 185v60M312 185v60M172 197v36M278 197v36" />
        <path d="M225 215v85" />
      </g>

      <g stroke="hsl(var(--foreground))" strokeOpacity="0.45" fill="none" strokeWidth="7" strokeLinecap="round">
        <path d="M400 300V205h92v95" />
        <path d="M400 235h92M440 205v95" />
        <circle cx="446" cy="185" r="14" />
      </g>

      <g fill="hsl(var(--foreground))" fillOpacity="0.4">
        <rect x="60" y="250" width="44" height="50" rx="6" />
        <rect x="112" y="266" width="30" height="34" rx="5" />
      </g>
    </svg>
  )
}