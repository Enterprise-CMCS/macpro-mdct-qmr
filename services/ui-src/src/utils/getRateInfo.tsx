export const getRateInfo = () => {
  const { pathname } = window.location;
  const params = pathname.split("/");
  const year = params[2];
  const measure = params[4];

  const { data } = require(`../measures/${year}/rateLabelText`);

  const labelText = {
    ...data[measure].qualifiers,
    ...data[measure].categories,
  };

  const qualifiers = Object.keys(data[measure].qualifiers);
  const categories = Object.keys(data[measure].categories);

  return {
    labelText,
    qualifiers,
    categories,
  };
};
