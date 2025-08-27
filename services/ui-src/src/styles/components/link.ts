import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  textDecoration: "underline",
  color: "blue.600",
  ":focus-visible": {
    outline: " 3px solid pink",
  },
};

const unlinedVariant = {
  textDecoration: "none",
  fontWeight: "bold",
};

const variants = {
  unlined: unlinedVariant,
};

const linkTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
  variants: variants,
};

export default linkTheme;
