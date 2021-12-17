import { LoaderButton } from "./index";
import { render, screen } from "@testing-library/react";

describe("Test LoaderButton.js", () => {
  test("Check the main element, with classname LoaderButton, exists", () => {
    render(<LoaderButton children={<>LoaderButton</>} isLoading />);
    expect(screen.getByText("LoaderButton")).toBeVisible();
  });
});
