import { useState } from "react"
import type { TimetableEntry } from "../../content/site"

type Props = {
  entries: TimetableEntry[]
}

const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function Timetable({ entries }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)

  const groups = dayOrder
    .map((day) => ({ day, items: entries.filter((e) => e.day === day) }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="timetable">
      {groups.map((group) => (
        <section className="timetable__day" key={group.day} aria-label={group.day}>
          <h3 className="timetable__day-name">{group.day}</h3>
          <ul className="timetable__list">
            {group.items.map((entry) => {
              const id = `${entry.day}-${entry.time}-${entry.name}`
              const isOpen = openId === id
              return (
                <li className="slot" key={id}>
                  <button
                    type="button"
                    className="slot__row"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : id)}
                  >
                    <span className="slot__time">{entry.time}</span>
                    <span className="slot__name">{entry.name}</span>
                    <span className="slot__trainer">{entry.trainer}</span>
                    <span className="slot__chevron" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && <p className="slot__description">{entry.description}</p>}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}