import { UserManagement } from "./index";
import { render } from "@testing-library/react";

describe("Test UserManagement.tsx", () => {
  test("Check that UserManagement renders", () => {
    const { getByTestId } = render(<UserManagement />);

    expect(getByTestId("user-management")).toBeVisible();
  });
});
