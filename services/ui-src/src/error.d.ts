import React from "react";

export interface FormError {
  errorLocation: string;
  errorMessage: string;
  errorType?: string;
  errorList?: string[];
}

export type RateComp = React.FC<any>;
