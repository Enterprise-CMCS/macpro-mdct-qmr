import { Accordion } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@chakra-ui/react";

const accordionComponent = (
  <Accordion
    label="mock accordion"
    externalControlled
    children={
      <Accordion
        label="mock child accordion"
        children={"mock content"}
        externalControlled
      />
    }
  />
);

describe("Test Accordion Component", () => {
  describe("Test Basic Accordion", () => {
    beforeEach(() => {
      renderWithHookForm(accordionComponent);
    });
    it("Accordion is rendered", () => {
      expect(screen.getByText("mock accordion")).toBeVisible();
      expect(screen.getByText("mock child accordion")).not.toBeVisible();
      expect(screen.getByText("mock child accordion")).toBeInTheDocument();
      expect(screen.getByText("mock content")).not.toBeVisible();
      expect(screen.getByText("mock content")).toBeInTheDocument();
    });

    it("Accordion is clickable", async () => {
      expect(screen.getByText("mock child accordion")).not.toBeVisible();
      const accordionBtn = screen.getByRole("button", {
        name: "mock accordion",
      });
      userEvent.click(accordionBtn);

      const childAccordionBtn = screen.getByRole("button", {
        name: "mock child accordion",
      });
      await waitFor(() => expect(childAccordionBtn).toBeVisible());
    });
  });
  it("Accordion expand/collapse all", async () => {
    renderWithHookForm(
      <>
        <Button>Expand all</Button>
        <Button>Collapse all</Button>
        {accordionComponent}
      </>
    );

    const expandBtn = screen.getByRole("button", { name: "Expand all" });
    const collapseBtn = screen.getByRole("button", { name: "Collapse all" });

    expect(screen.getByText("mock child accordion")).not.toBeVisible();
    userEvent.click(expandBtn);
    await waitFor(() =>
      expect(screen.getByText("mock child accordion")).toBeVisible()
    );
    expect(screen.getByText("mock content")).toBeVisible();

    userEvent.click(collapseBtn);
    await waitFor(() =>
      expect(screen.getByText("mock child accordion")).not.toBeVisible()
    );
    expect(screen.getByText("mock content")).not.toBeVisible();
  });
  it("Accordion is auto-expanded by default", async () => {
    renderWithHookForm(
      <Accordion
        label="mock accordion"
        overrideExpand
        children={
          <Accordion
            label="mock child accordion"
            children={"mock content"}
            overrideExpand
          />
        }
      />
    );

    expect(screen.getByText("mock accordion")).toBeVisible();
    await waitFor(() =>
      expect(screen.getByText("mock child accordion")).toBeVisible()
    );
    expect(screen.getByText("mock content")).toBeVisible();
  });
});
