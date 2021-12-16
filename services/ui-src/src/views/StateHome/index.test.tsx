import { StateHome } from "./index";
import { render } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

describe.skip("Test StateHome.tsx", () => {
  test("Check that the State home renders", () => {
    const { getByTestId } = render(
      <RouterWrappedComp>
        <StateHome />
      </RouterWrappedComp>
    );

    expect(getByTestId("state-home")).toBeInTheDocument();
  });
});
