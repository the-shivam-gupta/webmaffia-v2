import LegalPage from "@/components/LegalPage";
import { PRIVACY_POLICY } from "@/lib/legal";

export const metadata = {
  title: "Privacy Policy | Webmaffia",
  description:
    "How Webmaffia collects, uses and protects your personal information, and the choices you have over your data.",
  alternates: {
    canonical: "https://www.webmaffia.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={PRIVACY_POLICY} />;
}
