/** Commonly used in place of booleans for user-entered data */
export type YesNo = "yes" | "no";

/** This is a string, but it should be parseable with `Number()` */
export type NumericString = string;

/** This may be an actual number, but it may be a string you must parse. */
export type Numeric = NumericString | number;

/** Points to a user-uploaded file in S3 */
export type UploadInfo = {
  s3Key: string;
  filename: string;
  contentType: string;
  url: string;
};

/**
 * The different roles a user make take within QMR.
 * The `token["custom:cms_roles"]` attribute may contain one or more of these.
 */
export enum UserRoles {
  ADMIN = "mdctqmr-bor", // "MDCT QMR ADMIN"
  APPROVER = "mdctqmr-approver", // "MDCT QMR APPROVER"
  INTERNAL = "mdctqmr-internal-user", // "MDCT QMR INTERNAL USER"
  HELP_DESK = "mdctqmr-help-desk", // "MDCT QMR HELP DESK USER"
  STATE_USER = "mdctqmr-state-user", // "MDCT QMR STATE USER"
}
