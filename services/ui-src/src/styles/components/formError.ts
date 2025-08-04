import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  baseStyle: {
    text: {
      color: "red.700",
      fontSize: "md",
    },
  },
};

const formErrorTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
};

export default formErrorTheme;
