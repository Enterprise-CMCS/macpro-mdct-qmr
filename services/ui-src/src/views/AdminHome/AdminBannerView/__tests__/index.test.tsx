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
    render(testComponent);
    expect(screen.getByText("Banner Admin")).toBeInTheDocument();
  });
});

describe("Test AdminBannerView accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
