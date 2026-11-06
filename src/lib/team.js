// Strapi media-library file ids, by person. The /team page looks each id up
// in Strapi for its current URL, so replacing the file in Strapi's media
// library updates the photo (the `photo` URLs below are only the fallback).
// A person added later just needs their file id added here.
export const TEAM_PHOTO_IDS = {
  "Veera Roy": 538,
  "Prasad Devadiga": 552,
  "Ankit Tomer": 549,
  "Prasanna Devadiga": 537,
  Jitesh: 636,
  Javed: 638,
  Aswin: 634,
  Cincy: 633,
  Aniket: 553,
  Shivam: 632,
  Smit: 637,
  Manasi: 635,
};

// `photo` is optional; people without one show a blank placeholder tile.
export const TEAM_LEADERS = [
  {
    role: "Co-founder",
    name: "Veera Roy",
    photo: "https://cms.webmaffia.com/uploads/veera_f6eca0edb4.jpeg",
    linkedin: "https://linkedin.com/in/veera-roy-7249506",
  },
  {
    role: "Co-founder",
    name: "Prasad Devadiga",
    photo: "https://cms.webmaffia.com/uploads/prasad_a18e67b0e2.webp",
    linkedin: "https://www.linkedin.com/in/prasad-devadiga-68752927",
  },
  {
    role: "CTO",
    name: "Ankit Tomer",
    photo: "https://cms.webmaffia.com/uploads/ankit_3829490f9b.png",
    linkedin: "https://www.linkedin.com/in/ankittomer",
  },
  {
    role: "CCO",
    name: "Prasanna Devadiga",
    photo: "https://cms.webmaffia.com/uploads/prassana_ed87078098.jpg",
    linkedin: "https://www.linkedin.com/in/prasanna-devadiga-7494789",
  },
];

export const TEAM_MEMBERS = [
  {
    role: "Art Director",
    name: "Jitesh",
    photo: "https://cms.webmaffia.com/uploads/Jitesh_853cb8c6e8.png",
  },
  {
    role: "Tech Lead",
    name: "Javed",
    photo: "https://cms.webmaffia.com/uploads/Javed_0abd8c6e0f.png",
  },
  {
    role: "Account Lead",
    name: "Aswin",
    photo: "https://cms.webmaffia.com/uploads/Ashwin_a4baa5b12a.png",
  },
  {
    role: "SEO",
    name: "Cincy",
    photo: "https://cms.webmaffia.com/uploads/Cincy_760bd5d44f.png",
  },
  {
    role: "SEO",
    name: "Aniket",
    photo: "https://cms.webmaffia.com/uploads/Aniket_fd043ae42f.webp",
  },
  {
    role: "Tech",
    name: "Shivam",
    photo: "https://cms.webmaffia.com/uploads/Shivam_024fede05f.png",
  },
  {
    role: "Account Manager",
    name: "Smit",
    photo: "https://cms.webmaffia.com/uploads/Smit_53613184a7.png",
  },
  {
    role: "Design",
    name: "Manasi",
    photo: "https://cms.webmaffia.com/uploads/Manasi_5bd25044fc.png",
  },
];

export const TEAM_POD = [
  {
    title: "Account lead",
    text: "Your single point of contact for scope, timelines and reporting.",
  },
  {
    title: "Strategist",
    text: "Turns business goals into a sitemap, content plan and KPIs.",
  },
  {
    title: "Designer + developer",
    text: "Design and build as one team, so what’s approved is what ships.",
  },
  {
    title: "SEO lead + writer",
    text: "Make every page rank, answer real questions and get cited by AI search.",
  },
  {
    title: "Department heads",
    text: "Review key deliverables before they reach you.",
  },
];

export const TEAM_FAQS = [
  {
    question: "Who founded Webmaffia?",
    answer:
      "Webmaffia was co-founded by Veera Ghuara Roy and Prasad Devadiga in 2012. It operates as Pintop Media Solutions Pvt Ltd from Mumbai, with offices in Bengaluru and Dubai.",
  },
  {
    question: "How big is the Webmaffia team?",
    answer:
      "Webmaffia has 30 full-time specialists across strategy, design, development, SEO and AI search, social media and content.",
  },
  {
    question: "Who will work on my project?",
    answer:
      "Every client gets a dedicated pod led by one account lead, who is your single point of contact. A strategist, a designer and developer, and an SEO lead and writer sit alongside them, and department heads review key deliverables before they reach you.",
  },
  {
    question: "Where is the Webmaffia team based?",
    answer:
      "The team works from Mumbai, Bengaluru and Dubai, and serves clients across India and the UAE.",
  },
  {
    question: "Is Webmaffia hiring?",
    answer:
      "We hire when there is a fit. See current openings on our careers page.",
  },
];
