import { AddCard } from ".";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

describe("AddCard", () => {
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
});
