import { fireEvent, render, screen } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { useApiMock } from "utils/testUtils/useApiMock";
import { BrowserRouter as Router } from "react-router-dom";
import { CombinedRatesPage } from "views";
import { measureDescriptions } from "measures/measureDescriptions";

expect.extend(toHaveNoViolations);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({
    year: "2024",
    state: "AL",
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
        description: measureDescriptions[2024]["IET-AD"],
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
        description: measureDescriptions[2024]["AAB-AD"],
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
      <Router>
        <CombinedRatesPage />
      </Router>
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
      <Router>
        <CombinedRatesPage />
      </Router>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
