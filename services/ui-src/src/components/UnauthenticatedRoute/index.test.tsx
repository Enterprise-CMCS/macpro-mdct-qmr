import { UnauthenticatedRoute, querystring } from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";

jest.mock("libs/contextLib", () => {
  return {
    useAppContext: jest.fn().mockImplementation(() => {
      return { isAuthenticated: false };
    }),
  };
});

afterEach(cleanup);
jest.mock("libs/contextLib", () => {
  return {
    useAppContext: jest.fn().mockImplementation(() => {
      return { isAuthenticated: false };
    }),
  };
});

describe("Test Unauthenticated Route", () => {
  test("Child component should render if not authorized", () => {
    const { getByTestId } = render(
      <Router>
        <UnauthenticatedRoute>
          <p data-testid="unauthenticated-content">
            This is an unauthenticated route
          </p>
        </UnauthenticatedRoute>
      </Router>
    );
    expect(getByTestId("unauthenticated-content")).toBeInTheDocument();
  });
});

describe("Test Local querystring Util Function", () => {
  test("should return null if regex returns false", () => {
    const results = querystring("redirect", "mdctqmr.cms.gov");
    expect(results).toEqual(null);
  });

  test("should return empty string if query is empty", () => {
    const results = querystring(
      "redirect",
      "mdctqmr.cms.gov?redirect=&something=else"
    );
    expect(results).toEqual("");
  });
  test("should return query string if included in url", () => {
    const results = querystring(
      "redirect",
      "mdctqmr.cms.gov?redirect=hello-world"
    );
    expect(results).toEqual("hello-world");
  });
});
