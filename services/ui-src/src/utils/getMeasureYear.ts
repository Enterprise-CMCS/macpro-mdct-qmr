export const getMeasureYear = () => {
  const { pathname } = window.location;
  const params = pathname.split("/");
  const year = parseInt(params[2]);
  return year;
};
