import { render, screen, fireEvent } from "@testing-library/react";

import { CreateBannerForm } from "../CreateBannerForm";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
expect.extend(toHaveNoViolations);

const onErrorHandler = jest.fn();
const onSubmitHandler = jest.fn();
const writeBanner = jest.fn();

const testComponent = (
  <CreateBannerForm
    onError={onErrorHandler}
    onSubmit={onSubmitHandler}
    writeAdminBanner={writeBanner}
  />
);

describe("Test Create Banner Form", () => {
  test("Create Banner Form is visible", () => {
    render(testComponent);
    expect(screen.getByLabelText("Title text", { exact: false })).toBeVisible();
    expect(
      screen.getByPlaceholderText("New banner title", { exact: false })
    ).toBeVisible();
    expect(
      screen.getByLabelText("Description text", { exact: false })
    ).toBeVisible();
    expect(screen.getByLabelText("Link", { exact: false })).toBeVisible();
    expect(screen.getByLabelText("Start Date", { exact: false })).toBeVisible();
    expect(screen.getByLabelText("End Date", { exact: false })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Replace Current Banner" })
    ).toBeVisible();
    expect(screen.getByText("New banner title")).toBeVisible();
    expect(screen.getByText("New banner description")).toBeVisible();
  });

  //Skipping this test, need to resolve the mocking of forms in this component.
  test.skip("Valid Form input", () => {
    render(testComponent);
    const titleInput = screen.getByLabelText("Title text", { exact: false });
    expect(screen.queryByText("Test Banner")).toBeNull();
    fireEvent.change(titleInput, { target: { value: "Test Banner" } });
    expect(screen.getByText("Test Banner")).toBeVisible();

    const descriptionInput = screen.getByLabelText("Description text", {
      exact: false,
    });
    expect(screen.queryByText("Test Description")).toBeNull();
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    expect(screen.getByText("Test Description")).toBeVisible();

    const linkInput = screen.getByLabelText("Link", { exact: false });
    expect(screen.queryByText("http://mytest.com")).toBeNull();
    fireEvent.change(linkInput, { target: { value: "http://mytest.com" } });
    expect(screen.getByText("http://mytest.com")).toBeVisible();

    const startDateInput = screen.getByLabelText("Start Date", {
      exact: false,
    });
    expect(screen.queryByText("11232023")).toBeNull();
    fireEvent.change(startDateInput, { target: { value: "11232023" } });
    fireEvent.blur(startDateInput);
    expect(screen.getByText("Invalid Start Date")).toBeVisible();
    fireEvent.change(startDateInput, { target: { value: "11/23/2023" } });
    fireEvent.blur(startDateInput);
    expect(screen.queryByText("Invalid Start Date")).toBeNull();

    const endDateInput = screen.getByLabelText("End Date", { exact: false });
    expect(screen.queryByText("11232023")).toBeNull();
    fireEvent.change(endDateInput, { target: { value: "11232023" } });
    fireEvent.blur(endDateInput);
    expect(screen.getByText("Invalid End Date")).toBeVisible();
    fireEvent.change(endDateInput, { target: { value: "11/23/2023" } });
    fireEvent.blur(endDateInput);
    expect(screen.queryByText("Invalid End Date")).toBeNull();
  });
});

describe("Test CreateBannerForm accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
