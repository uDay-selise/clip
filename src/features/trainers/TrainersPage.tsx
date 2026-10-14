import { trainers } from "../../content/site"
import { TrainerArt } from "./TrainerArt"
import { trialHref } from "../classes/router"

export function TrainersPage() {
  return (
    <div className="trainers-page">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Who coaches you</p>
          <h1 className="page-hero__title">Trainers</h1>
          <p className="lede">{trainers.intro}</p>
        </div>
      </header>

      <section className="section section--tight" aria-label="The coaching team">
        <div className="container">
          <ul className="trainer-grid">
            {trainers.people.map((trainer) => (
              <li className="trainer-card" key={trainer.name}>
                <div className="trainer-card__media">
                  <TrainerArt art={trainer.art} />
                </div>
                <div className="trainer-card__body">
                  <h3 className="trainer-card__name">{trainer.name}</h3>
                  <p className="trainer-card__coaches">{trainer.coaches}</p>
                  <p className="trainer-card__line">{trainer.line}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="trainers__cta">
            <a className="btn btn--primary btn--lg" href={trialHref}>
              Book a free trial
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}