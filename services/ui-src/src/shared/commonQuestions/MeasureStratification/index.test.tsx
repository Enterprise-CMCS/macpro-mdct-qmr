import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MeasureStrat } from ".";
import { renderWithHookForm } from "utils";
import { useApiMock } from "utils/testUtils/useApiMock";
import SharedContext from "shared/SharedContext";
import { commonQuestionsLabel as commonQuestionsLabels2026 } from "labels/2026/commonQuestionsLabel";
import { commonQuestionsLabel as commonQuestionsLabels2025 } from "labels/2025/commonQuestionsLabel";
import { getMeasureYear } from "utils/getMeasureYear";
import { useParams } from "react-router-dom";

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
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
  const mockUseParams = useParams as jest.Mock;

  const renderMeasureStratification = (year = 2026, coreSetId?: string) => {
    (getMeasureYear as jest.Mock).mockReturnValue(year);
    mockUseParams.mockReturnValue({ coreSetId });
    const labels =
      year === 2025 ? commonQuestionsLabels2025 : commonQuestionsLabels2026;

    renderWithHookForm(
      <SharedContext.Provider value={{ ...labels, year }}>
        <MeasureStrat data={[]} measureName="" />
      </SharedContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useApiMock({});
  });

  test("Test MeasureStratification render", () => {
    renderMeasureStratification(2026);

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
        name: "1997 OMB minimum race and ethnicity categories, as specified in the 2011 HHS standards",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "I am not reporting measure stratification for this measure",
      })
    ).toBeInTheDocument();
  });

  test("Test 2026 standards question and not-applicable label after selecting yes", async () => {
    renderMeasureStratification(2026);

    await userEvent.click(
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

  test("Test selecting Not applicable shows stratification section", async () => {
    renderMeasureStratification(2026);

    await userEvent.click(
      screen.getByRole("radio", {
        name: "Yes",
      })
    );

    await userEvent.click(
      screen.getByRole("radio", {
        name: "Not applicable",
      })
    );

    expect(
      screen.getByText("Enter Measure Stratification")
    ).toBeInTheDocument();
    expect(screen.queryByText("Race and Ethnicity")).not.toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.getByText("Geography")).toBeInTheDocument();
  });

  test("Test pre-2026 not-reporting does not show stratification section", async () => {
    renderMeasureStratification(2025);

    await userEvent.click(
      screen.getByRole("radio", {
        name: "I am not reporting measure stratification for this measure",
      })
    );

    expect(
      screen.queryByText("Enter Measure Stratification")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Measure Stratification Details")
    ).not.toBeInTheDocument();
  });

  test("Test pre-2026 standards selection shows stratification section", async () => {
    renderMeasureStratification(2025);

    await userEvent.click(
      screen.getByRole("radio", {
        name: "1997 OMB minimum race and ethnicity categories, as specified in the 2011 HHS standards",
      })
    );

    expect(
      screen.getByText("Measure Stratification Details")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enter Measure Stratification")
    ).toBeInTheDocument();
  });

  test("Test 2026 not-applicable shows stratification without Race and Ethnicity", async () => {
    renderMeasureStratification(2026);

    await userEvent.click(
      screen.getByRole("radio", {
        name: "Yes",
      })
    );

    await userEvent.click(
      screen.getByRole("radio", {
        name: "Not applicable",
      })
    );

    expect(
      screen.getByText("Enter Measure Stratification")
    ).toBeInTheDocument();
    expect(screen.queryByText("Race and Ethnicity")).not.toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.getByText("Geography")).toBeInTheDocument();
  });

  test("Test 2026 not-applicable keeps Medicaid Expansion for ACSM", () => {
    renderMeasureStratification(2026, "ACSM");

    userEvent.click(
      screen.getByRole("radio", {
        name: "Yes",
      })
    );

    userEvent.click(
      screen.getByRole("radio", {
        name: "Not applicable",
      })
    );

    expect(
      screen.getByText("Enter Measure Stratification")
    ).toBeInTheDocument();
    expect(screen.queryByText("Race and Ethnicity")).not.toBeInTheDocument();
    expect(screen.getByText("Medicaid Expansion")).toBeInTheDocument();
    expect(screen.queryByText("Foster Care")).not.toBeInTheDocument();
  });

  test("Test 2026 ACSM shows Medicaid Expansion only", () => {
    renderMeasureStratification(2026, "ACSM");

    userEvent.click(
      screen.getByRole("radio", {
        name: "Yes",
      })
    );

    userEvent.click(
      screen.getByRole("radio", {
        name: /2024 OMB Statistical Policy Directive No\. 15 race and ethnicity standards/i,
      })
    );

    expect(screen.getByText("Medicaid Expansion")).toBeInTheDocument();
    expect(screen.queryByText("Foster Care")).not.toBeInTheDocument();
  });

  test("Test 2026 CCSM shows Foster Care only", () => {
    renderMeasureStratification(2026, "CCSM");

    userEvent.click(
      screen.getByRole("radio", {
        name: "Yes",
      })
    );

    userEvent.click(
      screen.getByRole("radio", {
        name: /2024 OMB Statistical Policy Directive No\. 15 race and ethnicity standards/i,
      })
    );

    expect(screen.getByText("Foster Care")).toBeInTheDocument();
    expect(screen.queryByText("Medicaid Expansion")).not.toBeInTheDocument();
  });

  test("Test 2026 HHCS SPA id shows both Foster Care and Medicaid Expansion", () => {
    renderMeasureStratification(2026, "HHCS_24-0020");

    userEvent.click(
      screen.getByRole("radio", {
        name: "Yes",
      })
    );

    userEvent.click(
      screen.getByRole("radio", {
        name: /2024 OMB Statistical Policy Directive No\. 15 race and ethnicity standards/i,
      })
    );

    expect(screen.getByText("Foster Care")).toBeInTheDocument();
    expect(screen.getByText("Medicaid Expansion")).toBeInTheDocument();
  });
});
