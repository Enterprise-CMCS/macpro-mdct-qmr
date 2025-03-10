import { configureAxe } from "jest-axe";

const axe = configureAxe({
  runOnly: [
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22aa",
    "best-practice",
  ],
});

export default axe;
