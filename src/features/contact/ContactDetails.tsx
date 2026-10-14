import { site } from "../../content/site"

const mapSrc =
  "https://www.openstreetmap.org/export/embed.html?bbox=-2.26,53.47,-2.23,53.49&layer=mapnik&marker=53.48,-2.245"

const directionsHref = `https://www.openstreetmap.org/directions?from=&to=${encodeURIComponent(
  site.mapQuery,
)}`

export function ContactDetails() {
  return (
    <div className="contact-details">
      <div className="info-card">
        <h3>Visit us</h3>
        <p className="info-address">{site.address}</p>
        <p className="info-address">
          <a className="text-link" href={`tel:${site.phone.replace(/\s/g, "")}`}>
            {site.phone}
          </a>
        </p>
        <p className="info-address">
          <a className="text-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <a
          className="btn btn--primary"
          href={directionsHref}
          target="_blank"
          rel="noreferrer"
        >
          Get directions
        </a>
      </div>
      <div className="map-frame">
        <iframe
          title="Map showing HumoDynamic"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}