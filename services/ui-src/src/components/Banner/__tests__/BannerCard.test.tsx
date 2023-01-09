import { render, screen } from "@testing-library/react";
import { BannerCard } from "../BannerCard";
import { useApiMock, defaultMockValues } from "utils/testUtils/useApiMock";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

const testComponent = <BannerCard />;

beforeEach(() => {
  useApiMock({});
});
describe("Test BannerCard", () => {
  test("Check that a Banner Card can be rendered", () => {
    render(testComponent);
    expect(
      screen.getByText(defaultMockValues.useGetBannerValues.data.title)
    ).toBeVisible();
    expect(
      screen.getByText(defaultMockValues.useGetBannerValues.data.description)
    ).toBeVisible();
  });
});

describe("Test BannerCard accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
