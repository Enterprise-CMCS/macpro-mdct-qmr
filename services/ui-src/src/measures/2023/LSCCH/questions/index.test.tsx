import { screen, waitFor } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
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
import { toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "LSC-CH";
const coreSet = "CCSC";
const state = "AL";
const year = 2023;
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
    expect(screen.queryByTestId("measure-wrapper-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(measureAbbr + " - " + description));
    });
  });

  it("should be readOnly rates when admin data source is selected ", async () => {
    apiData.useGetMeasureValues.data.Item.data = readOnlyRates1;
    useApiMock(apiData);
    renderWithHookForm(component);
    //screen.debug(renderWithHookForm(component).container, Infinity)
    const rateTextBox = screen.queryAllByLabelText("Rate")[0];
    fireEvent.type(rateTextBox, "99.9");
    expect(rateTextBox).not.toHaveDisplayValue("99.9");
  });

  it("should be readOnly rates when no data source is selected ", async () => {
    apiData.useGetMeasureValues.data.Item.data = readOnlyRates2;
    useApiMock(apiData);
    renderWithHookForm(component);
    //screen.debug(renderWithHookForm(component).container, Infinity)
    const rateTextBox = screen.queryAllByLabelText("Rate")[0];
    fireEvent.type(rateTextBox, "99.9");
    expect(rateTextBox).toHaveDisplayValue("99.9");
  });

  it("should be editable rates when rateAlwaysEditable is undefined ", async () => {
    apiData.useGetMeasureValues.data.Item.data = editableRates;
    useApiMock(apiData);
    renderWithHookForm(component);
    //screen.debug(renderWithHookForm(component).container, Infinity)
    const rateTextBox = screen.queryAllByLabelText("Rate")[0];
    fireEvent.type(rateTextBox, "99.9");
    expect(rateTextBox).toHaveDisplayValue("99.9");
  });
});

const readOnlyRates1 = {
  DataSource: ["AdministrativeData"],
  "OtherPerformanceMeasure-Rates": [
    {
      description: "test",
      rate: [
        {
          denominator: "122",
          label: undefined,
          numerator: "1",
          rate: "0.8",
        },
      ],
    },
  ],
  MeasurementSpecification: "NCQA/HEDIS",
  DidReport: "yes",
};

const readOnlyRates2 = {
  DataSource: [],
  "OtherPerformanceMeasure-Rates": [
    {
      description: "test",
      rate: [
        {
          denominator: "122",
          label: undefined,
          numerator: "1",
          rate: "0.8",
        },
      ],
    },
  ],
  MeasurementSpecification: "NCQA/HEDIS",
  DidReport: "yes",
};

const editableRates = {
  rateAlwaysEditable: true,
  DataSource: [],
  "OtherPerformanceMeasure-Rates": [
    {
      description: "test",
      rate: [
        {
          denominator: "122",
          label: undefined,
          numerator: "1",
          rate: "0.8",
        },
      ],
    },
  ],
  MeasurementSpecification: "NCQA/HEDIS",
  DidReport: "yes",
};
