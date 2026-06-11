---
name: portfolio-content
description: Add blog posts, add projects, or update changeable content (now-block, uses page, colophon, résumé, profile info) on this Astro portfolio. Interviews the user with ask_user, creates/updates files with correct frontmatter, and handles all side effects (reading time, featured limits, OG/RSS/sitemap, build verification). Use whenever the user asks to add/write a blog post or project, or update site info.
---

# Portfolio Content Manager

This site is a static Astro portfolio. Content is markdown + a few config files.
Everything downstream (OG images, RSS, sitemap, prev/next nav, year grouping,
heading anchors) is generated automatically at build time — your job is correct
inputs and a verified build.

## File map

| What | Where |
|---|---|
| Blog posts | `src/content/blog/<slug>.md` |
| Projects | `src/content/projects/<slug>.md` |
| Identity, now-block, descriptions, links | `src/lib/variables.ts` (`GLOBAL`) |
| Uses page content | `src/pages/uses.astro` (`sections` array at top) |
| Homepage colophon (stack lists) | `src/pages/index.astro` (`.colophon` section) |
| Résumé PDF | `public/salauddin-omar-sifat.pdf` |
| Content schemas (source of truth) | `src/content.config.ts` |

## Workflow: Add a blog post

1. **Interview** with `ask_user` (batch mode). Ask:
   - Title
   - Description — explain it does triple duty: list snippet, meta/OG card, RSS. 1–2 sentences. If user gives a weak one, propose a sharper rewrite and confirm.
   - Tags (suggest from existing posts: run `grep -h "^tags:" src/content/blog/*.md` first)
   - Featured on homepage? (check current count first — see Side effects)
   - Date (default: today)
   - Content: does the user have draft text, an outline, or should you scaffold a placeholder structure?
2. **Slug**: derive from title — lowercase, hyphens, short (3–5 words). Confirm with user. Warn: published slugs must never be renamed (breaks URLs/OG).
3. **Create** `src/content/blog/<slug>.md` with frontmatter:

   ```yaml
   ---
   title: "..."
   description: "..."
   tags: ["..."]          # optional
   featured: true|false
   timestamp: YYYY-MM-DD
   ---
   ```

4. **Reading time**: automatic — computed from body word count at build (`calculateReadingTime` in `src/lib/utils.ts`). Never add a `time` field; the schema rejects unknown handling silently and it's dead weight.
5. **Body conventions**: first paragraph is styled as a lede (larger, darker) — make it count. Use `##`/`###` headings (anchors auto-added). Code blocks get Shiki (kanagawa) + copy button automatically.
6. Run Side effects (below).

## Workflow: Add a project

Same as blog, plus ask:
- `githubUrl` / `liveUrl` (both optional, must be full URLs — schema validates)
- Should it appear in the now-block (`GLOBAL.nowBody`) or on `/uses`? If it's a tool the user actually uses daily, offer to add cross-links there.

Frontmatter: `title, description, tags?, githubUrl?, liveUrl?, featured, timestamp`. No `time` field.

## Workflow: Update changeable things

Ask which (or infer from request):

- **Now block**: `GLOBAL.nowDate` (e.g. `'June 2026'`) + `GLOBAL.nowBody` (HTML string, inline `<a>` links allowed). Keep it 2–4 sentences, present tense.
- **Role / descriptions / links / email**: other `GLOBAL` fields in `src/lib/variables.ts`. If `currentRole` changes, also check the Person JSON-LD in `src/pages/index.astro` (jobTitle, worksFor).
- **Uses page**: edit the `sections` array in `src/pages/uses.astro`. Rows are `{ term, detail }`; `detail` supports inline HTML links.
- **Colophon**: hardcoded `<dl>` rows in `src/pages/index.astro`.
- **Résumé**: replace the PDF in `public/`, keep the same filename (or update `GLOBAL.resumeUrl`).

## Side effects — always check

1. **Featured limits**: homepage shows all `featured: true` items. Target ~3 posts, 2–4 projects. Count with:
   ```bash
   grep -l "featured: true" src/content/blog/*.md | wc -l
   grep -l "featured: true" src/content/projects/*.md | wc -l
   ```
   If over target, ask user which to unfeature.
2. **Build verification** (mandatory, catches schema errors):
   ```bash
   pnpm build
   ```
   Confirm: build green, page count increased, and `dist/og/blog/<slug>.png` (or `og/projects/<slug>.png`) exists.
3. **Description length**: very long descriptions overflow the OG card. Keep ≤ ~160 chars.
4. **Stale now-block**: if `GLOBAL.nowDate` is more than ~2 months old, mention it and offer to update.
5. **Favicon changed?** (rare) Regenerate icons:
   ```bash
   node -e "const s=require('sharp');[['apple-touch-icon',180],['icon-192',192],['icon-512',512]].forEach(async([n,z])=>s('public/favicon.svg',{density:300}).resize(z,z).png().toFile('public/'+n+'.png'))"
   ```
6. **Never commit/push** unless the user explicitly asks.

## Style notes

- Site voice: terse, warm, terminal-flavored, slightly wry ("Things I made on purpose."). Match it in placeholders and descriptions.
- Theme: never hardcode colors in content; everything uses CSS tokens.
