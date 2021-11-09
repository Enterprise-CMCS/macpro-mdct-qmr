import Header from "components/Header";
import { render } from "@testing-library/react";

describe("Test Header.tsx", () => {
  test("Check the main element, with classname for the header, exists", () => {
    const mockFunction = () => {};
    const { getByTestId } = render(<Header handleLogout={mockFunction} />);

    expect(getByTestId("header")).toBeVisible();
  });
});
