import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithHookForm } from "utils";
import {
  AddAnotherSection,
  AddAnotherSectionAccordian,
} from "./additionalCategory";

describe("Test AddAnotherSection Component", () => {
  beforeEach(() => {
    renderWithHookForm(
      <AddAnotherSection name={"mock-section"} parentName={"mock section"} />
    );
  });
  it("Add another section", () => {
    const addBtn = screen.getByRole("button", {
      name: "+ Add Another mock section",
    });
    expect(
      screen.queryByText("Define the Additional mock section")
    ).not.toBeInTheDocument();
    fireEvent.click(addBtn);
    expect(
      screen.getByText("Define the Additional mock section")
    ).toBeVisible();
  });
  it("Delete another section", () => {
    fireEvent.click(
      screen.getByRole("button", {
        name: "+ Add Another mock section",
      })
    );
    expect(
      screen.getByText("Define the Additional mock section")
    ).toBeVisible();

    const deleteBtn = screen.getByRole("button", { name: "Delete Field" });
    fireEvent.click(deleteBtn);
    expect(
      screen.queryByText("Define the Additional mock section")
    ).not.toBeInTheDocument();
  });
});

describe("Test AddAnotherSectionAccordian Component", () => {
  beforeEach(() => {
    renderWithHookForm(
      <AddAnotherSectionAccordian
        name={"mock-section"}
        parentName={"mock section"}
      />
    );
  });
  it("Add another section", async () => {
    const accordion = screen.getByRole("button", {
      name: "Add another mock section",
    });
    fireEvent.click(accordion);
    const addBtn = screen.getByRole("button", {
      name: "+ Add Another mock section",
    });
    expect(
      screen.queryByText("Additional mock section")
    ).not.toBeInTheDocument();
    fireEvent.click(addBtn);
    await waitFor(() => {
      expect(
        screen.getByRole("textbox", {
          name: "mock-section.additionalSelections.0.description",
        })
      ).toBeVisible();
    });
  });
  it("Delete another section", async () => {
    fireEvent.click(
      screen.getByRole("button", {
        name: "Add another mock section",
      })
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "+ Add Another mock section",
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole("textbox", {
          name: "mock-section.additionalSelections.0.description",
        })
      ).toBeVisible();
    });

    const deleteBtn = screen.getByRole("button", { name: "Delete Field" });
    fireEvent.click(deleteBtn);
    expect(
      screen.queryByRole("textbox", {
        name: "mock-section.additionalSelections.0.description",
      })
    ).not.toBeInTheDocument();
  });
});
