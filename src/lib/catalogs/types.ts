/**
 * Catalog content model.
 *
 * Everything here is plain, serializable data (icons are referenced by name,
 * not by component) so a catalog can be passed from Server Components to
 * Client Components and later be sourced from Payload without changing the UI.
 */

export type CatalogIconName =
  | "users"
  | "file-input"
  | "scan-search"
  | "share"
  | "scroll-text"
  | "monitor-cog"
  | "lock"
  | "sliders"
  | "globe"
  | "usb"
  | "server"
  | "shield-check"
  | "layout-dashboard"
  | "settings"
  | "monitor"
  | "download"
  | "key-round"
  | "network"
  | "app-window"
  | "folder-lock";

export type CatalogFeature = {
  icon: CatalogIconName;
  title: string;
  description: string;
};

export type CatalogPipelineStep = {
  id: string;
  icon: CatalogIconName;
  title: string;
  description: string;
  /** Short labels rendered as chips inside the step (e.g. scan engines). */
  chips?: string[];
};

export type CatalogComponent = {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: CatalogIconName;
};

export type CatalogSpotlightVisual = "kiosk" | "isolated-browser";

export type CatalogSpotlight = {
  id: string;
  /** Latin product label, e.g. "AfraKiosk". */
  label: string;
  title: string;
  description: string;
  bullets: string[];
  visual: CatalogSpotlightVisual;
};

export type CatalogChapter = {
  id: string;
  /** Latin caption as printed in the brochure, e.g. "Security Settings". */
  label: string;
  title: string;
  icon: CatalogIconName;
  description: string;
  bullets?: string[];
};

export type CatalogCompany = {
  intro: string;
  mission: string;
  priorities: string[];
  vision: string;
  portfolio: { name: string; label: string }[];
};

export type Catalog = {
  slug: string;
  /** Latin wordmark, e.g. "AFRASI". */
  name: string;
  persianName: string;
  tagline: string;
  motto: string[];
  summary: string;
  highlights: string[];
  version: string;
  updatedAt: string;
  brochure?: {
    url: string;
    previewUrl: string;
    width: number;
    height: number;
  };
  intro: {
    title: string;
    paragraphs: string[];
  };
  pipeline: CatalogPipelineStep[];
  components: CatalogComponent[];
  spotlights: CatalogSpotlight[];
  features: CatalogFeature[];
  chapters: CatalogChapter[];
  company: CatalogCompany;
};
