export const getMeasureYear = () => {
  const urlPath = window.location.pathname;
  const measureYear = parseInt(urlPath.slice(4, 8));
  return measureYear;
};
