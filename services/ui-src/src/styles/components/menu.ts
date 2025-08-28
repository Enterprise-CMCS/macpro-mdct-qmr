import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  button: {
    ":focus-visible": {
      outline: "3px solid #bd13b8",
    },
  },
};

const menuTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
};

export default menuTheme;
