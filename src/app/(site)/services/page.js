import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import JsonLd from "@/components/JsonLd";
import ServiceTagSwiper from "@/components/ServiceTagSwiper";
import TeamFaq from "@/components/TeamFaq";
import { formatUpdatedAt } from "@/lib/dates";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  ORGANIZATION_SCHEMA,
  SITE_URL,
} from "@/lib/schema";
import { CONTACT_OFFICES } from "@/lib/contactPage";
import { buildBannerCta, getServicesPage, getStrapiImageUrl } from "@/lib/strapiPage";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

// Static page copy: bump SERVICES_UPDATED whenever the content below changes.
const SERVICES_UPDATED = formatUpdatedAt("2026-11-26");

const SERVICES_INTRO =
  "Webmaffia is a digital marketing agency in Mumbai. We work across six service areas: digital strategy and brand positioning, web design and development (including hosting), SEO, AI-powered solutions, social media, and content marketing.";

const SERVICES_GLANCE = [
  ["Digital Strategy", "Brand positioning, competitive analysis, campaign strategy and consulting"],
  ["Design & Development", "Web design, web development, hosting"],
  ["SEO", "On-page SEO, backlinks, traffic and lead generation"],
  ["AI-Powered Solutions", "AI consulting, chatbots, generative AI solutions, automation, AI agents"],
  ["Social Media", "Audience targeting, engagement, hashtag strategy"],
  ["Content Marketing", "Blogs, ad copy, editorial pieces and other original content"],
];

const SERVICES_FAQS = [
  {
    question: "What services does Webmaffia offer?",
    answer:
      "Webmaffia is a digital marketing agency in Mumbai working across six areas: digital strategy, web design and development, SEO, AI-powered solutions, social media, and content marketing.",
  },
  {
    question: "Does Webmaffia handle brand positioning and competitive analysis?",
    answer:
      "Yes. Brand positioning and competitive analysis sit inside Webmaffia's digital strategy practice. Webmaffia draws its strategy talent from agencies specializing in digital strategy and from consulting firms, because a digital marketing strategy goes beyond the traditional approach to campaign planning.",
  },
  {
    question: "Does Webmaffia build websites, and does it host them?",
    answer:
      "Yes. Webmaffia's design and development team covers both, and hosting is offered alongside build. Webmaffia blurs the lines between design and development to create work that inspires delight.",
  },
  {
    question: "What does Webmaffia's SEO work cover?",
    answer:
      "On-page SEO and backlinks. Search is the point of discovery for almost all consumers, so whether the objective is brand awareness, website traffic, lead generation or conversion, SEO has a part to play in reaching it.",
  },
  {
    question: "Does Webmaffia build AI chatbots and automation?",
    answer:
      "Yes. Webmaffia's AI-Powered Solutions covers AI consulting, chatbots, generative AI solutions, automation and AI agents. Webmaffia uses AI to automate repetitive work, sharpen how customers experience your brand, and upgrade marketing and operations.",
  },
  {
    question: "What does Webmaffia's social media work include?",
    answer:
      "Audience targeting, engagement and hashtag strategy. Social media lets a brand zero in on the right audience and customize the message to appeal to them.",
  },
  {
    question: "Who writes the blogs and ad copy?",
    answer:
      "Webmaffia's in-house writers. They produce ad copy, editorial pieces and other original content that prioritizes impact, clarity and empathy over loudness, with customer intent behind every line.",
  },
].map((faq, index) => ({ id: `services-faq-${index}`, ...faq }));

const SERVICES_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Webmaffia digital marketing services",
  url: `${SITE_URL}/services`,
  ...(SERVICES_UPDATED ? { dateModified: SERVICES_UPDATED.iso } : {}),
  publisher: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
};

const MUMBAI_OFFICE = CONTACT_OFFICES.find((office) => office.key === "mumbai");

const FALLBACK_BANNER_DATA = {
  imagePosition: "right",
  subheading: {
    enabled: true,
    text: "OUR SERVICES",
  },
  title: {
    line1: "Creating a",
    line2: "platform for your",
    line3: "purpose",
  },
  descriptions: [
    SERVICES_INTRO,
    "Transforming visions into captivating digital landscapes, Webmaffia crafts tailored solutions that elevate brands and engage audiences. With a focus on innovation and precision, we bring your online presence to life, delivering seamless user experiences that resonate and inspire.",
  ],
};

