import React from "react";

export interface MeasureWrapperProps {
  children?: React.ReactElement;
  name: string;
}

export const MeasureWrapper = ({ children, name }: MeasureWrapperProps) => {
  const updateMeasure = () => {
    console.log("measure updated");
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript error
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { name, updateMeasure });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};
