import { ReactElement, cloneElement } from "react";

export interface MeasureWrapperProps {
  measure: ReactElement;
  name: string;
}

export const MeasureWrapper = ({ measure, name }: MeasureWrapperProps) => {
  const updateMeasure = () => {
    console.log("measure updated");
  };

  return <>{cloneElement(measure, { name, updateMeasure })}</>;
};
