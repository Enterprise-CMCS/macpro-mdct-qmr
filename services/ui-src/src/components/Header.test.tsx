import { render } from "@testing-library/react";
import Header from "./Header";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValueOnce({ isAuthenticated: true }),
}));

describe("Test Header.tsx", () => {
  test("Check the main element, with classname for the footer, exists", () => {
    const { getByTestId } = render(<Header handleLogout={() => {}} />);

    expect(getByTestId("header")).toBeVisible();
  });
});