function splitTitleLines(text, maxLines = 3) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return { line1: "" };

  const totalLen = words.reduce((sum, word, i) => sum + word.length + (i ? 1 : 0), 0);
  const targetPerLine = totalLen / Math.min(maxLines, words.length);

  const lines = [];
  let current = [];
  let currentLen = 0;

  for (const word of words) {
    const wordLen = word.length + (current.length ? 1 : 0);
    if (
      current.length &&
      currentLen + wordLen > targetPerLine &&
      lines.length < maxLines - 1
    ) {
      lines.push(current.join(" "));
      current = [];
      currentLen = 0;
    }
    currentLen += wordLen;
    current.push(word);
  }
  if (current.length) lines.push(current.join(" "));

  return {
    line1: lines[0] || "",
    ...(lines[1] ? { line2: lines[1] } : {}),
    ...(lines[2] ? { line3: lines[2] } : {}),
  };
}

function buildServicesBannerData(rawBanner) {
  if (!rawBanner) return FALLBACK_BANNER_DATA;

  let images;
  if (rawBanner.desktopImage?.url) {
    images = {
      banner: {
        url: getStrapiImageUrl(rawBanner.desktopImage),
        alt: rawBanner.desktopImage.alternativeText || "Webmaffia services",
        width: rawBanner.desktopImage.width || 871,
        height: rawBanner.desktopImage.height || 767,
      },
    };
    if (rawBanner.mobileImage?.url) {
      images.bannerMobile = {
        url: getStrapiImageUrl(rawBanner.mobileImage),
        alt: rawBanner.mobileImage.alternativeText || "Webmaffia services",
      };
    }
  }

  return {
    imagePosition: rawBanner.imagePosition || "right",
    overlay: rawBanner.overlay ?? undefined,
    overlayColor: rawBanner.overlayColor ?? undefined,
    subheading: rawBanner.heading
      ? { enabled: true, text: rawBanner.heading }
      : undefined,
    title: splitTitleLines(rawBanner.subHeading),
    descriptions: [
      SERVICES_INTRO,
      // The CMS text carries hard line breaks from the old layout: flow it as one paragraph.
      rawBanner.description?.replace(/\s*\n\s*/g, " ").trim(),
    ].filter(Boolean),
    cta: buildBannerCta(rawBanner),
    ...(images ? { images } : {}),
  };
}

const SERVICE_SECTIONS = [
  {
    imageFirst: true,
    title: (
      <>
        Digital <br />
        Strategy
      </>
    ),
    question: "What does a digital strategy include?",
    img: { src: "/assets/images/number/1.webp", alt: "Digital Strategy" },
    slides: ["Brand Positioning", "Competitive", "Brand Positioning", "Competitive"],
    body: (
      <>
        At Webmaffia, we understand that a digital marketing strategy goes beyond the
        traditional approach towards strategizing a campaign. This is why Webmaffia
        draws its strategy talent from agencies specializing in digital strategy and
        from consulting firms.
      </>
    ),
    href: "/services/digital-strategy",
  },
  {
    imageFirst: false,
    title: (
      <>
        Design & <br />
        Development
      </>
    ),
    question: "What does Webmaffia build and host?",
    img: { src: "/assets/images/number/2.webp", alt: "Design and Development" },
    slides: ["Development", "Hosting"],
    body: (
      <>
        We blur the lines between Design and development <br />
        to create work that inspires delight. Our web design <br />
        and development section specializes in crafting innovative <br />
        digital experiences tailored to elevate brands and <br />
        captivate audiences.
      </>
    ),
    href: "/services/website-design-development-services",
  },
  {
    imageFirst: true,
    title: <>SEO</>,
    question: "Why does your brand need an SEO strategy?",
    img: { src: "/assets/images/number/3.webp", alt: "SEO" },
    slides: ["Backlinks", "On-Page"],
    body: (
      <>
        In a world where Search is the point of discovery <br />
        for almost all consumers, a solid SEO strategy is crucial <br />
        for any brand to taste digital success. Brand awareness, <br />
        increasing website traffic, generating leads, and converting them, <br />
        no matter what your objective, SEO has a crucial part to play.
      </>
    ),
    href: "/services/search-engine-optimization-services",
  },
  {
    imageFirst: false,
    title: (
      <>
        AI-Powered <br />
        Solutions
      </>
    ),
    question: "What can AI automate for your business?",
    img: { src: "/assets/images/number/4.webp", alt: "AI-Powered Solutions" },
    slides: ["Consulting", "Chatbots", "Generative AI Solutions", "Automation", "Agents"],
    body: (
      <>
        Generative AI solutions are tools built on AI models that produce something
        usable on demand (copy drafts, images, replies to a customer, a summary of a
        report) rather than only analysing data. AI agents go a step further: they
        carry out a sequence of tasks on your behalf, such as qualifying an enquiry
        and routing it to the right team. This is where things get interesting.
        Webmaffia takes AI out of the &quot;nice to have&quot; pile and puts it to work
        automating the boring stuff, sharpening how customers experience your brand,
        and giving marketing and operations a real upgrade. No jargon, no gimmicks,
        just solutions that move the needle for your business.
      </>
    ),
    href: "/services/ai-powered-solutions-services",
  },
  {
    imageFirst: true,
    title: (
      <>
        Social <br />
        media
      </>
    ),
    question: "How do we reach the right audience?",
    img: { src: "/assets/images/number/5.webp", alt: "Social Media" },
    slides: ["Engagement", "Hashtag"],
    body: (
      <>
        Social media is the backbone of digital marketing, for good reason. Where else
        can a brand zero in on exactly the right audience and then customize the
        message to appeal to them? Social media is a crucial component of what
        Webmaffia does as a Mumbai digital marketing agency, and we go to great
        lengths to do justice to it.
      </>
    ),
    href: "/services/social-media-marketing-strategy",
  },
  {
    imageFirst: false,
    title: (
      <>
        Content <br />
        Marketing
      </>
    ),
    question: "Who writes your blogs and ad copy?",
    img: { src: "/assets/images/number/6.webp", alt: "Content Marketing" },
    slides: ["Blogs", "Copywriting", "Editorial"],
    body: (
      <>
        Original Content - Blog and Copywriting <br />
        Our wordsmiths create compelling ad copy, <br />
        editorial pieces and other original content <br />
        that prioritizes impact, clarity and <br />
        empathy over mere loudness. We put customer <br />
        intent behind every word we craft to drive <br />
        clicks and shares.
      </>
    ),
    href: "/services/content-marketing-strategy",
  },
];

