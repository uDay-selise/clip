import { contact } from "../../content/site"
import { ContactDetails } from "./ContactDetails"
import { EnquiryForm } from "./EnquiryForm"

export function ContactPage() {
  return (
    <div className="contact-page">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Start free</p>
          <h1 className="page-hero__title">Contact</h1>
          <p className="lede">{contact.intro}</p>
        </div>
      </header>

      <section className="section section--tight" aria-label="Contact and enquiry">
        <div className="container">
          <div className="contact-layout">
            <ContactDetails />
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  )
}