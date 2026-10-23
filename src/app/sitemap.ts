import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { PROJECTS_DATA } from "@/data/content";
import { DESIGNS_DATA } from "@/data/designDetails";

export const dynamic = "force-static";

/** Date of the latest commit, so lastModified only moves when the site's source does, not on every build. */
function lastCommitDate(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    const date = new Date(iso);
    if (!Number.isNaN(date.getTime())) return date;
  } catch {
    // Not a git checkout (e.g. a source archive): fall through.
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sritulasiram.my";
  const currentDate = lastCommitDate();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/designs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/photography`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS_DATA.map((p) => ({
    url: `${baseUrl}/projects/${p.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const designRoutes: MetadataRoute.Sitemap = DESIGNS_DATA.map((d) => ({
    url: `${baseUrl}/designs/${d.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...designRoutes];
}
