import { screen, waitFor, act } from "@testing-library/react";
import { createElement, Suspense } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "components/MeasureWrapper";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import Measures from "measures";
import { MeasuresLoading } from "views";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { clearMocks } from "shared/util/validationsMock";
import { useParams } from "react-router-dom";

expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "SS-1-HH";
const coreSet = "HHCS";
const state = "CT";
const year = 2026;
const description = "test";
const apiData: any = {};

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));
const mockUseParams = useParams as jest.Mock;

describe(`Test FFY ${year} ${measureAbbr}`, () => {
  let component: JSX.Element;
  beforeEach(() => {
    clearMocks();

    mockUseParams.mockReturnValue({
      year: "2026",
      state: "CT",
      coreSetId: "HHCS",
      measureId: measureAbbr,
    });
    apiData.useGetMeasureValues = {
      data: {
        Item: {
          compoundKey: `${state}${year}${coreSet}${measureAbbr}`,
          coreSet,
          createdAt: 1642517935305,
          description,
          lastAltered: 1642517935305,
          lastAlteredBy: "undefined",
          measure: measureAbbr,
          state,
          status: "incomplete",
          year,
          data: {},
        },
      },
      isLoading: false,
      refetch: jest.fn(),
      isError: false,
      error: undefined,
    };

    mockUseUser.mockImplementation(() => {
      return { isStateUser: false };
    });

    const measure = createElement(Measures[year][measureAbbr]);
    component = (
      <Suspense fallback={MeasuresLoading()}>
        <RouterWrappedComp>
          <MeasureWrapper
            measure={measure}
            year={`${year}`}
            name={description}
            measureId={measureAbbr}
          />
        </RouterWrappedComp>
      </Suspense>
    );
  });

  it("should pass a11y tests", async () => {
    useApiMock(apiData);
    await act(async () => {
      const { container } = renderWithHookForm(component);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it("SS-1-HH measure should render", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("measure-wrapper-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(measureAbbr + " - " + description));
    });
  });

  it("Always shows What is the status of the data being reported? question", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    const firstQuestion = screen.getByText(
      "What is the status of the data being reported?"
    );
    expect(firstQuestion).toBeVisible();
  });

  it("shows corresponding questions if yes to reporting then ", async () => {
    apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByText("Status of Data Reported")).toBeInTheDocument();
    expect(screen.queryByText("Data Collection Method")).toBeInTheDocument();
    expect(screen.queryByText("Date Range")).toBeInTheDocument();
    expect(
      screen.queryByText("Definition of Population Included in the Measure")
    ).toBeInTheDocument();
    expect(screen.queryByText("Performance Measure")).toBeInTheDocument();
  });
});

const completedMeasureData = {
  PerformanceMeasure: {
    rates: {
      singleCategory: [
        {
          label: "Ages 19 to 50",
          rate: "100.0",
          numerator: "55",
          denominator: "55",
        },
        {
          label: "Ages 51 to 64",
          rate: "100.0",
          numerator: "55",
          denominator: "55",
        },
        {
          label: "Total",
          isTotal: true,
          rate: "100.0",
          numerator: "110",
          denominator: "110",
        },
      ],
    },
  },
  MeasurementSpecification: "NCQA/HEDIS",
  DidReport: "yes",
};
