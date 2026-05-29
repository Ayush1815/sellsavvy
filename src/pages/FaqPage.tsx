import { useSeo } from "../hooks/useSeo";
import { FaqJsonLd } from "../components/seo/SiteJsonLd";
import { FaqSection } from "../components/sections/FaqSection";
import { CtaBanner } from "../components/sections/CtaBanner";

export default function FaqPage() {
  useSeo({
    title: "FAQ | SellSavvy",
    description:
      "Answers about SellSavvy ecommerce management, audits, reporting, and how we work with marketplace and D2C brands.",
    path: "/faq",
  });

  return (
    <div className="pt-24">
      <FaqJsonLd />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}
