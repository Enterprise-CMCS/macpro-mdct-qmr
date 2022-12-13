import { render, screen } from "@testing-library/react";

import { CreateBannerForm } from "../CreateBannerForm";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

const onErrorHandler = jest.fn();

const testComponent = (
  <CreateBannerForm onError={onErrorHandler} data-testid="test-banner" />
);

describe("Test Create Banner Form", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Create Banner Form is visible", () => {
    expect(screen.getByText("Title text")).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Replace Current Banner")).toBeInTheDocument();
    expect(screen.getByText("New banner title")).toBeInTheDocument();
    expect(screen.getByText("New banner description")).toBeInTheDocument();
  });
});

describe("Test CreateBannerForm accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
