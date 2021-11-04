import React from "react";
import LoaderButton from "components/LoaderButton";
import { render } from "@testing-library/react";

describe("Test LoaderButton.js", () => {
  test("Check the main element, with classname LoaderButton, exists", () => {
    const { getByTestId } = render(<LoaderButton isLoading={true} type="submit" disabled={false} />);

    expect(getByTestId("LoaderButton")).toBeVisible();
  });
});
