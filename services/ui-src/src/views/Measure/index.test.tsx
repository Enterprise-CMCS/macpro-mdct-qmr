import { Measure } from "./index";
import { render } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

describe("Test measure.tsx", () => {
  test("Check that the measure renders", () => {
    const result = render(
      <RouterWrappedComp>
        <Measure />
      </RouterWrappedComp>
    );

    expect(result.getByTestId("measure")).toBeVisible();
  });
});
