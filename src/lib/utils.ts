import { GLOBAL } from "./variables";

/**
 * Shortens a string to at most `maxWords` words, appending "…" if truncated.
 */
export const getShortDescription = (content: string, maxWords = 20): string => {
  const words = content.trim().split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "…"
    : content;
};

/**
 * Formats a Date as "Mon DD, YYYY" (e.g. "May 8, 2025").
 */
export const formatDateLong = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * Formats a Date as "Mon D" (e.g. "Dec 8") — for list rows where year is already shown.
 */
export const formatDateShort = (date: Date): string =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

/**
 * Formats a Date as "Month YYYY" (e.g. "April 2025").
 */
export const formatMonthYear = (date: Date): string =>
  date.toLocaleDateString("en-US", { year: "numeric", month: "long" });

/**
 * Formats a reading-time number as a human-readable string.
 * Values under 1 minute are displayed as "< 1 min".
 */
export const formatReadingTime = (minutes: number): string =>
  minutes < 1 ? "< 1 min" : `${Math.round(minutes)} min`;

/**
 * Generates the canonical URL for a content item.
 */
export const generateSourceUrl = (
  slug: string,
  contentType: "projects" | "blog",
): string => `${GLOBAL.rootUrl}/${contentType}/${slug}`;
