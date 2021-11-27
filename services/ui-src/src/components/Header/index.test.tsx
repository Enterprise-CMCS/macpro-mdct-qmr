import { render } from "@testing-library/react";
import { Header } from "components";

describe("Test Header.tsx", () => {
  const screen = render(<Header handleLogout={() => {}} />);

  test("Check that the header exists", () => {
    expect(screen.getByText("My Account")).toBeVisible();
  });
});
