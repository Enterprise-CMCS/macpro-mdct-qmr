import { render } from "@testing-library/react";
import { Header } from "components";
import { RouterWrappedComp } from "utils/testing";

//From Jest Documentation https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("Test Header.tsx", () => {
  const screen = render(
    <RouterWrappedComp>
      <Header handleLogout={() => {}} />
    </RouterWrappedComp>
  );

  test("Check that the header exists", () => {
    expect(screen.getByText("Logout")).toBeVisible();
  });
});
