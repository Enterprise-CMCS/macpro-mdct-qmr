import { render, screen } from "@testing-library/react";
import { useApiMock } from "utils/testUtils/useApiMock";
import { AdminBannerView } from "../index";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

const testComponent = <AdminBannerView />;

beforeEach(() => {
  useApiMock({});
});

describe("Test AdminBannerView", () => {
  test("Check basic page rendering", () => {
    screen.debug();
    render(testComponent);
    // expect(
    //   screen.getByRole("button", { name: "Go To State Home" })
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByRole("heading", { name: "Banner Admin" })
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByRole("button", { name: "Banner Editor" })
    // ).toBeInTheDocument();
  });
});

describe("Test AdminBannerView accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
