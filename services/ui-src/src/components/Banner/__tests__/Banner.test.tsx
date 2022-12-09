import { render, screen, within } from "@testing-library/react";
import { BannerData } from "types";
import { Banner } from "../Banner";

const bannerData: BannerData = {
  title: "Banner Title",
  description: "Banner Description",
};

const testComponent = (
  <Banner bannerData={bannerData} data-testid="test-banner" />
);

describe("Test Banner Item", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Banner is visible", () => {
    let element = screen.getByTestId("test-banner");
    expect(element).toBeVisible();
    expect(within(element).getByText(bannerData.title)).toBeInTheDocument();
    expect(
      within(element).getByText(bannerData.description)
    ).toBeInTheDocument();
  });
});
