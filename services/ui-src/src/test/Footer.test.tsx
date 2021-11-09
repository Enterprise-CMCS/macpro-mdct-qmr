import Footer from "components/Footer";
import { render } from "@testing-library/react";

describe("Test Footer.tsx", () => {
  test("Check the main element, with classname for the footer, exists", () => {
    const { getByTestId } = render(<Footer />);

    expect(getByTestId("footer")).toBeVisible();
  });
});
