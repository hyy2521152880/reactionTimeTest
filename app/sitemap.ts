import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: "https://reaction-test.org/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1
  }];
}
