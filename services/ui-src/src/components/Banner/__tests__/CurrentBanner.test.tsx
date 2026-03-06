import { render, screen } from "@testing-library/react";
import { BannerData } from "types";
import { CurrentBanner } from "../CurrentBanner";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { convertDateUtcToEt } from "utils";
expect.extend(toHaveNoViolations);

const dayInMS = 1000 * 60 * 60 * 24;

const testComponent = (bannerData: BannerData | undefined) => (
  <CurrentBanner
    bannerData={bannerData}
    sx={{ sx: {} }}
    onDelete={jest.fn()}
    onError={jest.fn()}
  />
);

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    getValues: jest.fn().mockReturnValue({
      bannerTitle: "Banner Title",
      bannerDescription: "Banner Description",
      bannerLink: "",
    }),
  }),
}));

describe("Test Current Banner", () => {
  test("Current Banner is visible and active", () => {
    const bannerData: BannerData = {
      title: "Banner Title",
      description: "Banner Description",
      startDate: Date.now() - dayInMS,
      endDate: Date.now() + dayInMS,
    };

    render(testComponent(bannerData));
    expect(screen.getByText(bannerData.title)).toBeInTheDocument();
    expect(screen.getByText(bannerData.description)).toBeInTheDocument();
    expect(screen.getByText(convertDateUtcToEt(bannerData.startDate)));
    expect(screen.getByText(convertDateUtcToEt(bannerData.endDate)));
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Delete Current Banner")).toBeInTheDocument();
  });

  test("Current Banner is Visible and inactive", () => {
    const bannerData: BannerData = {
      title: "Banner Title",
      description: "Banner Description",
      startDate: Date.now() - dayInMS * 2,
      endDate: Date.now() - dayInMS,
    };

    render(testComponent(bannerData));

    expect(screen.getByText(bannerData.title)).toBeInTheDocument();
    expect(screen.getByText(bannerData.description)).toBeInTheDocument();
    expect(screen.getByText(convertDateUtcToEt(bannerData.startDate)));
    expect(screen.getByText(convertDateUtcToEt(bannerData.endDate)));
    expect(screen.getByText("Inactive")).toBeInTheDocument();
    expect(screen.getByText("Delete Current Banner")).toBeInTheDocument();
  });

  test("No Current Banner", () => {
    render(testComponent(undefined));
    expect(screen.getByText("There is no current banner")).toBeInTheDocument();
  });
});

describe("Test CurrentBanner accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const bannerData: BannerData = {
      title: "Banner Title",
      description: "Banner Description",
      startDate: Date.now() - dayInMS,
      endDate: Date.now() + dayInMS,
    };

    const { container } = render(testComponent(bannerData));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
