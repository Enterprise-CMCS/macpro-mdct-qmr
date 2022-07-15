export const getLabelText = () => {
  const { pathname } = window.location;
  const params = pathname.split("/");
  const year = params[2];
  const measure = params[4];
  if (year && measure) {
    const { data } = require(`../measures/${year}/rateLabelText`);

    return {
      ...data[measure].qualifiers,
      ...data[measure].categories,
    };
  }
  return {};
};
