import { useLocation } from "react-router-dom";

export const useLabelText = () => {
  const { pathname } = useLocation();
  const params = pathname.split("/");
  const year = params[2];
  const measure = params[4].replace("-", "");

  const data = require(`../measures/${year}/${measure}/data`);

  return {
    ...data.qualifierLabelsAndText,
    ...data.categoryLabelsAndText,
  };
};
