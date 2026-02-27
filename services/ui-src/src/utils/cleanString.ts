/**
 * It removes all non-word characters from a string.
 * @param {string} [s] - The string to be cleaned.
 */
export const cleanString = (s: string) => s && s.replaceAll(/[^\w]/g, "");

export const createSafeS3Key = (s: string) => {
  return encodeURIComponent(s)
    .replaceAll("*", "%2A")
    .replaceAll("(", "%28")
    .replaceAll(")", "%29");
};
