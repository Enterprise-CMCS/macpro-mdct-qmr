import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "body, p": {
        fontFamily: "Open Sans",
      },
    },
  },
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
    Tabs: {
      variants: {
        unstyled: {
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
          _active: {
            color: "#FFFFFF",
            textDecoration: "underline",
          },
          _hover: {
            color: "white",
            textDecoration: "underline",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        textDecoration: "underline",
        color: "blue.600",
      },
    },
  },
  colors: {
    gray: { 50: "#F1F1F1", 300: "#D6D7D9", 500: "#71767A" },
    blue: { 100: "#EEFBFF", 500: "#0071BC", 800: "#00395E" },
  },
});
