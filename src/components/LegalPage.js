import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { LEGAL_EMAIL, LEGAL_LINKS, LEGAL_UPDATED } from "@/lib/legal";

export default function LegalPage({ doc }) {
  const name = doc.eyebrow.replace(/\b(\w)(\w*)/g, (_, a, b) => a + b.toLowerCase());
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name, path: doc.path },
  ]);
  const otherLink = LEGAL_LINKS.find(({ href }) => href !== doc.path);

  return (
    <main className="wrapper">
      <JsonLd data={breadcrumb} />
      <div className="ml-setter legal_page">
        <div className="legal_hero">
          <h1 className="h1">{name}</h1>
          <p className="legal_intro">{doc.intro}</p>
          <div className="legal_meta">
            Last updated: {LEGAL_UPDATED} · <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
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
