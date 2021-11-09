import { render } from "@testing-library/react";
import Header from "components/Header";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValueOnce({ isAuthenticated: true }),
}));

describe("Test Header.tsx", () => {
  test("Check that the header exists", () => {
    const { getByTestId } = render(<Header handleLogout={() => {}} />);

    expect(getByTestId("header")).toBeVisible();
  });
});
