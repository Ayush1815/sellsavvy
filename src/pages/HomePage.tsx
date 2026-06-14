import { useSeo } from "../hooks/useSeo";
import { HeroSection } from "../components/hero/HeroSection";
import { CtaBanner } from "../components/sections/CtaBanner";
import { ServiceCarousel } from "../components/service-carousel/ServiceCarousel";
import { GrowthSystemSection } from "../components/sections/GrowthSystemSection";
import { ServicesTeaser } from "../components/sections/ServicesTeaser";
import { WhatWeOffer } from "../components/about/WhatWeOffer";
import { CoreValues } from "../components/about/CoreValues";
import { FaqSection } from "../components/sections/FaqSection";
import { AuditFormSection } from "../components/sections/AuditFormSection";

export default function HomePage() {
  useSeo({
    title: "SellSavvy | Ecommerce Growth Partner",
    description:
      "SellSavvy manages marketplace operations, performance marketing, storefront development, and reporting for D2C and marketplace brands.",
    path: "/",
  });

  return (
    <>
      <HeroSection />
      <ServiceCarousel
        title="Services that move like your growth system."
        copy="Four core services presented as wide, reversed video loops with smooth horizontal controls and direct service routes."
      />
      <GrowthSystemSection />
      <ServicesTeaser />
      <WhatWeOffer />
      <CoreValues />
      <FaqSection />
      <AuditFormSection />
      <CtaBanner />
    </>
  );
}

