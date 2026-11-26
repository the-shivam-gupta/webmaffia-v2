// Static content for /contact (no CMS). Keep it in sync with the footer offices.
// Update CONTACT_UPDATED whenever an address, phone or email below changes.

export const CONTACT_UPDATED = "2026-11-26";

export const CONTACT_OFFICES = [
  {
    key: "mumbai",
    city: "Mumbai, India",
    address:
      "403 A Wing, Cello Triumph, IB Patel Rd, Jay Prakash Nagar, Goregaon (E), Mumbai - 400063",
    href: "https://maps.app.goo.gl/iPvLshVht1xP6hT1A",
    email: "veera@webmaffia.com",
    phone: "+91 9867625909",
  },
  {
    key: "bengaluru",
    city: "Bengaluru, India",
    address:
      "Brigade Exotica - Burgundy Unit 2503, Old Madras Road, Bengaluru - 560049",
    href: "https://maps.app.goo.gl/iPvLshVht1xP6hT1A",
    email: "veera@webmaffia.com",
    phone: "+91 9867625909",
  },
  {
    key: "dubai",
    city: "Dubai, UAE",
    address: "JLT Cluster H, Dubai, United Arab Emirates",
    href: "https://maps.app.goo.gl/2qVqKVXrwNok34KH6",
    email: "veera@webmaffia.com",
    phone: "+971 56 272 2998",
  },
  {
    key: "usa",
    city: "Sheridan, WY, USA",
    address: "30 N Gould St, STE R, Sheridan, WY 82801, USA",
    href: "https://www.google.com/maps/search/?api=1&query=30%20N%20Gould%20St%2C%20STE%20R%2C%20Sheridan%2C%20WY%2082801%2C%20USA",
    email: "hello@webmaffia.com",
    phone: "+1 (866) 984-9786",
  },
];

export const CONTACT_SERVICES = [
  {
    name: "Web Design & Web Development",
    scope: "design and build of websites and web applications, from first wireframe to launch.",
  },
  {
    name: "Search Engine Optimization",
    scope: "technical, on-page and content work aimed at organic search visibility.",
  },
  {
    name: "AI Solution & Services",
    scope: "AI tooling and automation built into marketing and business workflows.",
  },
  {
    name: "Social Media Management",
    scope: "planning, publishing and community management across social channels.",
  },
  {
    name: "Video Content",
    scope: "concept, production and editing of video for brand and campaign use.",
  },
  {
    name: "Digital Creatives",
    scope: "static and motion creative assets for campaigns, ads and social.",
  },
  {
    name: "Digital Strategy",
    scope: "channel planning, audience definition and measurement frameworks.",
  },
];

export const CONTACT_STEPS = [
  "Your enquiry reaches the Webmaffia team.",
  "We reply by email within 2 business days, to the address you give in the form.",
];

export const CONTACT_FAQS = [
  {
    question: "What is Webmaffia's email address?",
    answer:
      "For new enquiries, email hello@webmaffia.com. The India and Dubai offices can also be reached directly at veera@webmaffia.com.",
  },
  {
    question: "How long does Webmaffia take to reply?",
    answer: "Enquiries sent through the form on this page are answered within 2 business days.",
  },
  {
    question: "Where is Webmaffia's Mumbai office?",
    answer:
      "403 A Wing, Cello Triumph, IB Patel Rd, Jay Prakash Nagar, Goregaon (E), Mumbai - 400063. Phone: +91 9867625909.",
  },
  {
    question: "Does Webmaffia have an office in Bengaluru?",
    answer:
      "Yes. Brigade Exotica - Burgundy Unit 2503, Old Madras Road, Bengaluru - 560049. Phone: +91 9867625909.",
  },
  {
    question: "Does Webmaffia have an office in Dubai?",
    answer:
      "Yes. The Dubai office is at JLT Cluster H, Dubai, United Arab Emirates. Email veera@webmaffia.com or call +971 56 272 2998.",
  },
  {
    question: "Does Webmaffia have a US presence?",
    answer:
      "Yes. Webmaffia has an office at 30 N Gould St, STE R, Sheridan, WY 82801, USA. Email hello@webmaffia.com or call +1 (866) 984-9786.",
  },
  {
    question: "What can I enquire about?",
    answer:
      "Web Design & Web Development, Search Engine Optimization, AI Solution & Services, Social Media Management, Video Content, Digital Creatives and Digital Strategy.",
  },
  {
    question: "Where can I follow Webmaffia?",
    answer:
      "Webmaffia is on Facebook, LinkedIn, Instagram and YouTube. The links are in the Follow Webmaffia section on this page.",
  },
].map((faq, index) => ({ id: `contact-faq-${index}`, ...faq }));
