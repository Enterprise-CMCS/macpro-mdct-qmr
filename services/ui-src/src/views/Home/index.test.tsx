import { Home } from "./index";
import { render } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

describe("Test Home.tsx", () => {
  test("Check that the Home renders", () => {
    const result = render(
      <RouterWrappedComp>
        <Home user={undefined} />
      </RouterWrappedComp>
    );

    const homeContainer = result.getByTestId("Home-Container");
    expect(homeContainer).toBeVisible();
  });
});
