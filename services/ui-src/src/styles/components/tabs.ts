import { ComponentStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  tab: {
    fontWeight: "bold",
    borderWidth: "1px 1px 0 1px",
    borderColor: "gray.200",
    fontSize: "sm",
    _selected: {
      color: "blue.500",
      borderTopColor: "blue.500",
      borderBottomColor: "white",
      margin: "0 0 -1px 0",
      borderWidth: "6px 1px 2px 1px",
    },
  },
};

const tabsTheme: ComponentStyleConfig = {
  baseStyle: baseStyles,
};

export default tabsTheme;
