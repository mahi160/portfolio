/**
 * Shape of a processed blog entry used by list pages and home components.
 * `timestamp` is a `Date` (from the Content Collection schema's `z.coerce.date()`).
 */
export type ArticleEntry = {
  title: string;
  description: string;
  tags?: string[];
  time: number;
  featured: boolean;
  timestamp: Date;
  /** Absolute URL path, e.g. `/blog/neovim-one` */
  url: string;
};

/**
 * Shape of a processed project entry used by list pages and home components.
 * `timestamp` is a `Date` (from the Content Collection schema's `z.coerce.date()`).
 */
export type ProjectEntry = {
  title: string;
  description: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  timestamp: Date;
  /** Absolute URL path, e.g. `/projects/flowd` */
  url: string;
};
