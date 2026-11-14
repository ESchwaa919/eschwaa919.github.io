import { Helmet } from "react-helmet-async"

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  // Pixel size of ogImage. Leave both out for the default card: its 1200x630
  // size is already in the static head of index.html.
  ogImageWidth?: number
  ogImageHeight?: number
  ogType?: "website" | "article" | "product"
  noIndex?: boolean
}

const BASE_URL = "https://theaiexpert.ai"
const DEFAULT_IMAGE = `${BASE_URL}/og-card.jpg`
const SITE_NAME = "The AI Expert"
const TWITTER_HANDLE = "@ESchwaa"

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogImageWidth,
  ogImageHeight,
  ogType = "website",
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const fullCanonicalUrl = canonicalUrl?.startsWith("http")
    ? canonicalUrl
    : `${BASE_URL}${canonicalUrl || ""}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogImageWidth !== undefined && <meta property="og:image:width" content={String(ogImageWidth)} />}
      {ogImageHeight !== undefined && <meta property="og:image:height" content={String(ogImageHeight)} />}
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
    </Helmet>
  )
}

export default SEOHead
