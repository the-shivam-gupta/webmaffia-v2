import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  ORGANIZATION_SCHEMA,
  SITE_URL,
} from "@/lib/schema";
import { formatUpdatedAt } from "@/lib/dates";
import { LEGAL_EMAIL, LEGAL_LINKS, LEGAL_UPDATED } from "@/lib/legal";

export default function LegalPage({ doc }) {
  const name = doc.eyebrow.replace(/\b(\w)(\w*)/g, (_, a, b) => a + b.toLowerCase());
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name, path: doc.path },
  ]);
  const otherLink = LEGAL_LINKS.find(({ href }) => href !== doc.path);
  const updated = formatUpdatedAt(LEGAL_UPDATED);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: `${SITE_URL}${doc.path}`,
    ...(updated ? { dateModified: updated.iso } : {}),
    publisher: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
  };

  // Each section heading is a question and its text is the answer, exactly as
  // shown on the page.
  const faqItems = doc.sections.map((section) => ({
    question: section.title,
    answer: [...(section.paragraphs ?? []), ...(section.list ?? []), section.after]
      .filter(Boolean)
      .join(" "),
  }));

  return (
    <main className="wrapper">
      <JsonLd data={breadcrumb} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={pageSchema} />
      <JsonLd data={buildFaqSchema(faqItems)} />
      <div className="ml-setter legal_page">
        <div className="legal_hero">
          <h1 className="h1">{name}</h1>
          <p className="legal_intro">{doc.intro}</p>
          <div className="legal_meta">
            Last updated:{" "}
            {updated ? <time dateTime={updated.iso}>{updated.label}</time> : LEGAL_UPDATED}{" "}
            · <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
          </div>
        </div>

        <article className="legal_content">
          {doc.sections.map((section) => (
            <section className="legal_section" id={section.id} key={section.id}>
              <h2 className="h3">{section.title}</h2>
              {section.paragraphs?.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.after ? <p>{section.after}</p> : null}
            </section>
          ))}

          {otherLink ? (
            <p className="legal_related">
              Also read our <Link href={otherLink.href}>{otherLink.label}</Link>.
            </p>
          ) : null}
        </article>
      </div>
    </main>
  );
}
