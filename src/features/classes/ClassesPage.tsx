import { classes } from "../../content/site"
import { Timetable } from "./Timetable"
import { trialHref } from "./router"

export function ClassesPage() {
  return (
    <div className="classes-page">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">The timetable</p>
          <h1 className="page-hero__title">Classes</h1>
          <p className="lede">{classes.intro}</p>
        </div>
      </header>

      <section className="section section--tight" aria-label="Weekly timetable">
        <div className="container">
          <Timetable entries={classes.entries} />
          <div className="timetable__cta">
            <a className="btn btn--primary btn--lg" href={trialHref}>
              Book a free trial
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}