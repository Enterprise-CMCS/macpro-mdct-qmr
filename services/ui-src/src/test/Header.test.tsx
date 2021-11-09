import { shallow } from "enzyme";
import Header from "components/Header";
import { UsaBanner } from "@cmsgov/design-system";
import QMRLogo from "components/QMRLogo";
import * as Bootstrap from "react-bootstrap";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValueOnce({ isAuthenticated: true }),
}));

describe("Test Header.tsx", () => {
  const wrapper = shallow(<Header handleLogout={() => {}} />);

  test("Check that the header exists", () => {
    expect(wrapper.find({ "data-testid": "header" }).length).toBe(1);
  });

  test("Check that header is rendering its children", () => {
    expect(wrapper.find(UsaBanner).length).toBe(1);
    expect(wrapper.find(QMRLogo).length).toBe(1);
    expect(wrapper.find(Bootstrap.Navbar).length).toBe(1);
    expect(wrapper.find(Bootstrap.NavDropdown).length).toBe(1);
    expect(wrapper.find({ title: "My Account" }).length).toBe(1);
  });
});
