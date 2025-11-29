import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mtglibrary.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/features", "/pricing", "/about", "/faq"],
        disallow: ["/api/", "/app/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

