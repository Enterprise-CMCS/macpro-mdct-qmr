import { screen, waitFor } from "@testing-library/react";
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
import { clearMocks } from "utils/testUtils/validationsMock";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "CPA-AD";
const coreSet = "ACS";
const state = "AL";
const year = 2022;
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
  it("Always shows Are you reporting question", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.getByText("Did you collect this measure?"));
  });

  jest.setTimeout(15000);
  it("should pass a11y tests", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    const results = await axe(screen.getByTestId("measure-wrapper-form"));

    expect(results).toHaveNoViolations();
  });
});