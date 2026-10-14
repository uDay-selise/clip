type IconProps = {
  name: "flame" | "clock" | "people"
  size?: number
}

export function Icon({ name, size = 24 }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }

  if (name === "flame") {
    return (
      <svg {...common}>
        <path d="M12 3c1.5 3 4.5 4.2 4.5 8a4.5 4.5 0 0 1-9 0c0-1.4.5-2.4 1.2-3.3" />
        <path d="M12 12.5c.9 1 1.4 1.7 1.4 2.6a1.9 1.9 0 0 1-2.8 0" />
      </svg>
    )
  }

  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6.1" />
      <path d="M17.5 14.6A5.5 5.5 0 0 1 20.5 20" />
    </svg>
  )
}