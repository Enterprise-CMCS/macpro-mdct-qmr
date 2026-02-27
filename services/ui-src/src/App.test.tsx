import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { screen, render } from "@testing-library/react";
import App from "App";
import { useUser } from "hooks/authHooks";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({}),
}));

jest.mock("utils", () => ({
  ...jest.requireActual("utils"),
  fireTealiumPageView: jest.fn(),
}));

jest.mock("react-helmet-async", () => {
  const React = require("react");
  const mockHelmet = ({ children, ...props }: { children: JSX.Element }) =>
    React.createElement(
      "div",
      {
        ...props,
        className: "mock-helmet",
      },
      children
    );
  return {
    HelmetProvider: jest.fn().mockImplementation(mockHelmet),
  };
});

window.scrollTo = jest.fn();

describe("Test App", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("Show login when user is undefined", () => {
    mockUseUser.mockImplementation(() => {
      return {
        user: undefined,
        showLocalLogins: true,
      };
    });
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText("Quality Measure Reporting")).toBeVisible();
    expect(screen.getByText("Log In with IDM")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Login with Cognito" })
    ).toBeVisible();
  });
  it("Show dashboard when user is logged in", () => {
    mockUseUser.mockImplementation(() => {
      return {
        user: {},
      };
    });
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    );

    expect(
      screen.getByText("An official website of the United States government")
    ).toBeVisible();
  });
});
