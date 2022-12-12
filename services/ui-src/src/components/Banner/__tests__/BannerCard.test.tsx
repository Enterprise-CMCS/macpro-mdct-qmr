import { render, screen } from "@testing-library/react";
import { BannerData } from "types";
import { BannerCard } from "../BannerCard";
import { useGetBanner } from "hooks/api";
import { useApiMock } from "utils/testUtils/useApiMock";

const apiData: any = {};
const bannerData: BannerData = {
  title: "Banner Title",
  description: "Banner Description",
};

// jest.mock("hooks/api/useBanner", () => {
//   useGetBanner: {
//     mutate: jest.fn().mockReturnValue(bannerData);
//   }
// });

jest.mock("hooks/api/useBanner");
const mockedUseGetBanner = useGetBanner as jest.MockedFunction<
  typeof useGetBanner
>;

const renderTestComponent = () => {
  render(<BannerCard data-testid="test-banner-card" />);
};

describe("Test BannerCard", () => {
  beforeEach(() => {
    //useApiMock({...apiData.useGetBannerValues});
    mockedUseGetBanner.mockReturnValue();

    renderTestComponent();
  });
  test("Check that a Banner Card can be rendered", () => {
    //TODO Figure out how to mock mutations

    expect(screen.getByTestId("test-banner-card")).toBeVisible();
  });
});
