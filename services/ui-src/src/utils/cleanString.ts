export const cleanString = (s: string) => s.replace(/[^\w]/g, "");

export const createSafeS3Key = (s: string) => {
  return encodeURIComponent(s)
    .replace(/\-/g, "%2D")
    .replace(/\_/g, "%5F")
    .replace(/\!/g, "%21")
    .replace(/\~/g, "%7E")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
};
