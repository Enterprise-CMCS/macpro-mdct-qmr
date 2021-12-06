import { CoreSet } from "./index";
import { render } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

describe("Test CoreSet.tsx", () => {
  test("Check that the contact us renders", () => {
    const { getByTestId } = render(
      <RouterWrappedComp>
        <CoreSet />
      </RouterWrappedComp>
    );

    expect(getByTestId("core-set")).toBeVisible();
  });
});
