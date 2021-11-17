import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
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
  },
});
