import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  _focusVisible: {
    boxShadow: "none",
  },
};

const inputTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
  defaultProps: {
    focusBorderColor: "gray.200",
  },
};

export default inputTheme;
