import { render, screen, within } from "@testing-library/react";

import { CreateBanner } from "../CreateBanner";

const sx = {
  sectionHeader: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};
const onSubmitHandler = jest.fn();
const onErrorHandler = jest.fn();
const testComponent = (
  <CreateBanner
    sx={sx}
    onSubmit={onSubmitHandler}
    onError={onErrorHandler}
    data-testid="test-banner"
  />
);

describe("Test Banner Item", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Create Banner is visible", () => {
    let element = screen.getByTestId("test-banner");
    expect(
      within(element).getByText("Create a New Banner")
    ).toBeInTheDocument();
  });
});
