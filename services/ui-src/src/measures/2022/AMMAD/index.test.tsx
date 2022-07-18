// TODO: Use this file to make a template
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
import { testSnapshot } from "utils/testUtils/testSnapshot";

// Test Setup
const measureAbbr = "AMM-AD";
const coreSet = "ACS";
const state = "AL";
const year = 2022;
const description = measureDescriptions[`${year}`][measureAbbr];
const apiData = {
  useGetMeasureValues: {
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
      },
    },
    isLoading: false,
    refetch: jest.fn(),
    isError: false,
    error: undefined,
  },
};

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

describe(`Test FFY ${year} ${measureAbbr}`, () => {
  let component: JSX.Element;
  beforeEach(() => {
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
      expect(screen.getByText("AMM-AD - Antidepressant Medication Management"));
    });
  });

  /** Snapshot Test
   *
   * Render the measure and confirm that all expected components exist.
   * */
  it("rendered measure should match snapshot", async () => {
    await waitFor(() => {
      testSnapshot({ component, apiData });
    });
    // expect(screen.getByTestId("measure-wrapper-form")).toMatchSnapshot();
    // a snapshot for no data
    // a snapshot for everything
    // a snapshot for
  });

  /** Validations Test
   *
   * Confirm that correct functions are called. Comprehensive testing of the validations is done in specific test files
   * for each validation function. See globalValidations directory.
   */
  it("", () => {});

  // include a11y test
  // when validate is clicked - expect the correct validation functions are called
  // behavior for non state user
  // upload function get called correctly when uploading a file
  // print button should be able to click for all users
});

// describe("state user", () => {
//   beforeEach(() => {
//     mockUseUser.mockImplementation(() => {
//       return { isStateUser: true };
//     });

//     const div = createElement("div");
//     useApiMock({});
//     render(
//       <RouterWrappedComp>
//         <MeasureWrapper
//           measure={div}
//           name="testing-active"
//           year="2021"
//           measureId="AMMAD"
//         />
//       </RouterWrappedComp>
//     );
//   });

//   test("enabled fieldset for state user", () => {
//     expect(screen.getByTestId("fieldset")).toBeInTheDocument();
//     expect(screen.getByTestId("fieldset")).toBeEnabled();
//   });

//   test("should display the state layout container", () => {
//     expect(screen.getByTestId("state-layout-container")).toBeInTheDocument();
//     expect(screen.getByTestId("state-layout-container")).toHaveTextContent(
//       "AMMAD"
//     );
//     expect(screen.getByTestId("state-layout-container")).toHaveTextContent(
//       "2021"
//     );
//   });
// });
