import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  ":focus-visible": {
    outline: "3px solid pink",
  },
};

const linkWhiteVariant = {
  color: "white",
  width: "auto",
  height: "auto",
  whiteSpacr: "nowrap",
  padding: "0",
  margin: "0",
  _active: {
    color: "#FFFFFF",
    textDecoration: "underline",
  },
  _hover: {
    color: "white",
    textDecoration: "underline",
  },
};

const outlinePrimaryVariant = {
  color: "blue.600",
  border: "1px solid #2b6cb0",
  borderRadius: "0",
};

const variants = {
  "link-white": linkWhiteVariant,
  "outline-primary": outlinePrimaryVariant,
};

const buttonTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
  variants: variants,
};

export default buttonTheme;
