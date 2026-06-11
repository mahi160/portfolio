// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
  site: "https://sifat.is-a.dev",
  prefetch: { prefetchAll: true },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "kanagawa-wave",
        dark: "kanagawa-dragon",
      },
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Link to this section",
          },
          content: { type: "text", value: "#" },
        },
      ],
    ],
  },
});
