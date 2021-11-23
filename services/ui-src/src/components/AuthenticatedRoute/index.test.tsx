import { AuthenticatedRoute, userAttributeSelector } from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
    search: "nothing",
  }),
  Route: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("react-redux", () => {
  const ActualReactRedux = jest.requireActual("react-redux");
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return true;
    }),
  };
});

afterEach(cleanup);

describe("Test Authenticated Route", () => {
  test("Child component should render if authorized", () => {
    const { getByTestId } = render(
      <Router>
        <AuthenticatedRoute exact path="/test">
          <p data-testid="authenticated-content">
            This is an authenticated route
          </p>
        </AuthenticatedRoute>
      </Router>
    );
    expect(getByTestId("authenticated-content")).toBeInTheDocument();
  });
});

describe("Test UserAttribute Selector", () => {
  test("Should return correct attribute", () => {
    const mockUserAttrinutes = userAttributeSelector({
      user: { attributes: "isMemberOfTest" },
    });
    expect(mockUserAttrinutes).toEqual("isMemberOfTest");
  });
});
