import { data as data2021 } from "../measures/2021/rateLabelText";
import { data as data2022 } from "../measures/2022/rateLabelText";
import { data as data2023 } from "../measures/2023/rateLabelText";
import { data as data2024 } from "../measures/2024/rateLabelText";
import { data as data2025 } from "../measures/2025/rateLabelText";

type LabelText = { [key: string]: string };
export interface LabelData {
  isField?: boolean;
  label: string;
  text: string;
  id: string;
}

const yearMap: { [id: string]: any } = {
  "2021": data2021,
  "2022": data2022,
  "2023": data2023,
  "2024": data2024,
  "2025": data2025,
};

const addLabelTextData = (acc: LabelText, data: LabelData) => {
  acc[data.label] = data.text;
  return acc;
};

export const getLabelText = (): { [key: string]: string } => {
  const { pathname } = window.location;
  const params = pathname.split("/");
  const year = params[2];
  const measure = params[4];
  if (year && measure) {
    const data = yearMap[year];
    return {
      ...data[measure]?.qualifiers.reduce(addLabelTextData, {}),
      ...data[measure]?.categories.reduce(addLabelTextData, {}),
    };
  }
  return {};
};

//pre-2023, the system was using string types for categories & qualifiers. we want to be able to identify it as it determines our data structure for those years
export const isLegacyLabel = () => {
  const { pathname } = window.location;
  const params = pathname.split("/");
  const year = Number(params[2]);
  return year < 2023;
};
