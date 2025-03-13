import { Home } from "./index";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
expect.extend(toHaveNoViolations);

const component = (
  <RouterWrappedComp>
    <Home />
  </RouterWrappedComp>
);

describe("Test Home.tsx", () => {
  test("Check that the Home renders with no state user", () => {
    render(component);
    const homeContainer = screen.getByTestId("Home-Container");
    expect(homeContainer).toBeVisible();
  });

  test("should pass a11y tests for no user page", async () => {
    await act(async () => {
      const { container } = render(component);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
