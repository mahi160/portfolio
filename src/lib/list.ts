import { getCollection } from "astro:content";
import type { ArticleEntry, ProjectEntry } from "./types";
import { getShortDescription } from "./utils";

const rawArticles = await getCollection("blog");

export const articles: ArticleEntry[] = rawArticles
  .map((entry) => ({
    title: entry.data.title,
    description: getShortDescription(entry.data.description),
    tags: entry.data.tags,
    time: entry.data.time,
    featured: entry.data.featured,
    timestamp: entry.data.timestamp,
    url: `/blog/${entry.id}`,
  }))
  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

const rawProjects = await getCollection("projects");

export const projects: ProjectEntry[] = rawProjects
  .map((entry) => ({
    title: entry.data.title,
    description: getShortDescription(entry.data.description),
    tags: entry.data.tags,
    githubUrl: entry.data.githubUrl,
    liveUrl: entry.data.liveUrl,
    featured: entry.data.featured,
    timestamp: entry.data.timestamp,
    url: `/projects/${entry.id}`,
  }))
  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
