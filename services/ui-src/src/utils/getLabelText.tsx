export const getLabelText = () => {
  if (window) {
    const { pathname } = window.location;
    const params = pathname.split("/");
    const year = params[2];
    const measure = params[4].replace("-", "");

    const data = require(`../measures/${year}/${measure}/data`);

    return {
      ...data.qualifierLabelsAndText,
      ...data.categoryLabelsAndText,
    };
  }
};
