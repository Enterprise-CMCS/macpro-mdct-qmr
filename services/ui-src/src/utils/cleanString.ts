export const cleanString = (s: string) => s.replace(/[^\w]/g, "");

export const createSafeS3Key = (s: string) => {
  return encodeURIComponent(s)
    .replace(/\*/g, "%2A")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
};
