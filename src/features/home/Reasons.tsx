import { reasons } from "../../content/site"
import { Icon } from "../../components/Icon"

export function Reasons() {
  return (
    <section className="section" aria-labelledby="reasons-title">
      <div className="container">
        <p className="eyebrow">Why HumoDynamic</p>
        <h2 className="section-title" id="reasons-title">
          Three reasons to join
        </h2>
        <div className="reasons reasons--spaced">
          {reasons.map((reason) => (
            <article className="reason" key={reason.title}>
              <span className="reason__icon">
                <Icon name={reason.icon} size={26} />
              </span>
              <h3 className="reason__title">{reason.title}</h3>
              <p className="reason__text">{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}