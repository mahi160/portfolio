import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { GLOBAL } from "../../lib/variables";

// Theme palette (sRGB equivalents of the oklch design tokens)
const PAPER: [number, number, number] = [248, 242, 229];
const INK: [number, number, number] = [41, 30, 22];
const INK_MUTED: [number, number, number] = [79, 70, 62];
const ACCENT: [number, number, number] = [77, 109, 77];

const blog = await getCollection("blog");
const projects = await getCollection("projects");

type OGPage = { title: string; description: string };

const pages: Record<string, OGPage> = {
  index: { title: GLOBAL.username, description: GLOBAL.shortDescription },
  blog: { title: GLOBAL.blogTitle, description: GLOBAL.blogShortDescription },
  projects: { title: GLOBAL.projectTitle, description: GLOBAL.projectShortDescription },
  uses: { title: "Uses", description: "The hardware, software, and terminal setup behind the work." },
  ...Object.fromEntries(
    blog.map((e) => [
      `blog/${e.id}`,
      { title: e.data.title, description: e.data.description },
    ]),
  ),
  ...Object.fromEntries(
    projects.map((e) => [
      `projects/${e.id}`,
      { title: e.data.title, description: e.data.description },
    ]),
  ),
};

const route = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page: OGPage) => ({
    title: page.title,
    description: page.description,
    bgGradient: [PAPER],
    border: { color: ACCENT, width: 14, side: "inline-start" },
    padding: 72,
    font: {
      title: {
        size: 64,
        lineHeight: 1.15,
        families: ["Lora Variable", "Georgia"],
        color: INK,
      },
      description: {
        size: 30,
        lineHeight: 1.5,
        families: ["Lora Variable", "Georgia"],
        color: INK_MUTED,
      },
    },
    fonts: [
      "./node_modules/@fontsource-variable/lora/files/lora-latin-wght-normal.woff2",
    ],
  }),
});

export const { getStaticPaths, GET } = route;
