import { render, screen, waitFor } from "@testing-library/react";
import { useApiMock } from "utils/testUtils/useApiMock";
import { AdminBannerView } from "../index";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import fireEvent from "@testing-library/user-event";
import { CoreSetAbbr } from "types";
expect.extend(toHaveNoViolations);

const testComponent = <AdminBannerView />;

const mockMutate = jest.fn((_variables: CoreSetAbbr, options?: any) => {
  if (typeof options?.onSuccess === "function") return options.onSuccess();
});

describe("Test AdminBannerView", () => {
  beforeEach(() => {
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
    fireEvent.type(titleTextbox, "banner title");
    // screen.debug(titleTextbox);
    const descTextbox = screen.getByRole("textbox", {
      name: "Description text",
    });
    fireEvent.type(descTextbox, "banner desc");

    const startDateTextbox = screen.getByRole("textbox", {
      name: "Start Date",
    });
    fireEvent.type(startDateTextbox, "01/01/2025");

    const endDateTextbox = screen.getByRole("textbox", { name: "End Date" });
    fireEvent.type(endDateTextbox, "12/01/2026");

    const createBtn = screen.getByText("Replace Current Banner");
    fireEvent.click(createBtn);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
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

describe("Test AdminBannerView accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    useApiMock({});
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
