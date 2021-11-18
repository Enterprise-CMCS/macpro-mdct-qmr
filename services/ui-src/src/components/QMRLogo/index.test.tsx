import QMRLogo from "components/QMRLogo";
import { render } from "@testing-library/react";

describe("Test QMRLogo.tsx", () => {
  test("Check that the QMRLogo renders", () => {
    const { getByTestId } = render(<QMRLogo />);

    expect(getByTestId("qmr-logo")).toBeVisible();
  });
});
