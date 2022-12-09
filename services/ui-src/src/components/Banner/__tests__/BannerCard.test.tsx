import { render, screen } from "@testing-library/react";
import { BannerData } from "types";
import { BannerCard } from "../BannerCard";
import { useGetBanner } from "hooks/api";

const apiData: any = {};
const bannerData: BannerData = {
  title: "Banner Title",
  description: "Banner Description",
};

const renderTestComponent = () => {
  (useGetBanner as jest.Mock).mockReturnValue({
    ...apiData.useGetBannerValues,
  });
  render(<BannerCard data-testid="test-banner-card" />);
};

describe("Test BannerCard", () => {
  beforeEach(() => {
    apiData.useGetBannerValues = {
      data: {
        Item: { bannerData },
      },
      isLoading: false,
      refetch: jest.fn(),
      isError: false,
      error: undefined,
    };
    renderTestComponent();
  });
  it.skip("Check that a Banner Card can be rendered", () => {
    //TODO Figure out how to mock mutations
    expect(screen.getByTestId("test-banner-card")).toBeVisible();
  });
});
