import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {};

const linksVariant = {
  container: {
    paddingLeft: "1rem",
  },
  item: {
    listStyle: "none",
  },
};

const variants = {
  links: linksVariant,
};

const listTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
  variants: variants,
};

export default listTheme;
