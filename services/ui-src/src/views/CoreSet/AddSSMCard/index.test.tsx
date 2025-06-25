import { AddSSMCard } from ".";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import userEvent from "@testing-library/user-event";

jest.mock("hooks/authHooks", () => ({
  __esModule: true,
  useUser: jest.fn(),
}));

describe("AddSSMCard", () => {
  describe("renders the component", () => {
    beforeEach(() => {
      render(
        <RouterWrappedComp>
          <AddSSMCard
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
      const btn = screen.getByText("Test button text");
      expect(btn).toBeInTheDocument();
      userEvent.click(btn);
      expect(global.window.location.pathname).toContain("/test-link");
    });

    it("creates the correct testId", () => {
      expect(screen.getByText("Test button text")).toBeVisible();
      expect(screen.getByText("Test button text")).toHaveAttribute(
        "data-cy",
        "test-link-button"
      );
    });
  });

  describe("enabled state", () => {
    it("enables the button properly", () => {
      render(
        <RouterWrappedComp>
          <AddSSMCard
            enabled={true}
            buttonText="Test button text"
            title="Test title"
            to="/test-link"
          />
        </RouterWrappedComp>
      );

      expect(screen.getByText(/Test button text/i)).toBeEnabled();
    });
  });
});
