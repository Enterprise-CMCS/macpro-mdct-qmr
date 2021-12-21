import { StateHome } from "../index";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({
    year: "2021",
    state: "OH",
  }),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <StateHome />
    </RouterWrappedComp>
  );
});

describe("Test StateHome", () => {
  test("Check that the Heading renders", () => {
    expect(
      screen.getByText(/Core Set Measures Reporting/i)
    ).toBeInTheDocument();
  });

  test("Check that the Reporting Year renders", () => {
    expect(screen.getByText(/Reporting Year/i)).toBeInTheDocument();
  });

  test("Check that the Adult core set record renders", () => {
    expect(screen.getByText("Adult Core Set Measures")).toBeInTheDocument();
  });

  test("Check that the route is correct when reporting year is changed", () => {
    fireEvent.change(screen.getByTestId("select"), {
      target: { value: "2022" },
    });
    expect(mockedNavigate).toHaveBeenCalledWith("/OH/2022");
  });
});
