import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { useApiMock } from "utils/testUtils/useApiMock";
import { RouterWrappedComp } from "utils/testing";
import { CombinedRatesPage } from "views";
expect.extend(toHaveNoViolations);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2024",
    state: "OH",
  }),
}));

const useGetMeasuresValues = {
  isLoading: false,
  error: undefined,
  isError: undefined,
  data: {
    Items: [
      {
        autoCompleted: false,
        coreSet: "ACS",
        createdAt: 1642167976771,
        lastAltered: 1642167976771,
        compoundKey: "AL2024ACSIET-AD",
        measure: "IET-AD",
        description:
          "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
        state: "AL",
        status: "incomplete",
        year: 2024,
      },
      {
        autoCompleted: false,
        coreSet: "ACS",
        createdAt: 1642167976771,
        lastAltered: 1642167976771,
        compoundKey: "AL2024ACSAAB-AD",
        measure: "AAB-AD",
        description:
          "Avoidance of Antibiotic Treatment for Acute Bronchitis/Bronchiolitis: Ages 3 Months to 17 Years",
        state: "AL",
        status: "incomplete",
        year: 2024,
      },
    ],
  },
};

describe("Test Combined Rates Page", () => {
  beforeEach(() => {
    const apiData = { useGetMeasuresValues: useGetMeasuresValues };
    useApiMock(apiData);
    render(
      <RouterWrappedComp>
        <CombinedRatesPage />
      </RouterWrappedComp>
    );
  });
  it("renders", () => {
    expect(screen.getByText("Core Set Measures Combined Rates")).toBeVisible();
    //check that tabs are on the page
    expect(screen.getByText("Child Core Set"));
    expect(screen.getByText("Adult Core Set"));
  });
  it("check table of tabs has mock data", () => {
    //it will exist twice as the same data is populated in the table for both child and adult
    expect(
      screen.getAllByText(useGetMeasuresValues.data.Items[0].measure)
    ).toHaveLength(2);
    expect(
      screen.getAllByText(useGetMeasuresValues.data.Items[0].description)
    ).toHaveLength(2);
  });
  it("check tabs functionality", () => {
    const childTab = screen.getByText("Child Core Set");
    fireEvent.click(childTab);
    expect(childTab).toHaveAttribute("aria-selected", "true");

    const adultTab = screen.getByText("Adult Core Set");
    fireEvent.click(adultTab);
    expect(adultTab).toHaveAttribute("aria-selected", "true");
  });
});

describe("Test accessibility", () => {
  it("passes a11y tests", async () => {
    const apiData = {};
    useApiMock(apiData);
    const { container } = render(
      <RouterWrappedComp>
        <CombinedRatesPage />
      </RouterWrappedComp>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
