import { about, openingHours, site } from "../../content/site"
import { SpaceArt } from "./SpaceArt"

export function AboutPage() {
  return (
    <div className="about-page">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1 className="page-hero__title">About</h1>
          <p className="lede">{about.intro}</p>
        </div>
      </header>

      <section className="section section--tight" aria-label="The gym">
        <div className="container">
          <div className="about-layout">
            <div className="about-copy">
              <p className="about-copy__name">{site.name}</p>
              {about.story.map((paragraph) => (
                <p className="about-copy__para" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <figure className="about-space">
              <SpaceArt />
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="facilities-title">
        <div className="container">
          <div className="about-layout about-layout--flip">
            <div>
              <h2 className="section-title" id="facilities-title">
                The facilities
              </h2>
              <ul className="facility-list">
                {about.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <h3>Opening hours</h3>
              <ul className="hours">
                {openingHours.map((slot) => (
                  <li key={slot.day}>
                    <span>{slot.day}</span>
                    <span>{slot.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}