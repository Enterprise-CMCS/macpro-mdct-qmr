// Chakra UI theme info: https://chakra-ui.com/docs/styled-system/theming/theme
import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import { styles } from "./styles";

// Foundational style overrides
import { foundations } from "./foundations";

// Component style overrides
import { components } from "./components";

export const theme = extendTheme({
  ...foundations,
  components,
  styles,
});

export default theme;
