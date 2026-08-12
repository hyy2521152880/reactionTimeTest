import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://reaction-test.org/sitemap.xml",
    host: "https://reaction-test.org"
  };
}
