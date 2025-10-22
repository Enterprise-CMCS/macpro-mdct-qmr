import * as Labels from "./../labels/RateLabelTexts";
import { featuresByYear } from "./featuresByYear";

type LabelText = { [key: string]: string };
export interface LabelData {
  isField?: boolean;
  label: string;
  text: string;
  id: string;
  /**
   * We use this to hide certain qualifiers from certain categories.
   *
   * For example, in AIS-AD, we don't ask about the Zoster vaccine
   * for the 19-65 age group.
   */
  excludeFromIds?: string[];
}

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
    const data: any = Labels[`RateLabel${year}` as keyof typeof Labels];
    return {
      ...data[measure]?.qualifiers.reduce(addLabelTextData, {}),
      ...data[measure]?.categories.reduce(addLabelTextData, {}),
    };
  }
  return {};
};

//pre-2023, the system was using string types for categories & qualifiers. we want to be able to identify it as it determines our data structure for those years
export const isLegacyLabel = () => {
  return featuresByYear.hasQualCatLabels;
};
