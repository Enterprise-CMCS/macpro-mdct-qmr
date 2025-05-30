export const enum Errors {
  // generic errors
  UNAUTHORIZED = "User is not authorized to access this resource.",
  NO_KEY = "Must provide key for table",
  MISSING_DATA = "Missing required data",
  INVALID_DATA = "Provided data is not valid",
  NO_MATCHING_RECORD = "No matching record found",
  // template errors
  NO_TEMPLATE_NAME = "Must request template for download",
  INVALID_TEMPLATE_NAME = "Requested template does not exist or does not match",
  // coreset errors
  CORESET_ALREADY_EXISTS = "Failure to create coreset. Coreset already exists.",
}

export const enum StatusCodes {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const states = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const bannerIds = ["admin-banner-id"];
