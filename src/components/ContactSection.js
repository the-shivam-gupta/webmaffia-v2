import KlaviyoFormEmbed from "@/components/KlaviyoFormEmbed";

// "Let's talk" — copy on the left, the same Klaviyo form as the header menu on
// the right. The homepage uses the defaults; other pages (service pages) pass
// their own heading / description and can hide the email + phone rows.
export default function ContactSection({
  tagline = "LET'S TALK",
  heading = "Your brand deserves solutions as exceptional as you are.",
  description = "Let’s make it happen!",
  showDetails = true,
}) {
  return (
    <section data-section="contact" className="home_contact">
      <div className="home_contact_info">
        <h2 className="sub_title">{tagline}</h2>
        <div className="sub_heading">{heading}</div>
        <p className="section_description">{description}</p>
        {showDetails ? (
          <div className="home_contact_details">
            <div className="home_contact_item">
              <span className="home_contact_icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3.5 7l8.5 6 8.5-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <a href="mailto:hello@webmaffia.com" className="home_contact_link">
                hello@webmaffia.com
              </a>
            </div>
            <div className="home_contact_item">
              <span className="home_contact_icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1L6.6 10.8z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="home_contact_phones">
                <span className="home_contact_phone">
                  <a href="tel:+919867625909">+91 98676 25909</a>
                  <span className="home_contact_city">Mumbai</span>
                </span>
                <span className="home_contact_phone">
                  <a href="tel:+919867625909">+91 98676 25909</a>
                  <span className="home_contact_city">Bengaluru</span>
                </span>
                <span className="home_contact_phone">
                  <a href="tel:+18669849786">+1 (866) 984-9786</a>
                  <span className="home_contact_city">USA</span>
                </span>
                <span className="home_contact_phone">
                  <a href="tel:+971562722998">+971 56 272 2998</a>
                  <span className="home_contact_city">Dubai</span>
                </span>
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="home_contact_form">
        <KlaviyoFormEmbed />
      </div>
    </section>
  );
}
