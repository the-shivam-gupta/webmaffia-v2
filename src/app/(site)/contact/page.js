import Image from "next/image";
import Banner from "@/components/Banner";
import HomeFaq from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import KlaviyoFormEmbed from "@/components/KlaviyoFormEmbed";
import { telHref } from "@/lib/offices";
import { formatUpdatedAt } from "@/lib/dates";
import {
  CONTACT_FAQS,
  CONTACT_OFFICES,
  CONTACT_SERVICES,
  CONTACT_STEPS,
  CONTACT_UPDATED,
} from "@/lib/contactPage";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  ORGANIZATION_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  SITE_URL,
} from "@/lib/schema";

export const metadata = {
  alternates: {
    canonical: "https://www.webmaffia.com/contact",
  },
  title: "Contact Webmaffia | Offices in Mumbai, Bengaluru, Dubai and USA",
  description:
    "Contact Webmaffia by email, phone or the enquiry form. Offices in Mumbai, Bengaluru, Dubai and Sheridan, USA. Replies within 2 business days.",
};

const UPDATED = formatUpdatedAt(CONTACT_UPDATED);

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

const CONTACT_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Webmaffia",
  url: `${SITE_URL}/contact`,
  ...(UPDATED ? { dateModified: UPDATED.iso } : {}),
  publisher: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
};

const FAQ_SCHEMA = buildFaqSchema(CONTACT_FAQS);

const bannerData = {
  imagePosition: "right",
  // The hero image is the page's LCP element: load it eagerly.
  priority: true,
  subheading: {
    enabled: true,
    text: "CONTACT",
  },
  title: {
    line1: "Start reaching",
    line2: "your digital",
    line3: "goals",
  },
  images: {
    banner: {
      url: "/assets/images/contact-banner.svg",
      alt: "",
      width: 871,
      height: 767,
    },
    bannerMobile: {
      url: "/assets/images/hero-mobile.webp",
      alt: "",
    },
  },
};

const SOCIALS = [
  {
    href: "https://www.facebook.com/Webmaffia/",
    src: "/assets/images/icons/fb.webp",
    alt: "Facebook",
  },
  {
    href: "https://in.linkedin.com/company/webmaffia",
    src: "/assets/images/icons/linkedin.webp",
    alt: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/webmaffia/",
    src: "/assets/images/icons/insta.webp",
    alt: "Instagram",
  },
  {
    href: "https://www.youtube.com/@webmaffiadigitalagency",
    src: "/assets/images/icons/youtube.svg",
    alt: "YouTube",
    unoptimized: true,
  },
];

