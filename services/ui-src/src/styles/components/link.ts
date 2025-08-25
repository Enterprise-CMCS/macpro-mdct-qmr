import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  textDecoration: "underline",
  color: "blue.600",
  ":focus-visible": {
    outline: " 3px solid pink",
  },
};

const linkTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
};

export default linkTheme;
