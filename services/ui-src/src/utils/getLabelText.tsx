type LabelText = { [key: string]: string };
export interface LabelData {
  mathematicaCategory: string;
  id: string;
  label: string;
}
const addLabelTextData = (acc: LabelText, data: LabelData) => {
  acc[data.label] = data.label;
  return acc;
};

export const getLabelText = () => {
  const { pathname } = window.location;
  const params = pathname.split("/");
  const year = params[2];
  const measure = params[4];
  if (year && measure) {
    const { data } = require(`../measures/${year}/rateLabelText`);

    return {
      ...data[measure]?.qualifiers.reduce(addLabelTextData, {}),
      ...data[measure]?.categories.reduce(addLabelTextData, {}),
    };
  }
  return {};
};
