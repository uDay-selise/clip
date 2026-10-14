import { useState, type FormEvent } from "react"
import { contact, site } from "../../content/site"

type Enquiry = {
  name: string
  email: string
  phone: string
  classChoice: string
  message: string
}

const EMPTY: Enquiry = {
  name: "",
  email: "",
  phone: "",
  classChoice: contact.classOptions[0],
  message: "",
}

function buildMailto(enquiry: Enquiry): string {
  const body = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    enquiry.phone ? `Phone: ${enquiry.phone}` : null,
    `Class of interest: ${enquiry.classChoice}`,
    "",
    enquiry.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n")

  return `mailto:${site.email}?subject=${encodeURIComponent(
    contact.mailsubject,
  )}&body=${encodeURIComponent(body)}`
}

export function EnquiryForm() {
  const [enquiry, setEnquiry] = useState<Enquiry>(EMPTY)
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)

  const update = (field: keyof Enquiry, value: string) =>
    setEnquiry((current) => ({ ...current, [field]: value }))

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!enquiry.name.trim() || !enquiry.email.trim()) {
      setError(true)
      setSent(false)
      return
    }
    setError(false)
    setSent(true)
    window.location.href = buildMailto(enquiry)
  }

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate>
      <h2 className="enquiry-form__title">{contact.formTitle}</h2>

      <div className="field">
        <label htmlFor="enquiry-name">Name</label>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          autoComplete="name"
          value={enquiry.name}
          onChange={(event) => update("name", event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="enquiry-email">Email</label>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          value={enquiry.email}
          onChange={(event) => update("email", event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="enquiry-phone">Phone</label>
        <input
          id="enquiry-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={enquiry.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="enquiry-class">Which class are you interested in?</label>
        <select
          id="enquiry-class"
          name="class"
          value={enquiry.classChoice}
          onChange={(event) => update("classChoice", event.target.value)}
        >
          {contact.classOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="enquiry-message">Message</label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          value={enquiry.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </div>

      <button className="btn btn--primary btn--lg" type="submit">
        Send enquiry
      </button>

      {error ? (
        <p className="enquiry-form__error" role="alert">
          Please add your name and email so we can reply.
        </p>
      ) : null}

      {sent ? (
        <p className="enquiry-form__confirmation" role="status">
          Thanks — we'll be in touch within one working day.
        </p>
      ) : null}
    </form>
  )
}