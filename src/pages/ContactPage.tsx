import { useSeo } from "../hooks/useSeo";
import { AuditFormSection } from "../components/sections/AuditFormSection";

export default function ContactPage() {
  useSeo({
    title: "Contact | SellSavvy",
    description: "Book a free ecommerce growth audit with SellSavvy.",
    path: "/contact",
  });

  return (
    <div className="pt-24">
      <AuditFormSection />
    </div>
  );
}
