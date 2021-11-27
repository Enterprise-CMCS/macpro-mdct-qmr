import { Home } from "./index";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("Test Home.tsx", () => {
  test("Check that the Home renders", () => {
    const result = render(
      <Router>
        <Home />
      </Router>
    );

    const homeContainer = result.getByTestId("Home-Container");
    const landerDiv = result.getByTestId("lander");
    expect(homeContainer).toBeVisible();
    expect(landerDiv).toBeVisible();
  });
});
