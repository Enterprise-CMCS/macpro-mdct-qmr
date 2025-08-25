import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  field: {
    border: "1px solid",
    borderColor: "inherit",
    ":focus-visible": {
      outline: "3px solid pink",
    },
  },
};

const selectTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
  defaultProps: {
    variant: "baseStyles",
  },
};

export default selectTheme;
