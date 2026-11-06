import Image from "next/image";
import Banner from "@/components/Banner";
import JsonLd from "@/components/JsonLd";
import StatisticsBar from "@/components/StatisticsBar";
import TeamLinkedIn from "@/components/TeamLinkedIn";
import { LogoGridSection, SectionHead } from "@/components/HomePage";
import { getHome, getMediaUrlsByIds } from "@/lib/strapiPage";
import { buildSections } from "@/lib/homeSections";
import { buildBreadcrumbSchema } from "@/lib/schema";
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

export const metadata = {
  title: "Meet the Webmaffia Team - Strategists, Designers & Developers",
  description:
    "Meet the 30 strategists, designers, developers and SEO specialists behind Webmaffia, co-founded by Veera Ghuara Roy and working from Mumbai, Bengaluru and Dubai.",
  alternates: {
    canonical: "https://www.webmaffia.com/team",
  },
};

const LIFE_PHOTOS = [
  "https://cms.webmaffia.com/uploads/Mask_group_1_34793bd1cc.png",
  "https://cms.webmaffia.com/uploads/remiong_554071e59d.png",
  "https://cms.webmaffia.com/uploads/Rectangle_5_48ac7a5ac6.png",
  "https://cms.webmaffia.com/uploads/Mask_group_2_1_18102e28b3.png",
  "https://cms.webmaffia.com/uploads/Mask_group_1_b94b82b771.png",
];

// Banner artwork is the testimonial illustration; the copy is the team page's own.
function buildTeamBannerData() {
  return {
    imagePosition: "right",
    priority: true,
    subheading: { enabled: true, text: "TEAM" },
    title: { line1: "Meet", line2: "the maffians" },
    description:
      "Webmaffia is a team of 30 strategists, designers, developers, SEO specialists and writers who build websites and run digital marketing for enterprise brands. Co-founded by Veera Ghuara Roy, we work from Mumbai, Bengaluru and Dubai.",
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
  const photoUrls = await getMediaUrlsByIds(Object.values(TEAM_PHOTO_IDS));
  const people = [...TEAM_LEADERS, ...TEAM_MEMBERS].map((member) => ({
    ...member,
    photo: photoUrls[TEAM_PHOTO_IDS[member.name]] || member.photo,
  }));

  return (
    <main className="wrapper home_wrapper team_page">
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <div className="ml-setter">
        <Banner data={buildTeamBannerData()} />

        {statistics ? (
          <StatisticsBar
            stats={statistics.stats}
          />
        ) : null}

        <section data-section="team" className="team_section">
          <SectionHead tagline="Team" title={"The people who\nrun the family"} />
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
            title={"Serious about the work.\nNot about ourselves."}
          />
          <div className="team_life_grid">
            {LIFE_PHOTOS.map((src, index) => (
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
      </div>
    </main>
  );
}
