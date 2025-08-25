import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  button: {
    ":focus-visible": {
      outline: "3px solid pink",
    },
  },
};

const menuTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
};

export default menuTheme;
