import { useSeo } from "../hooks/useSeo";
import { GrowthSystemSection } from "../components/sections/GrowthSystemSection";
import { CtaBanner } from "../components/sections/CtaBanner";

export default function GrowthSystemPage() {
  useSeo({
    title: "Growth System | SellSavvy",
    description: "Audit, strategy, execution, reporting, and scale — a clear ecommerce growth workflow from SellSavvy.",
    path: "/growth-system",
  });

  return (
    <div className="pt-24">
      <GrowthSystemSection />
      <CtaBanner />
    </div>
  );
}
