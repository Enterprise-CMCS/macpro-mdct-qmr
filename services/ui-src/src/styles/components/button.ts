import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  textTransform: "capitalize",
  fontWeight: "bold",
  borderRadius: "sm",
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
  borderRadius: "sm",
  textDecoration: "none",
};

const primaryVariant = {
  background: "blue.600",
  color: "white",
  textTransform: "capitalize",
  fontWeight: "bold",
  borderRadius: "sm",
  " &:disabled:hover": {
    background: "blue.600",
  },
};

const linkVariant = {
  color: "blue.600",
};

const greenVariant = {
  background: "green.500",
  color: "white",
  " &:disabled:hover": {
    background: "green.500",
  },
};

const redVariant = {
  background: "red.500",
  color: "white",
  " &:disabled:hover": {
    background: "red.500",
  },
};

const variants = {
  "link-white": linkWhiteVariant,
  "outline-primary": outlinePrimaryVariant,
  primary: primaryVariant,
  green: greenVariant,
  red: redVariant,
  link: linkVariant,
};

const buttonTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
  variants: variants,
};

export default buttonTheme;