function ServiceSection({ imageFirst, title, question, img, slides, body, href }) {
  const image = (
    <Image
      src={img.src}
      alt={img.alt}
      width={674}
      height={568}
      className="dark_img"
    />
  );

  const content = (
    <div>
      <h2>
        {title}
        {question ? <span className="service_question">{question}</span> : null}
      </h2>
      <ServiceTagSwiper items={slides} />
      <p>{body}</p>
      <Link href={href} className="cta_text">
        Take a <span>Look</span>
      </Link>
    </div>
  );

  return (
    <section data-section="" className="flex">
      {imageFirst ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </section>
  );
}

export default async function ServicesPage() {
  const servicesPage = await getServicesPage();
  const bannerData = buildServicesBannerData(servicesPage?.banner);

  return (
    <main className="wrapper">
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={SERVICES_PAGE_SCHEMA} />
      <JsonLd data={buildFaqSchema(SERVICES_FAQS)} />
      <div className="services ml-setter">
        <Banner data={bannerData} />

        <section className="services_glance" aria-labelledby="services-glance-h">
          <h2 id="services-glance-h" className="services_block_title">
            Which digital marketing services does Webmaffia offer?
          </h2>
          <table className="services_glance_table">
            <caption>Webmaffia digital marketing services, Mumbai</caption>
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">What it covers</th>
              </tr>
            </thead>
            <tbody>
              {SERVICES_GLANCE.map(([name, covers]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{covers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div>
          {SERVICE_SECTIONS.map((service) => (
            <ServiceSection key={service.href} {...service} />
          ))}
        </div>

        <section data-section="faq" className="team_faq services_faq">
          <div className="team_faq_head">
            <h2 className="sub_title">FAQ</h2>
            <div className="sub_heading">Frequently asked questions</div>
          </div>
          <TeamFaq items={SERVICES_FAQS} />
        </section>

        <section className="services_start" aria-labelledby="services-start-h">
          <h2 id="services-start-h" className="services_block_title">
            Where is Webmaffia based, and how do you start a project?
          </h2>
          <p>Webmaffia is a digital marketing agency based in Mumbai, India.</p>
          <ul className="services_start_list">
            <li><strong>Office:</strong> {MUMBAI_OFFICE.address}</li>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:hello@webmaffia.com">hello@webmaffia.com</a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+919867625909">{MUMBAI_OFFICE.phone}</a>
            </li>
          </ul>
          <p>
            To start a project, send us the brief you have, even a paragraph, along with
            the service you think you need and the outcome you are after. We will come
            back with a scope and a proposal.
          </p>
          <div className="services_more">
            <Link href="/contact" className="cta_text">
              Start a <span>project</span>
            </Link>
          </div>
        </section>

        <section className="services_about_page" aria-labelledby="services-about-h">
          <h2 id="services-about-h" className="services_block_title">About this page</h2>
          <p>
            Published by Webmaffia, a digital marketing agency in Mumbai, India. Services
            described here are delivered by Webmaffia&apos;s in-house strategy, design and
            development, SEO, AI, social media and content teams.
          </p>
          {SERVICES_UPDATED && (
            <p className="services_updated">
              Last updated: <time dateTime={SERVICES_UPDATED.iso}>{SERVICES_UPDATED.label}</time>
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
