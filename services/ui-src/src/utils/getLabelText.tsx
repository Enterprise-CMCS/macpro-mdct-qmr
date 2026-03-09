import * as Labels from "./../labels/RateLabelTexts";
import { featuresByYear } from "./featuresByYear";

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

export const getLabelText = (): { [key: string]: string } => {
  const { pathname } = window.location;
  const params = pathname.split("/");
  const year = params[2];
  const measure = params[4];
  if (year && measure) {
    const data: any = Labels[`RateLabel${year}` as keyof typeof Labels].data;
    const qualifiers = data[measure]?.qualifiers ?? [];
    const categories = data[measure]?.categories ?? [];
    return Object.fromEntries(
      [...qualifiers, ...categories].map((x) => [x.label, x.text])
    );
  }
  return {};
};

//pre-2023, the system was using string types for categories & qualifiers. we want to be able to identify it as it determines our data structure for those years
export const isLegacyLabel = () => {
  return featuresByYear.hasQualCatLabels;
};
