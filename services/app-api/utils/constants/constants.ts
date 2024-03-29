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
