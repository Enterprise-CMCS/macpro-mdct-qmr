import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { WhyAreYouNotReporting } from "./WhyAreYouNotReporting";
import { mockLDFlags } from "../../../setupJest";
import userEvent from "@testing-library/user-event";
import SharedContext from "shared/SharedContext";
import commonQuestionsLabel from "labels/2025/commonQuestionsLabel";

mockLDFlags.setDefault({ periodOfHealthEmergency2025: false });

describe("WhyAreYouNotReporting component initial appearance", () => {
  beforeEach(() => {
    renderWithHookForm(<WhyAreYouNotReporting />);
  });

  it("displays description text properly", () => {
    expect(
      screen.getByText("Why are you not reporting on this measure?")
    ).toBeInTheDocument();
    expect(screen.getByText("Select all that apply:")).toBeInTheDocument();
  });

  it("displays label text properly", () => {
    verifyOptions();
  });

  it("does not display Health Homes option by default", () => {
    expect(
      screen.queryByLabelText(
        "Continuous enrollment requirement not met due to start date of SPA"
      )
    ).not.toBeInTheDocument();
  });
});

describe(`Options`, () => {
  beforeEach(() => {
    renderWithHookForm(<WhyAreYouNotReporting />);
  });

  describe("Population not covered", () => {
    beforeEach(() => {
      userEvent.click(screen.getByLabelText("Population not covered"));
    });

    it("displays sub-options", () => {
      expect(
        screen.getByLabelText("Entire population not covered")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Partial population not covered")
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText("Explain the partial population not covered:")
      ).not.toBeInTheDocument();
    });

    describe("sub-options", () => {
      it("Partial population not covered", () => {
        userEvent.click(
          screen.getByLabelText("Partial population not covered")
        );

        expect(
          screen.getByLabelText("Explain the partial population not covered:")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Data not available", () => {
    beforeEach(() => {
      userEvent.click(screen.getByLabelText("Data not available"));
    });

    it("displays sub-options", () => {
      expect(
        screen.getByText("Why is data not available?")
      ).toBeInTheDocument();

      // Verify expected subselections
      expect(screen.getByLabelText("Budget constraints")).toBeInTheDocument();
      expect(screen.getByLabelText("Staff Constraints")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Data inconsistencies/Accuracy")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Data source not easily accessible")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Information not collected")
      ).toBeInTheDocument();

      // There should now be 2 "Other" selections (one parent, one child)
      // in the component
      expect(screen.queryAllByLabelText("Other")).toHaveLength(2);
    });

    describe("sub-options", () => {
      test("Data inconsistencies/Accuracy", () => {
        // Open option
        userEvent.click(screen.getByLabelText("Data inconsistencies/Accuracy"));

        const textArea = screen.getByLabelText(
          "Explain the Data inconsistencies/Accuracy issues:"
        );
        expect(textArea).toBeInTheDocument();
        userEvent.type(textArea, "This is the test text");
        expect(textArea).toHaveDisplayValue("This is the test text");
      });

      test("Data source not easily accessible", () => {
        // Open option
        userEvent.click(
          screen.getByLabelText("Data source not easily accessible")
        );

        // Verify sub-options
        expect(
          screen.getByLabelText("Requires medical record review")
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText(
            "Requires data linkage which does not currently exist"
          )
        ).toBeInTheDocument();
        expect(screen.queryAllByLabelText("Other")).toHaveLength(3);

        // "Other"
        userEvent.click(screen.queryAllByLabelText("Other")[0]);
        const textArea = screen.getByLabelText("Explain:");
        expect(textArea).toBeInTheDocument();
        userEvent.type(textArea, "This is the test text");
        expect(textArea).toHaveDisplayValue("This is the test text");
      });

      test("Information not collected", () => {
        // Open Option
        userEvent.click(screen.getByLabelText("Information not collected"));
      });

      test("Other", () => {
        // Open Option
        userEvent.click(screen.queryAllByLabelText("Other")[0]);
        const textArea = screen.getByLabelText("Explain:");
        expect(textArea).toBeInTheDocument();
        userEvent.type(textArea, "This is the test text");
        expect(textArea).toHaveDisplayValue("This is the test text");
      });
    });
  });

  describe("Small sample size (less than 30)", () => {
    it("renders textBox correctly with max value 29", () => {
      userEvent.click(
        screen.getByLabelText("Small sample size (less than 30)")
      );

      const numberInput = screen.getByTestId("test-number-input");
      expect(numberInput).toBeInTheDocument();
      userEvent.type(numberInput, "29");
      expect(numberInput).toHaveDisplayValue("29");
      userEvent.type(numberInput, "30");
      expect(numberInput).toHaveDisplayValue("3");
    });
  });

  describe("Other", () => {
    it("renders textBox correctly", () => {
      userEvent.click(screen.getByLabelText("Other"));

      const textArea = screen.getByLabelText("Explain:");
      expect(textArea).toBeInTheDocument();
      userEvent.type(textArea, "This is the test text");
      expect(textArea).toHaveDisplayValue("This is the test text");
    });
  });
});

describe("WhyAreYouNotReporting component, Health Homes", () => {
  beforeEach(() => {
    renderWithHookForm(<WhyAreYouNotReporting healthHomeMeasure />);
  });

  it("renders the Health Homes version of the component", () => {
    verifyOptions();
    expect(
      screen.getByLabelText(
        "Continuous enrollment requirement not met due to start date of SPA"
      )
    ).toBeInTheDocument();
  });

  it("displays the correct Health Homes sub-options", () => {
    userEvent.click(screen.getByLabelText("Data not available"));
    expect(
      screen.getByLabelText("Data not submitted by Providers to State")
    ).toBeInTheDocument();
  });
});

describe("Limitations with data collection, reporting, or accuracy due to the COVID-19 pandemic (PHE active)", () => {
  it("renders textBox correctly", () => {
    mockLDFlags.set({ periodOfHealthEmergency2025: true });
    renderWithHookForm(
      <SharedContext.Provider value={{ ...commonQuestionsLabel, year: "2025" }}>
        <WhyAreYouNotReporting />
      </SharedContext.Provider>
    );
    userEvent.click(
      screen.getByLabelText(
        "Limitations with data collection, reporting, or accuracy due to the COVID-19 pandemic"
      )
    );
    const textArea = screen.getByLabelText(
      "Describe your state's limitations with regard to collection, reporting, or accuracy of data for this measure:"
    );
    expect(textArea).toBeInTheDocument();
    userEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");
  });
});

function verifyOptions() {
  expect(screen.getByLabelText("Service not covered")).toBeInTheDocument();
  expect(screen.getByLabelText("Population not covered")).toBeInTheDocument();
  expect(screen.getByLabelText("Data not available")).toBeInTheDocument();
  expect(
    screen.queryByText(
      "Limitations with data collection, reporting, or accuracy due to the COVID-19 pandemic"
    )
  ).not.toBeInTheDocument();
  expect(
    screen.getByLabelText("Small sample size (less than 30)")
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Other")).toBeInTheDocument();

  // Expect suboptions to not be open by default
  expect(
    screen.queryByText("Why is data not available?")
  ).not.toBeInTheDocument();
}
