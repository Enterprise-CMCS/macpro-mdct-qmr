import { render, screen } from "@testing-library/react";
import { CreateBanner } from "../CreateBanner";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

const sx = {
  sectionHeader: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};
const onSubmitHandler = jest.fn();
const onErrorHandler = jest.fn();
const testComponent = (
  <CreateBanner sx={sx} onSubmit={onSubmitHandler} onError={onErrorHandler} />
);

describe("Test CreateBanner", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Create Banner is visible", () => {
    expect(screen.getByText("Create a New Banner")).toBeInTheDocument();
  });
});

describe("Test CreateBanner accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
