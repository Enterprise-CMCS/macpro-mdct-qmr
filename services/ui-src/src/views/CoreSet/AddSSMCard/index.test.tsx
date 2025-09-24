import { AddSSMCard } from ".";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import userEvent from "@testing-library/user-event";

jest.mock("hooks/authHooks", () => ({
  __esModule: true,
  useUser: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("AddSSMCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });
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
      mockNavigate.mockReturnValueOnce("/test-link");
      const btn = screen.getByText("Test button text");
      expect(btn).toBeInTheDocument();
      userEvent.click(btn);
      expect(mockNavigate).toBeCalled();
      expect(mockNavigate).toHaveReturnedWith("/test-link");
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

    it("disables the button properly", () => {
      render(
        <RouterWrappedComp>
          <AddSSMCard
            enabled={false}
            buttonText="Test button text"
            title="Test title"
            to="/test-link"
          />
        </RouterWrappedComp>
      );

      //because this is a button masking itself as a link, it can't actually be disabled, so we need to check if useNavigate had ran instead.
      const btn = screen.getByText(/Test button text/i);
      userEvent.click(btn);
      expect(mockNavigate).toBeCalledTimes(0);
    });
  });
});