export default function ContactPage() {
  return (
    <main className="wrapper">
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={LOCAL_BUSINESS_SCHEMA} />
      <JsonLd data={CONTACT_PAGE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <div className="ml-setter contact_us">
        <Banner data={bannerData}>
          <p>
            Webmaffia is a creative digital agency with offices in Mumbai and
            Bengaluru (India), Dubai (UAE) and Sheridan, Wyoming (USA). To start a
            project, email your details and requirements to{" "}
            <a href="mailto:hello@webmaffia.com">hello@webmaffia.com</a>, or fill in
            the enquiry form below. The Webmaffia team gets back to you within 2
            business days.
          </p>
          <p>
            You can also call us: <a href="tel:+919867625909">+91 9867625909</a> for
            the Mumbai and Bengaluru offices,{" "}
            <a href="tel:+971562722998">+971 56 272 2998</a> for Dubai, and{" "}
            <a href="tel:+18669849786">+1 (866) 984-9786</a> for the USA. We&apos;re
            excited to work with you soon.
          </p>
        </Banner>

        {UPDATED && (
          <p className="contact_updated">
            Last updated: <time dateTime={UPDATED.iso}>{UPDATED.label}</time>
          </p>
        )}

        <div className="form">
          <KlaviyoFormEmbed />
        </div>

        <section className="contact_block" aria-labelledby="contact-enquire-h">
          <h2 id="contact-enquire-h" className="contact_section_title">
            What you can enquire about
          </h2>
          <ul className="contact_services">
            {CONTACT_SERVICES.map(({ name, scope }) => (
              <li key={name}>
                <strong>{name}</strong> &ndash; {scope}
              </li>
            ))}
          </ul>
          <p className="contact_text">
            Not sure which applies? Describe the problem in the form above or email{" "}
            <a href="mailto:hello@webmaffia.com">hello@webmaffia.com</a> and
            we&apos;ll point you to the right team.
          </p>
        </section>

        <section className="contact_block" aria-labelledby="contact-next-h">
          <h2 id="contact-next-h" className="contact_section_title">
            What happens after you send your enquiry
          </h2>
          <ol className="contact_steps">
            {CONTACT_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="contact_text">
            If your enquiry is time-sensitive, don&apos;t wait for the form: call{" "}
            <a href="tel:+919867625909">+91 9867625909</a> (India),{" "}
            <a href="tel:+971562722998">+971 56 272 2998</a> (Dubai) or{" "}
            <a href="tel:+18669849786">+1 (866) 984-9786</a> (USA).
          </p>
        </section>

        <div className="contact_faq">
          <HomeFaq title="Contacting Webmaffia: common questions" items={CONTACT_FAQS} />
        </div>

        <section
          className="contact_block contact_offices"
          aria-labelledby="contact-offices-h"
        >
          <h2 id="contact-offices-h" className="contact_section_title">
            Webmaffia offices
          </h2>
          <div className="contact_table_wrap">
            <table className="contact_table">
              <caption>Webmaffia office locations, emails and phone numbers</caption>
              <thead>
                <tr>
                  <th scope="col">Office</th>
                  <th scope="col">Address</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {CONTACT_OFFICES.map(({ key, city, address, href, email, phone }) => (
                  <tr key={key}>
                    <th scope="row">{city}</th>
                    <td data-label="Address">
                      <address>
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {address}
                        </a>
                      </address>
                    </td>
                    <td data-label="Email">
                      <a href={`mailto:${email}`}>{email}</a>
                    </td>
                    <td data-label="Phone">
                      <a href={telHref(phone)}>{phone}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {UPDATED && (
            <p className="contact_text contact_verified">
              Office addresses, phone numbers and email addresses on this page were
              last checked on <time dateTime={UPDATED.iso}>{UPDATED.label}</time>.
            </p>
          )}
        </section>

        <section
          className="contact_block contact_about"
          aria-labelledby="contact-about-h"
        >
          <h2 id="contact-about-h" className="contact_section_title">
            About Webmaffia
          </h2>
          <p className="contact_text">
            Webmaffia is a creative digital agency working across web design and
            development, search engine optimization, AI solutions, social media, video,
            digital creative and digital strategy. The agency operates from four
            offices: Mumbai and Bengaluru in India, Dubai in the UAE, and Sheridan,
            Wyoming in the USA. Enquiries for India and the UAE are handled by
            Co-Founder Veera Ghyara Roy (
            <a href="mailto:veera@webmaffia.com">veera@webmaffia.com</a>); general
            enquiries go to <a href="mailto:hello@webmaffia.com">hello@webmaffia.com</a>.
          </p>
        </section>

        <section className="contact_address">
          <div>
            <div className="follow_us">
              <h2 className="h2">Follow Webmaffia</h2>
              <p className="contact_text">
                Webmaffia is on Facebook, LinkedIn, Instagram and YouTube.
              </p>
              <div>
                {SOCIALS.map(({ href, src, alt, unoptimized }) => (
                  <a key={alt} href={href} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={src}
                      alt={alt}
                      width={50}
                      height={50}
                      {...(unoptimized ? { unoptimized: true } : {})}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Image
            src="/assets/images/testimonial_img.webp"
            alt=""
            width={678}
            height={877}
            className="dark_img"
          />
        </section>
      </div>
    </main>
  );
}
