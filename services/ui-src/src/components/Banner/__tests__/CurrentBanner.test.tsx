import { render, screen, within } from "@testing-library/react";
import { BannerData } from "types";
import { CurrentBanner } from "../CurrentBanner";

const bannerData: BannerData = {
  title: "Banner Title",
  description: "Banner Description",
  startDate: new Date().getTime(),
  endDate: new Date().getTime(),
};

const testComponent = (
  <CurrentBanner
    bannerData={bannerData}
    sx={{ sx: {} }}
    onDelete={jest.fn()}
    onError={jest.fn()}
    data-testid="test-current-banner"
  />
);

describe("Test Current Banner", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Current Banner is visible", () => {
    let element = screen.getByTestId("test-current-banner");
    expect(element).toBeVisible();
    expect(within(element).getByText(bannerData.title)).toBeInTheDocument();
    expect(
      within(element).getByText(bannerData.description)
    ).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
    expect(screen.getByText("Delete Current Banner")).toBeInTheDocument();
  });
});
