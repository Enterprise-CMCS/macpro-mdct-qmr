import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useApiMock } from "utils/testUtils/useApiMock";
import { AdminBannerView } from "../index";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { CoreSetAbbr } from "types";
expect.extend(toHaveNoViolations);

const testComponent = <AdminBannerView />;

const mockMutate = jest.fn((_variables: CoreSetAbbr, options?: any) => {
  if (typeof options?.onSuccess === "function") return options.onSuccess();
});

const mockErrorMutate = jest.fn((_variables: CoreSetAbbr, options?: any) => {
  if (typeof options?.onSuccess === "function") return options.onError();
});

describe("Test AdminBannerView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const apiData: any = {
      useDeleteBannerValues: {
        mutate: mockMutate,
      },
      useWriteBannerValues: {
        mutate: mockMutate,
      },
    };
    useApiMock(apiData);
    render(testComponent);
  });
  test("Check basic page rendering", () => {
    expect(screen.getByText("Banner Admin")).toBeInTheDocument();
  });

  test("Test create banner", async () => {
    const titleTextbox = screen.getByRole("textbox", { name: "Title Text" });
    fireEvent.change(titleTextbox, { target: { value: "banner title" } });
    const descTextbox = screen.getByRole("textbox", {
      name: "Description text",
    });
    fireEvent.change(descTextbox, { target: { value: "banner desc" } });

    const startDateTextbox = screen.getByRole("textbox", {
      name: "Start Date",
    });
    fireEvent.change(startDateTextbox, { target: { value: "01/01/2025" } });

    const endDateTextbox = screen.getByRole("textbox", { name: "End Date" });
    fireEvent.change(endDateTextbox, { target: { value: "12/01/2026" } });

    const createBtn = screen.getByText("Replace Current Banner");
    fireEvent.click(createBtn);
    await waitFor(() => expect(mockMutate).toHaveBeenCalled());
  });

  test("Test delete banner", async () => {
    const deleteBtn = screen.getByRole("button", {
      name: "Delete Current Banner",
    });
    fireEvent.click(deleteBtn);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });
});

describe("Test AdminBannerView errors", () => {
  beforeEach(() => {
    const apiData: any = {
      useDeleteBannerValues: {
        mutate: mockErrorMutate,
      },
      useWriteBannerValues: {
        mutate: mockErrorMutate,
      },
    };
    useApiMock(apiData);
    render(testComponent);
  });
  test("Test submit error", async () => {
    const titleTextbox = screen.getByRole("textbox", { name: "Title Text" });
    fireEvent.change(titleTextbox, { target: { value: "banner title" } });
    const descTextbox = screen.getByRole("textbox", {
      name: "Description text",
    });
    fireEvent.change(descTextbox, { target: { value: "banner desc" } });

    const startDateTextbox = screen.getByRole("textbox", {
      name: "Start Date",
    });
    fireEvent.change(startDateTextbox, { target: { value: "01/01/2025" } });

    const endDateTextbox = screen.getByRole("textbox", { name: "End Date" });
    fireEvent.change(endDateTextbox, { target: { value: "12/01/2026" } });

    const createBtn = screen.getByText("Replace Current Banner");
    fireEvent.click(createBtn);
    await waitFor(() => expect(mockErrorMutate).toHaveBeenCalled());
  });
  test("test delete error", () => {
    const deleteBtn = screen.getByRole("button", {
      name: "Delete Current Banner",
    });
    fireEvent.click(deleteBtn);
    expect(mockErrorMutate).toHaveBeenCalled();
  });
});

describe("Test AdminBannerView accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    useApiMock({});
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
