import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import HomeFaq from "@/components/HomeFaq";
import { INDUSTRY_LINKS } from "@/lib/industries";
import { buildBreadcrumbSchema, buildFaqSchema, SITE_URL } from "@/lib/schema";

// Same section markup and classes as IndustryDetailPage (the CMS version), so
// the design is identical; only the content source differs. Icons are static.
const ICONS = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  seo: <><circle cx="10.5" cy="10.5" r="7" /><path d="m21 21-5.5-5.5M7.5 12.5v-2M10.5 12.5v-4M13.5 12.5v-3" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  social: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  doc: <path d="M5 3h10l4 4v14H5zM14 3v5h5M8 13h8M8 17h6" />,
  app: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
  mega: <path d="M3 10v4l11 5V5zM18 9a4 4 0 0 1 0 6M6 14l1.5 6" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21a7 7 0 0 1 14 0M17 5a3.5 3.5 0 0 1 0 7M19 21a6 6 0 0 0-3-5" /></>,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  chart: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
  shield: <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6L12 3Z" />,
};

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

function Label({ children }) {
  return <div className="re_label">{children}</div>;
}

export default function StaticIndustryPage({ page }) {
  const path = `/${page.slug}`;
  // All industries are listed, including the current one.
  const otherIndustries = INDUSTRY_LINKS;
  const url = `${SITE_URL}${path}`;

  const faqItems = page.faq.items.map((item, index) => ({
    id: `${page.slug}-faq-${index}`,
    question: item.question,
    answer: item.answer,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#org`,
        name: "Webmaffia",
        legalName: "Pixtop Media Solutions Pvt Ltd",
        url: `${SITE_URL}/`,
        telephone: "+91 9867625909",
        email: "veera@webmaffia.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "403 A Wing, Cello Triumph, IB Patel Rd, Goregaon (East)",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400063",
          addressCountry: "IN",
        },
        sameAs: [
          "https://in.linkedin.com/company/webmaffia",
          "https://www.instagram.com/webmaffia/",
          "https://www.facebook.com/Webmaffia/",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.seo.title,
        description: page.seo.description,
        inLanguage: "en-IN",
        dateModified: page.updated,
        about: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.schema.serviceName,
        serviceType: page.schema.serviceType,
        description: page.schema.serviceDescription,
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: page.schema.areaServed,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: page.schema.catalogName,
          itemListElement: page.services.items.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.text,
              url: `${SITE_URL}${item.href}`,
            },
          })),
        },
      },
    ],
  };

  return (
    <main className="wrapper">
      <JsonLd data={schema} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.name, path },
        ])}
      />
      <JsonLd data={buildFaqSchema(faqItems)} />

      <div className="ml-setter service_detail">
        <div className="re_page">
          {/* Hero */}
          <section className="re_hero" aria-labelledby="re-h1">
            <div className="re_hero_copy">
              <nav className="re_crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link> / {page.name}
              </nav>
              <Label>{page.hero.label}</Label>
              <h1 id="re-h1">{page.hero.title}</h1>
              <p>
                {page.hero.leadStrong} {page.hero.lead}
              </p>
              <div className="re_btns">
                <Link href={page.hero.primary.href} className="re_btn re_btn_dark">
                  {page.hero.primary.text} <span aria-hidden="true">→</span>
                </Link>
                <Link href={page.hero.secondary.href} className="re_btn re_btn_line">
                  {page.hero.secondary.text}
                </Link>
              </div>
            </div>
            <figure className="re_hero_img">
              <Image
                src={page.hero.image.src}
                alt={page.hero.image.alt}
                width={page.hero.image.width}
                height={page.hero.image.height}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </figure>
          </section>

          {/* Stats */}
          <div className="re_stats" role="list">
            {page.stats.map((item) => (
              <div className="re_stat" role="listitem" key={item.label}>
                <b>{item.value}</b>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Approach */}
          <section className="re_approach" aria-labelledby="approach-h">
            <Image
              src={page.approach.image.src}
              alt={page.approach.image.alt}
              width={page.approach.image.width}
              height={page.approach.image.height}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div>
              <Label>{page.approach.label}</Label>
              <h2 id="approach-h">{page.approach.title}</h2>
              {page.approach.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </section>

          {/* Problems */}
          <section className="re_block" aria-labelledby="problems-h">
            <Label>{page.problems.label}</Label>
            <h2 id="problems-h">{page.problems.title}</h2>
            <ul className="re_rows">
              {page.problems.items.map((item, i) => (
                <li key={item.title}>
                  <span className="re_n">{pad(i)}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Services */}
          <section className="re_block" aria-labelledby="services-h">
            <Label>{page.services.label}</Label>
            <h2 id="services-h">{page.services.title}</h2>
            <div className="re_cols re_cols4">
              {page.services.items.map((item) => (
                <article key={item.title}>
                  <Icon name={item.icon} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Types & features */}
          <section className="re_block" aria-labelledby="types-h">
            <Label>{page.types.label}</Label>
            <h2 id="types-h">{page.types.title}</h2>
            <div className="re_table_wrap">
              <table className="re_table">
                <thead>
                  <tr>
                    {page.types.columns.map((col) => (
                      <th scope="col" key={col}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.types.rows.map((row) => (
                    <tr key={row.name}>
                      <th scope="row">{row.name}</th>
                      {row.has.map((included, i) => (
                        <td key={page.types.columns[i + 1]} data-label={page.types.columns[i + 1]}>
                          {included ? (
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

          {/* Process */}
          <section className="re_block" aria-labelledby="process-h">
            <Label>{page.process.label}</Label>
            <h2 id="process-h">{page.process.title}</h2>
            <ol className="re_steps">
              {page.process.steps.map((item, i) => (
                <li key={item.title}>
                  <span className="re_step_n">{pad(i)}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* What you receive */}
          <section className="re_block" aria-labelledby="receive-h">
            <Label>{page.receive.label}</Label>
            <h2 id="receive-h">{page.receive.title}</h2>
            <ul className="re_checks">
              {page.receive.items.map((text) => (
                <li key={text}>
                  <Check />
                  {text}
                </li>
              ))}
            </ul>
          </section>

          {/* Security band */}
          <section className="re_security" aria-labelledby="security-h">
            <Icon name="shield" />
            <div>
              <Label>{page.band.label}</Label>
              <h2 id="security-h">{page.band.title}</h2>
              <p>{page.band.text}</p>
            </div>
            <ul className="re_checks re_checks_1">
              {page.band.points.map((text) => (
                <li key={text}>
                  <Check />
                  {text}
                </li>
              ))}
            </ul>
          </section>

          {/* Why */}
          <section className="re_block" aria-labelledby="why-h">
            <Label>{page.why.label}</Label>
            <h2 id="why-h">{page.why.title}</h2>
            <div className="re_cols re_cols4">
              {page.why.items.map((item) => (
                <article key={item.title}>
                  <Icon name={item.icon} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Results */}
          <section className="re_block" aria-labelledby="results-h">
            <Label>{page.results.label}</Label>
            <h2 id="results-h">{page.results.title}</h2>
            <div className="re_cols re_cols4 re_results">
              {page.results.items.map((item) => (
                <div key={item.label}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ (homepage accordion style) */}
          <div id="faq" className="re_faq">
            <HomeFaq
              tagline={page.faq.label}
              title={page.faq.title}
              items={faqItems}
            />
          </div>

          {/* Explore other industries (same look as "Our Other Services") */}
          {otherIndustries.length > 0 ? (
            <section className="re_others" aria-labelledby="others-h">
              <div className="other_services_row">
                <div className="other_services_row_head">
                  <h2 id="others-h" className="other_services_row_title">
                    Explore other industries
                  </h2>
                </div>
                <div className="other_services_row_list">
                  {otherIndustries.map((item, index) => (
                    <Link
                      href={`/${item.slug}`}
                      className="other_services_row_item"
                      key={item.slug}
                      aria-current={item.slug === page.slug ? "page" : undefined}
                    >
                      <span className="other_services_row_num">{pad(index)}</span>
                      <span className="other_services_row_name">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
}
