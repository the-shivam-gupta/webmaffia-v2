import Image from "next/image";
import Banner from "@/components/Banner";
import JsonLd from "@/components/JsonLd";
import StatisticsBar from "@/components/StatisticsBar";
import TeamLinkedIn from "@/components/TeamLinkedIn";
import { LogoGridSection, SectionHead } from "@/components/HomePage";
import { getHome, getMediaUrlsByIds } from "@/lib/strapiPage";
import { buildSections } from "@/lib/homeSections";
import TeamFaq from "@/components/TeamFaq";
import { formatUpdatedAt } from "@/lib/dates";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  ORGANIZATION_SCHEMA,
  SITE_URL,
} from "@/lib/schema";
import {
  TEAM_LEADERS,
  TEAM_MEMBERS,
  TEAM_PHOTO_IDS,
  TEAM_POD,
} from "@/lib/team";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Team", path: "/team" },
]);

// Static page: bump TEAM_UPDATED whenever team members, offices or awards change.
const TEAM_UPDATED = formatUpdatedAt("2026-11-26");

const TEAM_FAQS = [
  {
    question: "How big is the Webmaffia team?",
    answer:
      "Webmaffia is a team of 30 strategists, designers, developers, SEO specialists and writers.",
  },
  {
    question: "Where is Webmaffia located?",
    answer: "Webmaffia works from Mumbai, Bengaluru and Dubai.",
  },
  {
    question: "Who founded Webmaffia?",
    answer:
      "Webmaffia was co-founded by Veera Ghuara Roy and Prasad Devadiga. Ankit Tomer is CTO and Prasanna Devadiga is CCO.",
  },
  {
    question: "How long has Webmaffia been in business?",
    answer: "Webmaffia has been operating for 14+ years and has served 175+ brands in that time.",
  },
  {
    question: "Who will work on my project?",
    answer:
      "Every Webmaffia client gets a dedicated pod of six specialists: an account lead, a strategist, a designer and developer working as one team, and an SEO lead and writer. The account lead is your single point of contact for scope, timelines and reporting.",
  },
  {
    question: "Does Webmaffia review work before it reaches the client?",
    answer: "Yes. Webmaffia department heads review key deliverables before they reach you.",
  },
  {
    question: "Is Webmaffia ISO certified?",
    answer: "Webmaffia is certified to ISO/IEC 27001:2022.",
  },
  {
    question: "Is Webmaffia an award-winning agency?",
    answer: "Webmaffia has won 30+ industry awards. The recognition section on this page lists them.",
  },
].map((faq, index) => ({ id: `team-faq-${index}`, ...faq }));

const TEAM_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "The Webmaffia team",
  url: `${SITE_URL}/team`,
  ...(TEAM_UPDATED ? { dateModified: TEAM_UPDATED.iso } : {}),
  publisher: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
};

export const metadata = {
  title: "Webmaffia Team: 30 Strategists, Designers & Developers",
  description:
    "Meet the 30 strategists, designers, developers and SEO specialists at Webmaffia. Offices in Mumbai, Bengaluru and Dubai. 14+ years, 175+ brands served.",
  alternates: {
    canonical: "https://www.webmaffia.com/team",
  },
};

// Strapi media library file ids (photos folder). Replacing a file there
// updates the page; `fallback` is only used if the lookup fails.
const LIFE_PHOTOS = [
  { id: 642, fallback: "https://cms.webmaffia.com/uploads/Mask_group_1_34793bd1cc.png" },
  { id: 737, fallback: null },
  { id: 728, fallback: null },
  { id: 640, fallback: "https://cms.webmaffia.com/uploads/Mask_group_2_1_18102e28b3.png" },
  { id: 639, fallback: "https://cms.webmaffia.com/uploads/Mask_group_1_b94b82b771.png" },
];

// Banner artwork is the testimonial illustration; the copy is the team page's own.
function buildTeamBannerData() {
  return {
    imagePosition: "right",
    priority: true,
    subheading: { enabled: true, text: "TEAM" },
    title: { line1: "Meet the", line2: "Maffians" },
    descriptions: [
      "Maffians is what we call the Webmaffia team: the 30 strategists, designers, developers, SEO specialists and writers on staff across Mumbai, Bengaluru and Dubai.",
      "Webmaffia is a team of 30 strategists, designers, developers, SEO specialists and writers who build websites and run digital marketing for enterprise brands. Co-founded by Veera Ghuara Roy and Prasad Devadiga, we work from Mumbai, Bengaluru and Dubai. In 14+ years we have served 175+ brands and won 30+ industry awards, and our information security management is certified to ISO/IEC 27001:2022.",
    ],
    images: {
      banner: {
        url: "/assets/images/testimonial_img.webp",
        alt: "Webmaffia team",
        width: 678,
        height: 877,
      },
    },
  };
}

