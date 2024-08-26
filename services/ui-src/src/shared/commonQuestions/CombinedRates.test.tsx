import fireEvent from "@testing-library/user-event";
import { CombinedRates } from "./CombinedRates";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import SharedContext from "shared/SharedContext";
import commonQuestionsLabel from "labels/2023/commonQuestionsLabel";

describe("Test CombinedRates component", () => {
  beforeEach(() => {
    renderWithHookForm(
      <SharedContext.Provider value={{ ...commonQuestionsLabel, year: 2023 }}>
        <CombinedRates />
      </SharedContext.Provider>
    );
  });

  it("component renders", () => {
    expect(
      screen.getByText(
        "Did you combine rates from multiple reporting units (e.g. health plans, delivery systems, programs) to create a State-Level rate?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Did you combine rates from multiple reporting units (e.g. health plans, delivery systems, programs) to create a State-Level rate?"
      )
    ).toBeInTheDocument();
  });

  it("renders suboptions when Yes is clicked", async () => {
    const textArea = await screen.findByLabelText(
      "Yes, we combined rates from multiple reporting units to create a State-Level rate."
    );
    fireEvent.click(textArea);
    expect(
      screen.getByText(
        "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a State-Level rate."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The rates are weighted based on the size of the measure-eligible population for each reporting unit."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The rates are weighted based on another weighting factor."
      )
    ).toBeInTheDocument();
  });

  it("renders a text area when Yes is clicked and the last option is clicked", async () => {
    fireEvent.click(
      await screen.findByLabelText(
        "Yes, we combined rates from multiple reporting units to create a State-Level rate."
      )
    );
    fireEvent.click(
      await screen.getByText(
        "The rates are weighted based on another weighting factor."
      )
    );

    expect(
      screen.getByText("Describe the other weighting factor:")
    ).toBeInTheDocument();

    const textArea = await screen.findByLabelText(
      "Describe the other weighting factor:"
    );

    fireEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");
  });

  it("does not render suboptions when No is clicked", async () => {
    const textArea = await screen.findByLabelText(
      "No, we did not combine rates from multiple reporting units to create a State-Level rate."
    );
    fireEvent.click(textArea);
    expect(
      screen.queryByText(
        "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a State-Level rate."
      )
    ).toBeNull();
    expect(
      screen.queryByText(
        "The rates are weighted based on the size of the measure-eligible population for each reporting unit."
      )
    ).toBeNull();
    expect(
      screen.queryByText(
        "The rates are weighted based on another weighting factor."
      )
    ).toBeNull();
  });
});

describe("Test CombinedRates component for Health Homes", () => {
  beforeEach(() => {
    renderWithHookForm(
      <SharedContext.Provider value={{ ...commonQuestionsLabel, year: 2023 }}>
        <CombinedRates healthHomeMeasure />
      </SharedContext.Provider>
    );
  });

  it("component renders with different text", () => {
    expect(
      screen.getByText(
        "Did you combine rates from multiple reporting units (e.g. Health Home Providers) to create a Health Home Program-Level rate?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Did you combine rates from multiple reporting units (e.g. Health Home Providers) to create a Health Home Program-Level rate?"
      )
    ).toBeInTheDocument();
  });

  it("renders suboptions when Yes is clicked", async () => {
    const textArea = await screen.findByLabelText(
      "Yes, we combined rates from multiple reporting units to create a Health Home Program-Level rate."
    );
    fireEvent.click(textArea);
    expect(
      screen.getByText(
        "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a Program-Level rate."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The rates are weighted based on the size of the measure-eligible population for each reporting unit."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The rates are weighted based on another weighting factor."
      )
    ).toBeInTheDocument();
  });

  it("renders a text area when Yes is clicked and the last option is clicked for Health Homes", async () => {
    fireEvent.click(
      await screen.findByLabelText(
        "Yes, we combined rates from multiple reporting units to create a Health Home Program-Level rate."
      )
    );
    fireEvent.click(
      await screen.getByText(
        "The rates are weighted based on another weighting factor."
      )
    );

    expect(
      screen.getByText("Describe the other weighting factor:")
    ).toBeInTheDocument();

    const textArea = await screen.findByLabelText(
      "Describe the other weighting factor:"
    );

    fireEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");
  });

  it("does not render suboptions when No is clicked", async () => {
    const textArea = await screen.findByLabelText(
      "No, we did not combine rates from multiple reporting units to create a Program-Level rate for Health Home measures."
    );
    fireEvent.click(textArea);
    expect(
      screen.queryByText(
        "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a Program-Level rate."
      )
    ).toBeNull();
    expect(
      screen.queryByText(
        "The rates are weighted based on the size of the measure-eligible population for each reporting unit."
      )
    ).toBeNull();
    expect(
      screen.queryByText(
        "The rates are weighted based on another weighting factor."
      )
    ).toBeNull();
  });
});
