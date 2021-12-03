import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DemoQuestions } from "views";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "OH",
    coreSetId: "ACS",
    measureId: "AIF-HH",
  }),
}));

describe("Test Demo Questions Component", () => {
  it("renders a text area when question 2 is answered yes", async () => {
    render(<DemoQuestions />);
    userEvent.click(screen.getByText("I am reporting provisional data."));
    expect(
      screen.getByLabelText("I am reporting provisional data.")
    ).toBeChecked();
    expect(
      await screen.findByLabelText(
        "Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
      )
    ).toBeInTheDocument();
  });
});