function TeamMember({ role, name, linkedin, photo }) {
  return (
    <div className="team_member">
      <div className="team_photo">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 540px) 90vw, 25vw"
            className="team_photo_img"
          />
        ) : null}
      </div>
      <div className="team_meta">
        <div className="team_role">{role}</div>
      </div>
      <div className="team_name">{name}</div>
      <TeamLinkedIn href={linkedin} name={name} />
    </div>
  );
}

export default async function TeamPage() {
  const home = await getHome();
  const sections = buildSections(home?.sections);
  const statistics = sections.find((section) => section.type === "statistics");
  const trophies = sections.find((section) => section.type === "trophies");

  // Photos come from the Strapi media library by file id, so replacing a file
  // there updates the page. Falls back to the stored `photo` URL.
  const photoUrls = await getMediaUrlsByIds([
    ...Object.values(TEAM_PHOTO_IDS),
    ...LIFE_PHOTOS.map((photo) => photo.id),
  ]);
  const lifePhotos = LIFE_PHOTOS.map(
    (photo) => photoUrls[photo.id] || photo.fallback
  ).filter(Boolean);
  const people = [...TEAM_LEADERS, ...TEAM_MEMBERS].map((member) => ({
    ...member,
    photo: photoUrls[TEAM_PHOTO_IDS[member.name]] || member.photo,
  }));

  return (
    <main className="wrapper home_wrapper team_page">
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={TEAM_PAGE_SCHEMA} />
      <JsonLd data={buildFaqSchema(TEAM_FAQS)} />
      <div className="ml-setter">
        <Banner data={buildTeamBannerData()} />

        {statistics ? (
          <StatisticsBar
            stats={statistics.stats}
          />
        ) : null}

        <section data-section="team" className="team_section">
          <SectionHead tagline="Team" title="Who leads Webmaffia?" />
          <p className="section_description team_intro">
            Webmaffia is run by co-founders Veera Roy and Prasad Devadiga, with Ankit
            Tomer as Chief Technology Officer and Prasanna Devadiga as Chief Creative
            Officer. The wider team of 30 includes Art Director Jitesh, Tech Lead Javed,
            Account Lead Aswin, SEO specialists Cincy and Aniket, Shivam in tech,
            Account Manager Smit and Manasi in design. These are the people you will be
            dealing with day to day.
          </p>
          <div className="team_grid">
            {people.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </section>

        <section data-section="pod" className="team_pod">
          <div className="team_pod_head">
            <SectionHead
              tagline="How we work with you"
              title="Who will work on my project?"
            />
            <p className="section_description">
              Every client gets a dedicated pod of six specialists, led by one
              account lead who is your single point of contact.
            </p>
          </div>
          <ol className="team_pod_list">
            {TEAM_POD.map((item, index) => (
              <li className="team_pod_item" key={item.title}>
                <span className="team_pod_number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="team_pod_title">{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {trophies ? <LogoGridSection section={trophies} /> : null}

        <section data-section="life" className="team_life">
          <SectionHead
            tagline="Life at Webmaffia"
            title="What is it like to work at Webmaffia?"
          />
          <p className="section_description team_intro">
            Serious about the work. Not about ourselves: that is how the 30 people at
            Webmaffia describe the studio. The team works from Mumbai, Bengaluru and
            Dubai, organised in pods of six specialists: an account lead, a strategist,
            a designer, a developer, an SEO lead and a writer.
          </p>
          <div className="team_life_grid">
            {lifePhotos.map((src, index) => (
              <div
                key={src}
                className={`team_life_photo${index === 0 ? " team_life_photo--large" : ""}`}
              >
                <Image
                  src={src}
                  alt="Life at Webmaffia"
                  fill
                  sizes={index === 0 ? "(max-width: 540px) 90vw, 50vw" : "(max-width: 540px) 45vw, 25vw"}
                  className="team_life_img"
                />
              </div>
            ))}
          </div>
        </section>

        <section data-section="faq" className="team_faq">
          <div className="team_faq_head">
            <h2 className="sub_title">FAQ</h2>
            <div className="sub_heading">Questions people ask about the Webmaffia team</div>
          </div>
          <TeamFaq items={TEAM_FAQS} />
        </section>

        <section className="team_about_page" aria-labelledby="team-about-h">
          <h2 id="team-about-h" className="team_about_title">About this page</h2>
          <p>
            Maintained by the Webmaffia team. Webmaffia is a digital agency of 30
            strategists, designers, developers, SEO specialists and writers,
            co-founded by Veera Ghuara Roy and Prasad Devadiga, with offices in
            Mumbai, Bengaluru and Dubai. Certified to ISO/IEC 27001:2022.
          </p>
          {TEAM_UPDATED && (
            <p className="team_updated">
              Last updated: <time dateTime={TEAM_UPDATED.iso}>{TEAM_UPDATED.label}</time>
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
