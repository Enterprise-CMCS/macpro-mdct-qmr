export const styles = {
  global: {
    "body, p": {
      fontFamily: "Open Sans",
    },
    "focus:visited": {
      backgroundColor: "transparent",
    },
    ":focus:not(:focus-visible)": {
      backgroundColor: "transparent",
      outline: "none !important",
    },
    ":focus-visible": {
      outline: "3px solid pink",
    },
  },
};
