import { screen, waitFor, act } from "@testing-library/react";
import { createElement } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "components/MeasureWrapper";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import Measures from "measures";
import { Suspense } from "react";
import { MeasuresLoading } from "views";
import { measureDescriptions } from "measures/measureDescriptions";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { clearMocks } from "measures/2023/shared/util/validationsMock";
import { toHaveNoViolations, axe } from "jest-axe";
expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "CPA-AD";
const coreSet = "ACS";
const state = "AL";
const year = 2024;
const description = measureDescriptions[`${year}`][measureAbbr];
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
            name={description}
            year={`${year}`}
            measureId={measureAbbr}
          />
        </RouterWrappedComp>
      </Suspense>
    );
  });

  it("measure should render", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(measureAbbr + " - " + description));
    });
  });

  /**
   * Render the measure and confirm that all expected components exist.
   * */
  it("Always shows Did you collect question", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.getByText("Did you collect this measure?"));
  });

  it("shows corresponding questions if yes to reporting then ", async () => {
    apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(
      screen.queryByTestId("measurement-specification")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("data-source")).toBeInTheDocument();
    expect(
      screen.queryByTestId("definition-of-population")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Which Supplemental Item Sets were included in the Survey"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Which administrative protocol was used to administer the survey?"
      )
    ).toBeInTheDocument();
  });

  it("does not show corresponding questions if no to reporting then ", async () => {
    apiData.useGetMeasureValues.data.Item.data = notReportingData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(
      screen.queryByTestId("measurement-specification")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("data-source")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("definition-of-population")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Which Supplemental Item Sets were included in the Survey"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Which administrative protocol was used to administer the survey?"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Why did you not collect this measure")
    ).toBeInTheDocument();
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

const notReportingData = {
  DidCollect: "no",
};

const completedMeasureData = {
  MeasurementSpecification: "AHRQ-NCQA",
  DidCollect: "yes",
};
