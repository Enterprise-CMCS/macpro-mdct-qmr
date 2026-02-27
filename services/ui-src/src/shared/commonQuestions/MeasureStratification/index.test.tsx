import { fireEvent, screen } from "@testing-library/react";
import { MeasureStrat } from ".";
import { renderWithHookForm } from "utils";
import { useApiMock } from "utils/testUtils/useApiMock";
import SharedContext from "shared/SharedContext";
import { commonQuestionsLabel as commonQuestionsLabels2026 } from "labels/2026/commonQuestionsLabel";

const omsData = {
  O8BrOa: {
    selections: {
      KRwFRN: {
        rateData: {
          rates: {
            ZCy3XP: {
              xS5HMm: [{ numerator: 5, denominator: 5, rate: 100.0 }],
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
  beforeEach(() => {
    jest.clearAllMocks();
    useApiMock({});

    renderWithHookForm(
      <SharedContext.Provider
        value={{ ...commonQuestionsLabels2026, year: 2026 }}
      >
        <MeasureStrat data={[]} measureName="" />
      </SharedContext.Provider>
    );
  });
  test("Test MeasureStratification render", () => {
    expect(
      screen.getByText(
        "Which race and ethnicity standards would your state like to use for 2026 Core Sets reporting?"
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

  test("Test data is reset when switching Stratification versions", () => {
    const radioA = screen.getByText(
      "1997 OMB minimum race and ethnicity standards, as specified in the 2011 HHS standards"
    );
    const radioC = screen.getByText(
      "I am not reporting stratified data for this measure"
    );
    fireEvent.click(radioA);
    expect(
      omsData.O8BrOa.selections.KRwFRN.rateData.rates.ZCy3XP.xS5HMm[0]
    ).toStrictEqual({ numerator: 5, denominator: 5, rate: 100.0 });

    //when selecting another radio button, it should run the reset function
    fireEvent.click(radioC);
    expect(
      omsData.O8BrOa.selections.KRwFRN.rateData.rates.ZCy3XP.xS5HMm[0]
    ).toStrictEqual({ numerator: "", denominator: "", rate: "" });
  });
});
