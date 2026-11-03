import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import ServiceFaqAccordion from "@/components/ServiceFaqAccordion";
import { buildBreadcrumbSchema, buildFaqSchema, SITE_URL } from "@/lib/schema";
import { getStrapiImageUrl } from "@/lib/strapiPage";

const ICONS = {
  design: <><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></>,
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  db: <><ellipse cx="12" cy="5.5" rx="7" ry="2.5" /><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></>,
  shield: <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6L12 3Z" />,
  home: <path d="m3 11 9-7 9 7v9H3zM9 20v-6h6v6" />,
  sell: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 10v10" /></>,
  speed: <path d="M4 18a8 8 0 1 1 16 0M12 18l4-6" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
};

// The CMS has no icon field, so cards pick an icon by position.
const SERVICE_ICONS = ["design", "code", "db"];
const WHY_ICONS = ["home", "sell", "speed", "user"];

function Icon({ name }) {
  return (
    <svg
      className="re_icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function Check() {
  return (
    <svg
      className="re_tick"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

const pad = (n) => String(n + 1).padStart(2, "0");
const clean = (value) => String(value ?? "").trim();

function Label({ children }) {
  return <div className="re_label">{children}</div>;
}

function cmsImage(asset, fallbackWidth, fallbackHeight) {
  if (!asset?.url) return null;
  return {
    src: getStrapiImageUrl(asset),
    alt: asset.alternativeText || "",
    width: asset.width || fallbackWidth,
    height: asset.height || fallbackHeight,
  };
}

export default function IndustryDetailPage({ industry }) {
  const { banner, sections = [] } = industry;
  const pagePath = `/industry/${industry.slug}`;
  const find = (name) => sections.find((s) => s.__component === `services.${name}`);
  const findAll = (name) => sections.filter((s) => s.__component === `services.${name}`);

  const stats = find("statistics-bar")?.statisticsBar ?? [];
  const approach = find("approach");
  const problems = find("problems-we-solve");
  // Two "our-services" blocks exist: first is the services grid, second is "Why Webmaffia".
  const [servicesSection, whySection] = findAll("our-services");
  const types = find("types-and-features");
  const process = find("process");
  const receive = find("what-you-receive");
  const band = find("band");
  const results = find("results");
  const faq = find("fa-qs");

  const heroImage = cmsImage(banner?.desktopImage, 1672, 941);
  const approachImage = cmsImage(approach?.image, 1408, 768);
  const secondaryCta = banner?.secondaryButton;

  const faqItems = (faq?.faqsList ?? []).map((item, index) => ({
    id: `re-faq-${index}`,
    question: item.question,
    answer: `<p>${clean(item.description)}</p>`,
  }));

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: industry.title, path: pagePath },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: industry.title,
    serviceType: banner?.tagLine || industry.title,
    provider: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
    url: `${SITE_URL}${pagePath}`,
    description: clean(industry.seo?.metaDescription || banner?.description),
  };

  return (
    <main className="wrapper">
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={serviceSchema} />
      {faqItems.length > 0 && <JsonLd data={buildFaqSchema(faqItems)} />}

      <div className="ml-setter service_detail">
        <div className="re_page">
          {banner && (
            <section className="re_hero" aria-labelledby="re-h1">
              <div className="re_hero_copy">
                {banner.tagLine && <Label>{banner.tagLine}</Label>}
                <h1 id="re-h1">{banner.heading}</h1>
                {banner.description && <p>{banner.description}</p>}
                <div className="re_btns">
                  {banner.button && (
                    <Link href={banner.href || "#"} className="re_btn re_btn_dark">
                      {banner.button} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  {secondaryCta?.title && (
                    <Link href={secondaryCta.href || "#"} className="re_btn re_btn_line">
                      {secondaryCta.title}
                    </Link>
                  )}
                </div>
              </div>
              {heroImage && (
                <figure className="re_hero_img">
                  <Image
                    {...heroImage}
                    alt={heroImage.alt || banner.heading || ""}
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </figure>
              )}
            </section>
          )}

          {stats.length > 0 && (
            <div className="re_stats" role="list">
              {stats.map((item) => (
                <div className="re_stat" role="listitem" key={item.id}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}

          {approach && (
            <section className="re_approach" aria-labelledby="approach-h">
              {approachImage && (
                <Image
                  {...approachImage}
                  alt={approachImage.alt || approach.title || ""}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              )}
              <div>
                <Label>{approach.tagline}</Label>
                <h2 id="approach-h">{approach.title}</h2>
                <p>{clean(approach.description)}</p>
              </div>
            </section>
          )}

          {problems && (
            <section className="re_block" aria-labelledby="problems-h">
              <Label>{problems.tagline}</Label>
              <h2 id="problems-h">{problems.title}</h2>
              <ul className="re_rows">
                {(problems.cards ?? []).map((item, i) => (
                  <li key={item.id}>
                    <span className="re_n">{pad(i)}</span>
                    <h3>{item.title}</h3>
                    <p>{clean(item.subtitle)}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {servicesSection && (
            <section className="re_block" aria-labelledby="services-h">
              <Label>{servicesSection.tagline}</Label>
              <h2 id="services-h">{servicesSection.title}</h2>
              <div className="re_cols re_cols3">
                {(servicesSection.card ?? []).map((item, i) => (
                  <article key={item.id}>
                    <Icon name={SERVICE_ICONS[i % SERVICE_ICONS.length]} />
                    <h3>{item.title}</h3>
                    <p>{clean(item.subtitle)}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {types && (
            <section className="re_block" aria-labelledby="types-h">
              <Label>{types.tagline}</Label>
              <h2 id="types-h">{types.title}</h2>
              <div className="re_table_wrap">
                <table className="re_table">
                  <thead>
                    <tr>
                      {(types.columns ?? []).map((col) => (
                        <th scope="col" key={col.id}>
                          {col.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(types.features ?? []).map((row) => (
                      <tr key={row.id}>
                        <th scope="row">{row.name}</th>
                        {(types.columns ?? []).slice(1).map((col, i) => (
                          <td key={col.id} data-label={col.name}>
                            {row.availability?.[i] ? (
                              <>
                                <Check />
                                <span className="re_sr">Included</span>
                              </>
                            ) : (
                              <>
                                <span aria-hidden="true">—</span>
                                <span className="re_sr">Not included</span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {process && (
            <section className="re_block" aria-labelledby="process-h">
              <Label>{process.tagline}</Label>
              <h2 id="process-h">{process.title}</h2>
              <ol className="re_steps">
                {(process.card ?? []).map((item, i) => (
                  <li key={item.id}>
                    <span className="re_step_n">{pad(i)}</span>
                    <h3>{item.title}</h3>
                    <p>{clean(item.subtitle)}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {receive && (
            <section className="re_block" aria-labelledby="receive-h">
              <Label>{receive.tagline}</Label>
              <h2 id="receive-h">{receive.title}</h2>
              <ul className="re_checks">
                {(receive.lists ?? []).map((item) => (
                  <li key={item.id}>
                    <Check />
                    {item.label}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {band && (
            <section className="re_security" aria-labelledby="security-h">
              <Icon name="shield" />
              <div>
                <Label>{band.tagline}</Label>
                <h2 id="security-h">{band.title}</h2>
                <p>{clean(band.subtitle)}</p>
              </div>
              <ul className="re_checks re_checks_1">
                {(band.featuresList ?? []).map((item) => (
                  <li key={item.id}>
                    <Check />
                    {item.label}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {whySection && (
            <section className="re_block" aria-labelledby="why-h">
              <Label>{whySection.tagline}</Label>
              <h2 id="why-h">{whySection.title}</h2>
              <div className="re_cols re_cols4">
                {(whySection.card ?? []).map((item, i) => (
                  <article key={item.id}>
                    <Icon name={WHY_ICONS[i % WHY_ICONS.length]} />
                    <h3>{item.title}</h3>
                    <p>{clean(item.subtitle)}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {results && (
            <section className="re_block" aria-labelledby="results-h">
              <Label>{results.tagline}</Label>
              <h2 id="results-h">{results.title}</h2>
              <div className="re_cols re_cols4 re_results">
                {(results.results ?? []).map((item) => (
                  <div key={item.id}>
                    <b>{item.heading}</b>
                    <span>{item.paragraph}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {faq && faqItems.length > 0 && (
            <section id="faq" className="re_block">
              <Label>{faq.tagline}</Label>
              <ServiceFaqAccordion heading={faq.title} items={faqItems} />
            </section>
          )}

        </div>
      </div>
    </main>
  );
}
