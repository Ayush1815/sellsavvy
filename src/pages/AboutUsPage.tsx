import { useSeo } from "../hooks/useSeo";
import { AboutHero } from "../components/about/AboutHero";
import { CoreValues } from "../components/about/CoreValues";
import { WhatWeOffer } from "../components/about/WhatWeOffer";
import { Capabilities } from "../components/about/Capabilities";
import { CtaBanner } from "../components/sections/CtaBanner";

export default function AboutUsPage() {
  useSeo({
    title: "About Us | SellSavvy",
    description: "Learn about SellSavvy's mission to transform ecommerce businesses for the better with smart, result-driven solutions.",
    path: "/about",
  });

  return (
    <div className="pt-24">
      <AboutHero />
      <CoreValues />
      <WhatWeOffer />
      <Capabilities />
      <CtaBanner />
    </div>
  );
}
