import { useSeo } from "../hooks/useSeo";
import { ServicesSection } from "../components/sections/ServicesSection";
import { CtaBanner } from "../components/sections/CtaBanner";

export default function ServicesPage() {
  useSeo({
    title: "Services | SellSavvy",
    description:
      "Ecommerce account management, performance marketing, storefront development, SEO, creatives, and growth support.",
    path: "/services",
  });

  return (
    <div className="pt-24">
      <ServicesSection />
      <CtaBanner />
    </div>
  );
}
