import Link from "next/link";
import Banner from "@/components/Banner";
import JsonLd from "@/components/JsonLd";
import ServiceFaqAccordion from "@/components/ServiceFaqAccordion";
import { buildBreadcrumbSchema, buildFaqSchema, SITE_URL } from "@/lib/schema";

const PAGE_PATH = "/services/real-estate-website-design-development";

const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Real estate website design", path: PAGE_PATH },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Real estate website design and development",
  serviceType:
    "Website design and development for real estate developers, builders and brokers",
  provider: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
  areaServed: ["India", "United Arab Emirates"],
  url: `${SITE_URL}${PAGE_PATH}`,
  description:
    "Real estate websites with project pages, property search, lead capture and CRM integration.",
};

// Same hero/banner component and artwork the other service pages use.
const BANNER_DATA = {
  imagePosition: "right",
  priority: true,
  cta: { text: "Discuss your real estate website", href: "#contact" },
  subheading: {
    enabled: true,
    text: "Services",
    link: "/services",
    current: "Real estate website design",
  },
  title: {
    line1: "Real estate websites that drive site visits",
  },
  images: {
    banner: {
      url: "/assets/images/design-and-development.svg",
      alt: "",
      width: 871,
      height: 767,
    },
    bannerMobile: { url: "/assets/images/hero-mobile.webp", alt: "" },
  },
};

const HERO_COPY = [
  "Webmaffia designs and builds real estate websites for developers, builders and brokers in India: project pages that answer buyer questions, property search that works on a phone, and enquiry forms that reach your sales team without delay.",
];

const FACTS = [
  { value: "8", label: "digital services under one roof" },
  { value: "3", label: "offices: Mumbai, Bengaluru, Dubai" },
  { value: "ISO 27001", label: "2022 certified for information security" },
];

const TAKEAWAYS = [
  { title: "Project pages", text: "price range, plans, location, status and RERA details." },
  { title: "Search", text: "filters and maps for buyers comparing options." },
  { title: "Fast follow-up", text: "enquiries routed to your team or CRM." },
  { title: "Measured", text: "enquiries and site visits tracked against a baseline." },
];

const PROBLEMS = [
  { title: "Leads you do not own", text: "Enquiries come from portals and aggregators, and your own site adds little. A strong site gives buyers a reason to come to you directly." },
  { title: "Slow on mobile", text: "Heavy galleries and videos load slowly on phones, where most buyers browse. Visitors leave before they see the project." },
  { title: "Pages that skip buyer questions", text: "Buyers look for price range, configuration, possession status, location and RERA details. If they cannot find them, they move on." },
  { title: "Leads that go cold", text: "Enquiries land in an inbox with no routing or reminder. Faster handoff to sales means fewer lost conversations." },
  { title: "One microsite per launch", text: "Each launch gets a separate site with copied content. Search visibility and brand trust get split across many thin sites." },
];

const BUILDS = [
  { title: "Developer and builder websites", text: "A company website that shows your track record, projects and credibility, and sends visitors to the right project page." },
  { title: "Project and microsite pages", text: "A page per launch with highlights, configurations, floor plans, amenities, location, status and an enquiry form. Built so they also support the main site." },
  { title: "Property listing and search", text: "Listings with filters for location, budget and configuration, plus map views and shortlisting, where your inventory calls for it." },
  { title: "Lead capture and CRM integration", text: "Forms, callback and site-visit booking that pass enquiries to your CRM or sales team, with source tracking so you know what works." },
  { title: "Brochures, plans and media", text: "Image galleries, floor plans, brochure downloads and video that stay quick to load on mobile." },
  { title: "SEO and analytics foundation", text: "Clean structure, fast pages, schema and analytics set up from launch, so project pages can be found and measured." },
];

const SITE_TYPES = [
  { type: "Developer website", best: "Builders with several projects", features: "Company story, project directory, news, enquiry forms", goal: "Brand trust and direct enquiries" },
  { type: "Project microsite", best: "A single launch", features: "Plans, pricing range, location, RERA details, site-visit booking", goal: "Enquiries for one project" },
  { type: "Listing site", best: "Brokers and consultants with inventory", features: "Search filters, maps, shortlist, agent contact", goal: "Matching buyers to properties" },
  { type: "PropTech platform", best: "Rental, resale or marketplace ideas", features: "Accounts, listings, workflows, integrations", goal: "A working product" },
];

const STEPS = [
  { title: "Discovery", text: "We learn your projects, buyers, sales process and what the website must achieve." },
  { title: "Audit and research", text: "We review your current site, competitors and how buyers search for your projects." },
  { title: "Structure and wireframes", text: "We plan page structure, search and enquiry paths before any visual design." },
  { title: "Design", text: "We design the pages and show you how they look on mobile and desktop." },
  { title: "Build and test", text: "We build, connect forms and CRM, and test across devices, browsers and speed." },
  { title: "Launch and improve", text: "We launch, track enquiries against your baseline and refine with you." },
];

