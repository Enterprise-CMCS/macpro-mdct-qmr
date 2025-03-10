import { screen, waitFor, act } from "@testing-library/react";
import { createElement } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "components/MeasureWrapper";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import Measures from "measures";
import { Suspense } from "react";
import { MeasuresLoading } from "views";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { clearMocks } from "shared/util/validationsMock";

expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "SS-1-HH";
const coreSet = "HHCS";
const state = "CT";
const year = 2021;
const description = "test";
const apiData: any = {};

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

describe(`Test FFY ${year} ${measureAbbr}`, () => {
  let component: JSX.Element;
  beforeEach(() => {
    clearMocks();
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
    expect(screen.queryByText("Data Source")).toBeInTheDocument();
    expect(screen.queryByText("Date Range")).toBeInTheDocument();
    expect(
      screen.queryByText("Definition of Population Included in the Measure")
    ).toBeInTheDocument();
    expect(screen.queryByText("Performance Measure")).toBeInTheDocument();
  });

  it("should pass a11y tests", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    await act(async () => {
      const results = await axe(screen.getByTestId("measure-wrapper-form"));
      expect(results).toHaveNoViolations();
    });
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
