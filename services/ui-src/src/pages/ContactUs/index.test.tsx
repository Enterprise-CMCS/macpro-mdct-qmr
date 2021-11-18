import { ContactUs } from "./index";
import { render } from "@testing-library/react";

describe("Test ContactUs.tsx", () => {
  test("Check that the contact us renders", () => {
    const { getByTestId } = render(<ContactUs />);

    expect(getByTestId("contact-us")).toBeVisible();
  });
});
