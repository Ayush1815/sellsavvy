import { useSeo } from "../hooks/useSeo";
import { HeroSection } from "../components/hero/HeroSection";
import { CaseSpotlight } from "../components/sections/CaseSpotlight";
import { CtaBanner } from "../components/sections/CtaBanner";
import { ServicesTeaser } from "../components/sections/ServicesTeaser";

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
      <ServicesTeaser />
      <CaseSpotlight />
      <CtaBanner />
    </>
  );
}
