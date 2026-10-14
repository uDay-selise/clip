import { openingHours, site } from "../../content/site"

export function Location() {
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=-2.26,53.47,-2.23,53.49&layer=mapnik&marker=53.48,-2.245`

  return (
    <section className="section" id="contact" aria-labelledby="visit-title">
      <div className="container">
        <p className="eyebrow">Come and see us</p>
        <h2 className="section-title" id="visit-title">
          Opening hours &amp; where to find us
        </h2>
        <div className="info-grid info-grid--spaced">
          <div>
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
            <div className="info-card info-card--spaced">
              <h3>Find us</h3>
              <p className="info-address">{site.address}</p>
              <p className="info-address">
                <a className="text-link" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
          <div className="map-frame">
            <iframe
              title="Map showing HumoDynamic"
              src={src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}