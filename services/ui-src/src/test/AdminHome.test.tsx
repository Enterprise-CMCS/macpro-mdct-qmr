import AdminHome from "containers/AdminHome";
import { render } from "@testing-library/react";

describe("Test Admin Home.tsx", () => {
  test("Check that the admin home renders", () => {
    const { getByTestId } = render(<AdminHome />);

    expect(getByTestId("admin-home")).toBeVisible();
  });
});