const NEEDS = [
  { title: "Project details", text: "pricing ranges, configurations, status and RERA information." },
  { title: "Assets", text: "floor plans, brochures, images and videos." },
  { title: "Systems", text: "your CRM, sales tools and current website access." },
  { title: "A decision-maker", text: "one contact who can approve content and design." },
];

const COMPLIANCE = [
  { title: "RERA details", text: "We place RERA registration information on project pages in the format your compliance or legal team approves." },
  { title: "Buyer data", text: "Forms collect only what you need. Handle personal data in line with applicable law, including India’s Digital Personal Data Protection Act, 2023, and review requirements with your legal advisers." },
  { title: "Certified company", text: "Pixtop Media Solutions Pvt Ltd, the company behind Webmaffia, is ISO/IEC 27001:2022 certified for information security management." },
];

const WHY = [
  { title: "Website, search and content together", text: "The same team can plan the website, SEO, content and social around your launches." },
  { title: "Real estate project experience", text: "We have built a website for HoABL, a real estate brand. Read the case study for the scope." },
  { title: "A practical approach", text: "We recommend the simplest site that does the job, and say so when a heavier build is not needed." },
  { title: "India and the UAE", text: "Offices in Mumbai, Bengaluru and Dubai." },
];

const MEASURES = [
  { value: "Deliverables", label: "The pages, search and forms we build." },
  { value: "Results", label: "Enquiries, callbacks and site-visit bookings." },
  { value: "Outcomes", label: "Lead quality and sales follow-through." },
];

const FAQS = [
  { question: "What does a real estate website need to do?", answer: "A real estate website needs to help a buyer find the right project, trust the developer and take a next step such as booking a site visit or requesting a callback. Everything else, from design to search filters, supports that path." },
  { question: "What is the difference between a developer website and a project microsite?", answer: "A developer website presents the company, its track record and all its projects. A project microsite focuses on one launch, with its own pricing, floor plans, location and enquiry form. Many developers use both, linked together so project pages also build the main brand’s search visibility." },
  { question: "Can you build a property listing and search feature?", answer: "Yes. We can build listing pages with filters such as location, budget, configuration and status, along with map views and shortlisting. The right scope depends on how many properties you list and how often they change, which we confirm during discovery." },
  { question: "Can the website connect to our CRM?", answer: "Often, yes. Enquiries can be passed to your CRM or sales tool so no lead sits in an inbox. This depends on the integration options your CRM offers, and we check it during discovery." },
  { question: "How do you handle RERA details on the website?", answer: "We place RERA registration information on project pages in the format your compliance or legal team approves. Rules differ by state and project, so we work from the details you provide rather than assume them." },
  { question: "How long does a real estate website take to build?", answer: "It depends on scope. A single-project microsite is quicker than a multi-project developer website with listings and CRM integration. We give a realistic timeline after discovery." },
  { question: "How much does a real estate website cost?", answer: "Cost depends on the number of projects and pages, whether you need listing search, the integrations, and the media involved. We provide a scoped estimate after a conversation about your requirements." },
  { question: "Can you redesign our current website without losing search visibility?", answer: "Yes. We review your existing pages and URLs first, plan redirects where addresses change, and keep pages that already attract visitors. Results still depend on your market and content." },
  { question: "Will we own the website and its content?", answer: "Ownership and access terms are agreed in writing before the project starts, so you know what you receive at handover." },
].map((item, index) => ({
  id: `re-faq-${index}`,
  question: item.question,
  answer: `<p>${item.answer}</p>`,
}));

const RELATED = [
  { href: "/services/website-design-development-services", label: "Website design and development" },
  { href: "/services/search-engine-optimization-services", label: "SEO" },
  { href: "/services/content-marketing-strategy", label: "Content marketing" },
  { href: "/services/digital-strategy", label: "Digital strategy" },
];

const pad = (n) => String(n + 1).padStart(2, "0");

function Label({ children }) {
  return <div className="re_label">{children}</div>;
}

// Heading on the left, content on the right; the heading stays pinned on
// desktop while the content scrolls.
function Split({ id, label, title, sub, children, className = "" }) {
  return (
    <section
      id={id}
      className={`re_split ${className}`.trim()}
      aria-labelledby={`${id}-h`}
    >
      <header className="re_split_head">
        <Label>{label}</Label>
        <h2 id={`${id}-h`}>{title}</h2>
        {sub ? <p className="re_sub">{sub}</p> : null}
      </header>
      <div className="re_split_body">{children}</div>
    </section>
  );
}

