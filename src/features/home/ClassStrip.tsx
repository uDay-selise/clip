import { classCards } from "../../content/site"
import { ClassArt } from "./ClassArt"
import { classesHref } from "../classes/router"

export function ClassStrip() {
  return (
    <section className="section section--tight" aria-labelledby="classes-title">
      <div className="container">
        <p className="eyebrow">On the timetable</p>
        <h2 className="section-title" id="classes-title">
          Classes for every mood
        </h2>
        <div className="class-strip class-strip--spaced">
          {classCards.map((item) => (
            <a
              className="class-card"
              key={item.name}
              href={classesHref}
              aria-label={`${item.name} — ${item.tagline}`}
            >
              <ClassArt art={item.art} />
              <span className="class-card__scrim" aria-hidden />
              <span className="class-card__label">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}