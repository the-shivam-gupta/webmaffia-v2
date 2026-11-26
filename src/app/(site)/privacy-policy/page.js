import LegalPage from "@/components/LegalPage";
import { PRIVACY_POLICY } from "@/lib/legal";

export const metadata = {
  title: "Privacy Policy | How Webmaffia Collects and Uses Your Data",
  description:
    "How Webmaffia collects, uses, shares and protects personal information from webmaffia.com: cookies, retention periods, your rights and how to contact us.",
  alternates: {
    canonical: "https://www.webmaffia.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={PRIVACY_POLICY} />;
}
