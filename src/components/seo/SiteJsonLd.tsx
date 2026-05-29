import { siteConfig } from "../../config/site";
import { faqs } from "../../data/faqs";
import { JsonLd } from "./JsonLd";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      id="organization"
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: siteConfig.name,
        description: siteConfig.tagline,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: "Worldwide",
        serviceType: [
          "Ecommerce account management",
          "Performance marketing",
          "Shopify development",
          "Marketplace SEO",
        ],
      }}
    />
  );
}

export function FaqJsonLd() {
  return (
    <JsonLd
      id="faq"
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }}
    />
  );
}

export function CaseStudyJsonLd({
  slug,
  brand,
  description,
  result,
}: {
  slug: string;
  brand: string;
  description: string;
  result: string;
}) {
  return (
    <JsonLd
      id={`case-${slug}`}
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${brand} growth case study`,
        description,
        url: `${siteConfig.url}/case-studies/${slug}`,
        author: { "@type": "Organization", name: siteConfig.name },
        about: result,
      }}
    />
  );
}
