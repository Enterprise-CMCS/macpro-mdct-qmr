import { AddCard } from ".";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

jest.mock("hooks/authHooks", () => ({
  __esModule: true,
  useUser: jest.fn(),
}));

describe("AddCard", () => {
  describe("renders the component", () => {
    beforeEach(() => {
      render(
        <RouterWrappedComp>
          <AddCard
            buttonText="Test button text"
            title="Test title"
            to="/test-link"
          />
        </RouterWrappedComp>
      );
    });

    it("renders component properly with correct test text", () => {
      expect(screen.getByText(/Test title/i)).toBeInTheDocument();
      expect(screen.getByText(/Test button text/i)).toBeInTheDocument();
    });

    it("renders component properly with correct test link", () => {
      expect(
        screen.getByRole("link", { name: "Test button text" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Test button text" })
      ).toHaveAttribute("href", "/test-link");
    });

    it("creates the correct testId", () => {
      expect(screen.getByRole("button")).toBeVisible();
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-cy",
        "test-link-button"
      );
    });
  });

  describe("enabled state", () => {
    it("enables the button properly", () => {
      render(
        <RouterWrappedComp>
          <AddCard
            enabled={true}
            buttonText="Test button text"
            title="Test title"
            to="/test-link"
          />
        </RouterWrappedComp>
      );

      expect(screen.getByText(/Test button text/i)).toBeEnabled();
    });

    it("disables the button properly", () => {
      render(
        <RouterWrappedComp>
          <AddCard
            enabled={false}
            buttonText="Test button text"
            title="Test title"
            to="/test-link"
          />
        </RouterWrappedComp>
      );

      expect(screen.getByText(/Test button text/i)).toBeDisabled();
    });
  });
});
