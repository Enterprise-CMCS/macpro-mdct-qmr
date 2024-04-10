import fireEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { StatusOfData } from "./StatusOfData";

describe("Test StatusOfData component", () => {
  beforeEach(() => {
    renderWithHookForm(<StatusOfData />);
  });

  it("component renders", () => {
    expect(
      screen.getByText("What is the status of the data being reported?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("I am reporting provisional data.")
    ).toBeInTheDocument();
    expect(screen.getByText("I am reporting final data.")).toBeInTheDocument();
  });

  it("Additional information text box shows when 1st option clicked", async () => {
    const textArea = await screen.findByLabelText(
      "I am reporting provisional data."
    );
    fireEvent.click(textArea);
    expect(
      screen.getByText(
        "Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
      )
    ).toBeInTheDocument();
  });

  it("Additional information text box does not show when 2st option clicked", async () => {
    const textArea = await screen.findByLabelText("I am reporting final data.");
    fireEvent.click(textArea);
    expect(
      screen.queryByText(
        "Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
      )
    ).toBeNull();
  });
});
