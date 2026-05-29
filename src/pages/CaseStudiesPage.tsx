import { useSeo } from "../hooks/useSeo";
import { CaseStudiesSection } from "../components/sections/CaseStudiesSection";
import { CtaBanner } from "../components/sections/CtaBanner";

export default function CaseStudiesPage() {
  useSeo({
    title: "Case Studies | SellSavvy",
    description: "Ecommerce growth case studies across marketplace and D2C channels.",
    path: "/case-studies",
  });

  return (
    <div className="pt-24">
      <CaseStudiesSection />
      <CtaBanner />
    </div>
  );
}
