import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Open Sans",
  },
  components: {
    Form: {
      baseStyle: {
        helperText: {
          fontSize: "md",
          color: "black.700",
          lineHeight: "base",
        },
      },
    },
    FormError: {
      baseStyle: {
        text: {
          color: "red.700",
          fontSize: "md",
        },
      },
    },
    Button: {
      variants: {
        "link-white": {
          color: "white",
          width: "auto",
          height: "auto",
          whiteSpacr: "nowrap",
          padding: "0",
          margin: "0",
          _hover: {
            color: "#FFFFFF90",
          },
          _active: {
            color: "white",
            textDecoration: "underline",
          },
        },
      },
    },
  },
  colors: {
    gray: { 50: "#F1F1F1", 500: "#71767A" },
    blue: { 800: "#112E51" },
  },
});
