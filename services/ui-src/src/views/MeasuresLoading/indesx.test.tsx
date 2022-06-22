import { MeasuresLoading } from "./index";
import { render } from "@testing-library/react";

describe("Test NotFound.tsx", () => {
  test("Check that the NotFound renders", () => {
    const { getByTestId } = render(<MeasuresLoading />);

    expect(getByTestId("loading-measure")).toBeVisible();
  });
});
