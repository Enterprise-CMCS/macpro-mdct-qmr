/** The shape of an item in the banners table. */
export type Banner = {
  /**
   * A unique ID.
   *
   * How can a hardcoded string also be a unique ID?
   * QMR currently only supports a single banner at a time.
   */
  key: "admin-banner-id";

  /** The header at the top of the banner. */
  title: string;

  /**
   * The main content of the banner.
   *
   * This may contain HTML markup, which will be parsed and rendered.
   * But only a subset of HTML: lists, links, and emphasis.
   * This undergoes sanitization in both the UI and the API layers.
   */
  description: string;

  /** If present, this URL will be displayed at the bottom of the banner. */
  link?: string;

  /** When should the banner start being displayed in the site header? */
  startDate: number;

  /** When should the banner be removed from the site header? */
  endDate: number;

  createdAt: number;
  lastAltered: number;
  /** The `cognito-identity-id` of the creation request */
  lastAlteredBy?: string;
};
