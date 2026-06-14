import { useSeo } from "../hooks/useSeo";
import { ServiceCarousel } from "../components/service-carousel/ServiceCarousel";
import { ServicesSection } from "../components/sections/ServicesSection";
import { CtaBanner } from "../components/sections/CtaBanner";

export default function ServicesPage() {
  useSeo({
    title: "Services | SellSavvy",
    description:
      "E-commerce account management, digital marketing, product photoshoots, website design, and social media management for growing online brands.",
    path: "/services",
  });

  return (
    <div className="pt-24">
      <ServiceCarousel
        eyebrow="Services carousel"
        title="Choose the service route your growth work needs next."
        copy="Five descriptive service routes open directly from the carousel, with focused pages for operations, marketing, creative production, websites, and social media."
        className="border-t-0 pt-8 sm:pt-10"
      />
      <ServicesSection />
      <CtaBanner className="pt-0" />
    </div>
  );
}
