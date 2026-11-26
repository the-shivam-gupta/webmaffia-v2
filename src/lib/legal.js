// Copy for /privacy-policy and /terms-and-conditions. Each section renders as a
// numbered block with an anchor in the page's contents list.
// Have this reviewed by legal counsel before relying on it.

export const LEGAL_UPDATED = "2026-11-26"; // ISO date; shown as a readable date on the page
export const LEGAL_EMAIL = "veera@webmaffia.com";

export const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

export const PRIVACY_POLICY = {
  path: "/privacy-policy",
  eyebrow: "PRIVACY POLICY",
  title: "Your privacy,",
  titleAccent: "our responsibility",
  intro:
    "This policy explains what personal information Webmaffia collects when you visit our website or work with us, how we use it, and the choices you have.",
  sections: [
    {
      id: "who-we-are",
      title: "Who is responsible for your data at Webmaffia?",
      paragraphs: [
        "Webmaffia is a digital marketing and web development agency operated by Pixtop Media Solutions Pvt Ltd, with offices in Mumbai, Bengaluru and Dubai. In this policy, “Webmaffia”, “we”, “us” and “our” refer to that company.",
        "This policy applies to www.webmaffia.com and to the information you share with us through our forms, email, phone and social channels.",
      ],
    },
    {
      id: "information-we-collect",
      title: "What information does Webmaffia collect?",
      paragraphs: ["We collect information in three ways."],
      list: [
        "Information you give us: your name, email address, phone number, company, job title and the details of your enquiry when you fill in a contact, career or newsletter form or write to us.",
        "Information collected automatically: IP address, browser and device type, pages viewed, referring website and approximate location, gathered through cookies and similar technologies.",
        "Information from third parties: business contact details from professional networks such as LinkedIn, and information from analytics and advertising partners.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How does Webmaffia use your information?",
      paragraphs: ["We use personal information to:"],
      list: [
        "respond to your enquiries and prepare proposals;",
        "deliver, manage and invoice the services you have asked for;",
        "process job applications you send us;",
        "send newsletters, case studies and updates you have opted in to;",
        "understand how the website is used and improve its content and performance;",
        "keep our systems secure and meet our legal obligations.",
      ],
    },
    {
      id: "cookies",
      title: "Does Webmaffia use cookies and analytics?",
      paragraphs: [
        "We use cookies to remember your preferences, such as light or dark theme, and to measure traffic and the performance of our campaigns. Some cookies are set by third-party services including Google Analytics, Google Tag Manager, Meta and Klaviyo.",
        "You can block or delete cookies in your browser settings. Parts of the website may not work as intended if you do.",
      ],
    },
    {
      id: "sharing",
      title: "Who does Webmaffia share your information with?",
      paragraphs: [
        "We do not sell your personal information. We share it only with:",
      ],
      list: [
        "service providers that help us run the business, such as hosting, email, CRM, analytics and communication tools, under confidentiality obligations;",
        "professional advisers, auditors and insurers where needed;",
        "authorities, where the law requires it or to protect our rights;",
        "a successor business, if Webmaffia is ever merged or acquired.",
      ],
    },
    {
      id: "international-transfers",
      title: "Is your information transferred to other countries?",
      paragraphs: [
        "We work across India and the UAE and use providers whose servers may be in other countries. Where your information is transferred, we take steps to make sure it stays protected to a standard consistent with this policy.",
      ],
    },
    {
      id: "retention",
      title: "How long does Webmaffia keep your information?",
      paragraphs: [
        "We keep personal information only for as long as we need it for the purpose it was collected, to meet legal, tax or accounting requirements, or to resolve disputes. Enquiries that do not lead to a project are normally deleted within 24 months. Job applications are kept for up to 12 months unless you ask us to remove them sooner.",
      ],
    },
    {
      id: "security",
      title: "How does Webmaffia keep your information secure?",
      paragraphs: [
        "We hold an ISO/IEC 27001:2022 certification for information security and use access controls, encryption in transit and staff confidentiality commitments to protect your data. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-rights",
      title: "What rights do you have over your information?",
      paragraphs: [
        "Depending on where you live, you may have the right to:",
      ],
      list: [
        "access the personal information we hold about you;",
        "correct information that is inaccurate or incomplete;",
        "ask us to delete your information;",
        "object to or restrict certain processing, and withdraw consent at any time;",
        "unsubscribe from marketing emails using the link in any message.",
      ],
      after: `To exercise any of these rights, email us at ${LEGAL_EMAIL}. We may need to verify your identity before acting on a request.`,
    },
    {
      id: "children",
      title: "Does Webmaffia collect information from children?",
      paragraphs: [
        "Our website and services are meant for businesses and are not directed at children under 18. We do not knowingly collect their personal information. If you believe a child has shared information with us, write to us and we will delete it.",
      ],
    },
    {
      id: "third-party-links",
      title: "What about links to other websites?",
      paragraphs: [
        "Our website links to third-party sites, including our clients’ work and social platforms. We are not responsible for their content or privacy practices, so please read their policies.",
      ],
    },
    {
      id: "changes",
      title: "Can Webmaffia change this privacy policy?",
      paragraphs: [
        "We may update this policy from time to time. The date at the top of this page shows when it was last revised. Continued use of the website after a change means you accept the updated policy.",
      ],
    },
    {
      id: "contact",
      title: "Who do I contact about this?",
      paragraphs: [
        `Questions about this policy or your information? Email ${LEGAL_EMAIL} or write to Pixtop Media Solutions Pvt Ltd, 403 A Wing, Mumbai, India.`,
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS = {
  path: "/terms-and-conditions",
  eyebrow: "TERMS & CONDITIONS",
  title: "The ground rules",
  titleAccent: "for working together",
  intro:
    "These terms govern your use of www.webmaffia.com and, where no signed document says otherwise, the digital marketing and web services Webmaffia provides. In short: using the website means you accept these terms, and client work is governed by the proposal, statement of work or services agreement you sign, which prevails where the two conflict.",
  sections: [
    {
      id: "acceptance",
      title: "Do I have to accept these terms to use webmaffia.com?",
      paragraphs: [
        "By accessing www.webmaffia.com you agree to these terms and our Privacy Policy. If you do not agree, please do not use the website.",
        "Work we carry out for clients is governed by a separate proposal, statement of work or services agreement. If it conflicts with these terms, that signed document prevails.",
      ],
    },
    {
      id: "use-of-website",
      title: "What am I not allowed to do on the Webmaffia website?",
      paragraphs: ["You agree not to:"],
      list: [
        "use the website for any unlawful purpose or in a way that breaches any applicable law;",
        "attempt to gain unauthorised access to our systems, or introduce malware or other harmful code;",
        "scrape, copy or republish content at scale without our written permission;",
        "submit false, misleading or abusive information through our forms.",
      ],
    },
    {
      id: "our-services",
      title: "What services does Webmaffia provide, and what is not guaranteed?",
      paragraphs: [
        "Webmaffia provides web design and development, SEO, social media, performance marketing, content, branding and related digital services. The scope, deliverables, timelines and fees for each engagement are set out in the agreed proposal.",
        "Marketing results depend on factors outside our control, including platform algorithms, competition and market conditions. We will use reasonable skill and care, but we do not guarantee specific rankings, traffic, leads or revenue.",
      ],
    },
    {
      id: "fees-and-payment",
      title: "How and when are Webmaffia's fees payable?",
      paragraphs: [
        "Fees are quoted in the agreed proposal and exclude applicable taxes unless stated. Invoices are payable within the period stated on them. Delayed payments may attract interest and may lead us to pause work until the balance is cleared.",
        "Media spend, third-party licences, stock assets, hosting and similar costs are billed separately unless the proposal says otherwise.",
      ],
    },
    {
      id: "client-responsibilities",
      title: "What does Webmaffia need from me to deliver on time?",
      paragraphs: [
        "To deliver on time we need your timely feedback, approvals, content and access to the accounts and systems the project requires. Delays on your side can move delivery dates. You confirm that you have the rights to any material you give us.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Who owns the work Webmaffia delivers?",
      paragraphs: [
        "All content on this website, including text, graphics, logos, design and code, belongs to Webmaffia or its licensors and is protected by intellectual property laws. You may view and share it for personal, non-commercial reference only.",
        "Ownership of work created for a client passes to the client on full payment of the fees due, except for third-party materials and our pre-existing tools, frameworks and know-how, which we retain. We may show completed work in our portfolio and case studies unless we have agreed otherwise in writing.",
      ],
    },
    {
      id: "confidentiality",
      title: "Will my business information be kept confidential?",
      paragraphs: [
        "Each party will keep the other’s non-public business, technical and financial information confidential and use it only for the engagement. This does not apply to information that is public, already known to the recipient, or required to be disclosed by law.",
      ],
    },
    {
      id: "third-party-services",
      title: "Who is responsible if Google, Meta or a hosting provider suspends an account?",
      paragraphs: [
        "Our work often relies on third-party platforms such as Google, Meta, LinkedIn and hosting or software providers. Their terms apply to your use of them, and we are not liable for changes, outages or account actions taken by those providers.",
      ],
    },
    {
      id: "disclaimer",
      title: "Is the Webmaffia website guaranteed to work?",
      paragraphs: [
        "The website and its content are provided “as is” and “as available” without warranties of any kind, express or implied. We do not warrant that the website will be uninterrupted, error-free or free of harmful components.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "How much can Webmaffia be held liable for?",
      paragraphs: [
        "To the fullest extent permitted by law, Webmaffia is not liable for indirect, incidental or consequential loss, including loss of profit, revenue, data or goodwill. Our total liability arising from any engagement is limited to the fees paid to us for the services giving rise to the claim in the three months before it arose.",
      ],
    },
    {
      id: "termination",
      title: "How do I end an engagement with Webmaffia?",
      paragraphs: [
        "Either party may end an engagement as provided in the services agreement. We may suspend or restrict access to the website if you breach these terms. Fees for work completed up to the date of termination remain payable.",
      ],
    },
    {
      id: "governing-law",
      title: "Which law and which courts apply to these terms?",
      paragraphs: [
        "These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at Mumbai, Maharashtra, unless a signed services agreement says otherwise.",
      ],
    },
    {
      id: "changes",
      title: "Can Webmaffia change these terms?",
      paragraphs: [
        "We may revise these terms from time to time. The updated version applies from the date shown at the top of this page, and continued use of the website means you accept it.",
      ],
    },
    {
      id: "contact",
      title: "Who do I contact about this?",
      paragraphs: [
        `Questions about these terms? Email ${LEGAL_EMAIL} and we will be glad to help.`,
      ],
    },
  ],
};
