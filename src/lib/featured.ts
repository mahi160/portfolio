import { articles, projects } from "./list";

export const featuredArticles = articles.filter((a) => a.featured);
export const featuredProjects = projects.filter((p) => p.featured);
