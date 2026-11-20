import Image from "next/image";
import Banner from "@/components/Banner";
import JsonLd from "@/components/JsonLd";
import KlaviyoFormEmbed from "@/components/KlaviyoFormEmbed";
import { getFooter } from "@/lib/strapiPage";
import { buildOfficeBlocks, telHref } from "@/lib/offices";
import {
  buildBreadcrumbSchema,
  ORGANIZATION_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
} from "@/lib/schema";

export const metadata = {
  alternates: {
    canonical: "https://www.webmaffia.com/contact",
  },
};

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

const bannerData = {
  imagePosition: "right",
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

export default async function ContactPage() {
  // Offices (label, address, email, phone) come from Strapi, same as the menu and footer.
  const footer = await getFooter();
  const regions = buildOfficeBlocks(footer?.offices ?? []);

  return (
    <main className="wrapper">
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={LOCAL_BUSINESS_SCHEMA} />
      <div className="ml-setter contact_us">
        <Banner data={bannerData}>
          <p>
            We&apos;re excited to work with you soon! Please drop <br />
            an email with your details & requirements to
            <br />
            <a href="mailto:hello@webmaffia.com">hello@webmaffia.com</a>
          </p>
          <p>
            You can also fill this form & we&apos;ll get back in 2 <br />
            business days.
          </p>
        </Banner>

        <div className="form">
          <KlaviyoFormEmbed />
        </div>

        <section className="contact_address">
          <div>
            <div>
              <div className="h2">Address</div>
              <div className="country_container">
                {regions.map(({ key, label, address, href, email, phone }) => (
                  <div className="country_region" key={key}>
                    <div className="region_text">{label}</div>
                    <address>
                      {address ? (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {address}
                        </a>
                      ) : null}
                    </address>
                    {email || phone ? (
                      <div className="contact_info">
                        {email ? <a href={`mailto:${email}`}>{email}</a> : null}
                        {phone ? <a href={telHref(phone)}>{phone}</a> : null}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="follow_us">
              <div className="h2">Follow us</div>
              <div>
                <a
                  href="https://www.facebook.com/Webmaffia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/icons/fb.webp"
                    alt="Facebook"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://in.linkedin.com/company/webmaffia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/icons/linkedin.webp"
                    alt="LinkedIn"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://www.instagram.com/webmaffia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/icons/insta.webp"
                    alt="Instagram"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://www.youtube.com/@webmaffiadigitalagency"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/icons/youtube.svg"
                    alt="YouTube"
                    width={50}
                    height={50}
                    unoptimized
                  />
                </a>
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
