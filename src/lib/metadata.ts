import { type Metadata } from "next";

const siteConfig = {
  name: "MTG Library",
  description:
    "Manage your Magic: The Gathering collection with AI-powered card recognition. Track prices, build decks, and organize your cards effortlessly.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://mtglibrary.com",
  ogImage: "/opengraph-image",
  links: {
    twitter: "https://twitter.com/mtglibrary",
  },
};

export function createMetadata({
  title,
  description,
  image,
  path = "",
  noIndex = false,
}: {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title === "MTG Library" ? title : `${title} | MTG Library`;
  const pageDescription = description || siteConfig.description;
  const pageImage = image || siteConfig.ogImage;
  const pageUrl = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "MTG",
      "Magic The Gathering",
      "card scanner",
      "collection management",
      "deck builder",
      "price tracking",
      "card database",
      "trading cards",
    ],
    authors: [{ name: "MTG Library Team" }],
    creator: "MTG Library",
    publisher: "MTG Library",
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@mtglibrary",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export { siteConfig };

