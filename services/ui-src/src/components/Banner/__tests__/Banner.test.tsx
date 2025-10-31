import { render, screen } from "@testing-library/react";
import { BannerData } from "types";
import { Banner } from "../Banner";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";

expect.extend(toHaveNoViolations);

const bannerData: BannerData = {
  title: "Banner Title",
  description: "Banner Description",
};

const testComponent = <Banner bannerData={bannerData} />;

describe("Test Banner Item", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Banner is visible", () => {
    expect(screen.getByText(bannerData.title)).toBeInTheDocument();
    expect(screen.getByText(bannerData.description)).toBeInTheDocument();
  });
});

describe("Test Banner accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
