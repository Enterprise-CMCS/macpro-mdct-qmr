import { render } from "@testing-library/react";
import Header from "components/Header";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValueOnce({ isAuthenticated: true }),
}));

describe("Test Header.tsx", () => {
  const screen = render(<Header handleLogout={() => {}} />);

  test("Check that the header exists", () => {
    expect(screen.getByText("My Account")).toBeVisible();
  });
});
