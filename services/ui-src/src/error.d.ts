interface FormError {
  errorLocation: string;
  errorMessage: string;
  errorType?: string;
  errorList?: string[];
}

type RateComp = React.FC<React.PropsWithChildren<any>>;
