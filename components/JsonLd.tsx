
import { SITE, absoluteUrl } from "@/lib/seo";

/**
 * Datos estructurados Schema.org para el calculador de precios.
 * Permiten a los motores de búsqueda identificar la aplicación
 * y relacionarla con su organización responsable.
 */
export default function JsonLd() {
  const siteUrl = absoluteUrl("/");
  const organizationId = `${siteUrl}#org`;
  const applicationId = `${siteUrl}#app`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": applicationId,
        name: SITE.name,
        description: SITE.description,
        url: siteUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: SITE.language,
        browserRequirements: "Requiere JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "COP",
        },
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE.brand,
        url: siteUrl,
        logo: absoluteUrl("/icons/icon-512.png"),
      },
    ],
  };

  const jsonLd = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd,
      }}
    />
  );
}
