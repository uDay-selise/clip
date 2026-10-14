import { site } from "../../content/site"

export function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero__img" src={site.heroImage} alt="Members training at HumoDynamic" />
      <div className="hero__scrim" aria-hidden />
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__name">{site.name}</h1>
          <p className="hero__headline">{site.headline}</p>
          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href="#contact">
              Book a free trial
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}