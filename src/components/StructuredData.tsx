import { Helmet } from "react-helmet-async"

interface StructuredDataProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// Pre-built schema templates
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The AI Expert",
  "url": "https://theaiexpert.ai",
  "logo": "https://theaiexpert.ai/theaiexpert-transparent-logo.png",
  "description": "AI consulting practice offering fractional Chief AI Officer (CAIO) services, AI strategy, and implementation for SMBs and enterprises.",
  "founder": {
    "@type": "Person",
    "name": "Erik Schwartz"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressCountry": "UK"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://theaiexpert.ai/contact"
  },
  "sameAs": [
    "https://www.linkedin.com/in/eschwaa/",
    "https://x.com/ESchwaa"
  ]
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Erik Schwartz",
  "jobTitle": "AI Consultant & Fractional Chief AI Officer",
  "url": "https://theaiexpert.ai/about",
  "worksFor": {
    "@type": "Organization",
    "name": "The AI Expert"
  },
  "sameAs": [
    "https://www.linkedin.com/in/eschwaa/",
    "https://x.com/ESchwaa"
  ]
}

export function createServiceSchema(services: Array<{ name: string; description: string; url?: string }>) {
  return services.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "The AI Expert",
      "url": "https://theaiexpert.ai"
    },
    "areaServed": {
      "@type": "Place",
      "name": "United Kingdom, Europe, Global (Remote)"
    },
    ...(service.url && { "url": service.url })
  }))
}

export function createProductSchema(product: {
  name: string
  description: string
  url: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "url": product.url,
    "image": product.image || "https://theaiexpert.ai/theaiexpert-transparent-logo.png",
    "brand": {
      "@type": "Organization",
      "name": "The AI Expert"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "GBP"
    }
  }
}

export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export default StructuredData
