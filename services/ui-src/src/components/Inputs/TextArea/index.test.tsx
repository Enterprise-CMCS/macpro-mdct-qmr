// if a value prop is passed in, that value should exist in the ui

// expect component to render

import { render } from "@testing-library/react";
import { TextArea } from "components/Inputs/TextArea";

describe("Test Admin Home.tsx", () => {
  test("Check that the admin home renders", () => {
    const { getByText } = render(
      <TextArea value="Helleeeer Boys" onChange={(e) => console.log(e)} />
    );

    expect(getByText("Helleeeer Boys")).toBeVisible();
  });
});