function NamedList({ items, numbered = false }) {
  return (
    <ul className="re_named">
      {items.map((item, i) => (
        <li key={item.title}>
          {numbered ? <span className="re_n">{pad(i)}</span> : null}
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function RealEstateDetailPage() {
  return (
    <main className="wrapper">
      <JsonLd data={buildBreadcrumbSchema(BREADCRUMBS)} />
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={buildFaqSchema(FAQS)} />

      <div className="ml-setter service_detail">
        <Banner data={BANNER_DATA}>
          {HERO_COPY.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </Banner>

        <div className="re_page">
          {/* Facts */}
          <div className="re_facts" role="list">
            {FACTS.map((item) => (
              <div className="re_fact" role="listitem" key={item.value}>
                <b>{item.value}</b>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* About */}
          <Split
            id="about"
            label="The brief"
            title="What a real estate website has to do"
          >
            <p className="re_lead">
              A real estate website has to help a buyer find the right
              project, trust the developer and take a next step, such as
              booking a site visit or requesting a callback. Good design
              supports that path. Bad design interrupts it.
            </p>
            <p>
              We build for developers and builders, brokers and channel
              partners, property consultants and PropTech teams. Each has a
              different job for the website, so we start there, not with a
              template.
            </p>
            <p>
              Buyers compare several projects on their phones before they call
              anyone. Your site has to load fast, show the facts they look for
              and make the next step obvious.
            </p>
            <dl className="re_defs">
              {TAKEAWAYS.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </Split>

          {/* Problems */}
          <Split
            id="problems"
            label="Where enquiries leak"
            title="Problems we see on real estate websites"
            sub="Most of them cost enquiries quietly."
          >
            <NamedList items={PROBLEMS} numbered />
          </Split>

          {/* What we build */}
          <section id="build" className="re_block" aria-labelledby="build-h">
            <Label>Scope</Label>
            <h2 id="build-h">What Webmaffia builds</h2>
            <p className="re_sub">
              The parts of a real estate website, scoped to what you need.
            </p>
            <div className="re_tiles">
              {BUILDS.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Which type fits */}
          <section id="fit" className="re_block" aria-labelledby="fit-h">
            <Label>Choose a format</Label>
            <h2 id="fit-h">Which type of site fits you?</h2>
            <div className="re_table_wrap">
              <table className="re_table">
                <thead>
                  <tr>
                    <th scope="col">Site type</th>
                    <th scope="col">Best for</th>
                    <th scope="col">Typical features</th>
                    <th scope="col">Main goal</th>
                  </tr>
                </thead>
                <tbody>
                  {SITE_TYPES.map((row) => (
                    <tr key={row.type}>
                      <th scope="row">{row.type}</th>
                      <td data-label="Best for">{row.best}</td>
                      <td data-label="Typical features">{row.features}</td>
                      <td data-label="Main goal">{row.goal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="#contact" className="re_link">
              Not sure which you need? Tell us your projects
            </Link>
          </section>

          {/* Process */}
          <section id="process" className="re_block" aria-labelledby="process-h">
            <Label>Process</Label>
            <h2 id="process-h">How a project typically works</h2>
            <p className="re_sub">
              Every project is different. We confirm a timeline once discovery
              is done.
            </p>
            <ol className="re_steps">
              {STEPS.map((item, i) => (
                <li key={item.title}>
                  <span className="re_step_n">{pad(i)}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
            <h3 className="re_subhead">What we need from you</h3>
            <dl className="re_defs re_defs_row">
              {NEEDS.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Compliance */}
          <Split
            id="compliance"
            label="Trust"
            title="Compliance, data and security"
            sub="Real estate marketing is regulated and buyer data is sensitive."
          >
            <NamedList items={COMPLIANCE} />
          </Split>

          {/* Why */}
          <Split id="why" label="Why us" title="Why work with Webmaffia">
            <NamedList items={WHY} />
            <p className="re_links">
              <Link href="/case-study/hoabl">HoABL case study</Link>
              <Link href="/case-study">All work</Link>
            </p>
          </Split>

          {/* Measure */}
          <section id="measure" className="re_block" aria-labelledby="measure-h">
            <Label>Measurement</Label>
            <h2 id="measure-h">How we measure it</h2>
            <div className="re_measures">
              {MEASURES.map((item) => (
                <div key={item.value}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="re_sub">
              Before launch we record how your current site performs. After
              launch we compare against that baseline. Results depend on your
              market, pricing and sales process, so we do not promise specific
              figures.
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" className="re_block re_faq" aria-labelledby="faq-h">
            <Label>FAQ</Label>
            <h2 id="faq-h">Quick answers</h2>
            <ServiceFaqAccordion items={FAQS} />
          </section>

          {/* Related */}
          <nav className="re_related" aria-label="Related services">
            <span>Related services</span>
            {RELATED.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Final CTA */}
          <section id="contact" className="re_final" aria-labelledby="contact-h">
            <Label>Start here</Label>
            <h2 id="contact-h">Tell us about your next launch</h2>
            <p className="re_sub">
              Share your projects, your current website, the CRM you use and
              what a good result looks like. We will recommend where to start.
            </p>
            <div className="re_final_links">
              <a href="mailto:veera@webmaffia.com">veera@webmaffia.com</a>
              <a href="tel:+919867625909">+91 9867625909</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
