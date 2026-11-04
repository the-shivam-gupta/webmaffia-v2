import LegalPage from "@/components/LegalPage";
import { TERMS_AND_CONDITIONS } from "@/lib/legal";

export const metadata = {
  title: "Terms & Conditions | Webmaffia",
  description:
    "The terms that govern your use of the Webmaffia website and the general basis on which we provide digital marketing and web services.",
  alternates: {
    canonical: "https://www.webmaffia.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return <LegalPage doc={TERMS_AND_CONDITIONS} />;
}
