import { render, screen, within } from "@testing-library/react";

import { CreateBannerForm } from "../CreateBannerForm";

const onErrorHandler = jest.fn();

const testComponent = (
  <CreateBannerForm onError={onErrorHandler} data-testid="test-banner" />
);

describe("Test Banner Item", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Create Banner Form is visible", () => {
    let element = screen.getByTestId("test-banner");
    expect(within(element).getByText("Title text")).toBeInTheDocument();
    expect(within(element).getByText("Description text")).toBeInTheDocument();
    expect(within(element).getByText("Link")).toBeInTheDocument();
    expect(within(element).getByText("Start Date")).toBeInTheDocument();
    expect(within(element).getByText("End Date")).toBeInTheDocument();
    expect(
      within(element).getByText("Replace Current Banner")
    ).toBeInTheDocument();
    expect(within(element).getByText("New banner title")).toBeInTheDocument();
    expect(
      within(element).getByText("New banner description")
    ).toBeInTheDocument();
  });
});
