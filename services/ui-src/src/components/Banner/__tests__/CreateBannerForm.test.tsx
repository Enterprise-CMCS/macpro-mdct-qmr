import { render, screen } from "@testing-library/react";

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
    //TODO data-testid would make this cleaner but isn't getting passed
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
