import { render } from "@testing-library/react";
import Header from "components/Header";
// import { UsaBanner } from "@cmsgov/design-system";
// import QMRLogo from "components/QMRLogo";
// import * as Bootstrap from "react-bootstrap";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValueOnce({ isAuthenticated: true }),
}));

describe("Test Header.tsx", () => {
  const screen = render(<Header handleLogout={() => {}} />);

  test("Check that the header exists", () => {
    expect(screen.getByText("My Account")).toBeVisible();
  });

  // test("Check that header is rendering its children", () => {
  //   expect(screen.find(UsaBanner).length).toBe(1);
  //   expect(screen.find(QMRLogo).length).toBe(1);
  //   expect(screen.find(Bootstrap.Navbar).length).toBe(1);
  //   expect(screen.find(Bootstrap.NavDropdown).length).toBe(1);
  //   expect(screen.find({ title: "My Account" }).length).toBe(1);
  // });
});
