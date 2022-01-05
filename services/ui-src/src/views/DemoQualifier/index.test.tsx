import { fireEvent, render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { DemoQualifier } from "views";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "OH",
    coreSetId: "ACS",
    measureId: "questions",
  }),
}));

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <DemoQualifier />
    </RouterWrappedComp>
  );
});
describe("test delivery system component", () => {
  it("renders components properly", async () => {
    expect(await screen.findByText("Fee-for-Service")).toBeInTheDocument();
    expect(await screen.findByText("PCCM")).toBeInTheDocument();
    expect(await screen.findByText("Managed Care")).toBeInTheDocument();
    expect(
      await screen.findByText("Integrated Care Model (ICM)")
    ).toBeInTheDocument();
    fireEvent.click(
      await screen.getByRole("button", { name: /\+ Add Another/i })
    );
    expect(
      await screen.getByRole("textbox", { name: "deliverySystem.4.-name" })
    ).toBeInTheDocument();
  });
});

describe("test audit or validation component", () => {
  it("renders components properly", async () => {
    expect(
      await screen.findByText(
        "Yes, some of the Core Set measures have been audited or validated"
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText("No, we calculated all the measure internally.")
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByLabelText(
        /Yes, some of the Core Set measures have been audited or validated/i
      )
    );
    expect(await screen.findByText(/Select All/i)).toBeInTheDocument();
  });
});

describe("test external ontractor component", () => {
  it("renders components properly", async () => {
    expect(
      await screen.findByText(
        "Yes, we did obtained assistance from one or more external contractors in collecting, calculating and/or reporting Core Set data."
      )
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.getByLabelText(
        /Yes, we did obtained assistance from one or more external contractors in collecting, calculating and\/or reporting Core Set data./i
      )
    );
    expect(
      await screen.findByText(/Data Analytics Contractor/i)
    ).toBeInTheDocument();
  });
});
