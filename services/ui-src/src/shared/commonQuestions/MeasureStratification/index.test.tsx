import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MeasureStrat } from ".";
import { renderWithHookForm } from "utils";
import { useApiMock } from "utils/testUtils/useApiMock";
import SharedContext from "shared/SharedContext";
import { commonQuestionsLabel as commonQuestionsLabels2026 } from "labels/2026/commonQuestionsLabel";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

const omsData = {
  O8BrOa: {
    selections: {
      KRwFRN: {
        rateData: {
          rates: {
            ZCy3XP: {
              xS5HMm: [{ numerator: 5, denominator: 5, rate: 100 }],
            },
          },
        },
        additionalSubCategories: {},
      },
    },
    additionalSelections: [],
  },
};

//have the structuredClone return a filled omsData
global.structuredClone = () => omsData;

describe("Test MeasureStratification", () => {
  const renderMeasureStratification = (year = 2026) => {
    (getMeasureYear as jest.Mock).mockReturnValue(year);

    renderWithHookForm(
      <SharedContext.Provider value={{ ...commonQuestionsLabels2026, year }}>
        <MeasureStrat data={[]} measureName="" />
      </SharedContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useApiMock({});

    renderMeasureStratification(2026);
  });

  test("Test MeasureStratification render", () => {
    expect(
      screen.getByText(
        "Are you reporting measure stratification for this measure?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "Yes",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "No",
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Which race and ethnicity standards would your state like to use for 2026 Core Sets reporting?"
      )
    ).not.toBeInTheDocument();
  });

  test("Test standards question and options render for pre-2026", () => {
    renderMeasureStratification(2025);

    expect(
      screen.getByText(
        "Which race and ethnicity standards would your state like to use for 2025 Core Sets reporting?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "1997 OMB minimum race and ethnicity standards, as specified in the 2011 HHS standards",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "I am not reporting stratified data for this measure",
      })
    ).toBeInTheDocument();
  });

  test("Test 2026 standards question and not-applicable label after selecting yes", () => {
    userEvent.click(
      screen.getByRole("radio", {
        name: "Yes",
      })
    );

    expect(
      screen.getByText(
        "Which race and ethnicity standards would your state like to use for 2026 Core Sets reporting?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "Not applicable",
      })
    ).toBeInTheDocument();
  });
});
