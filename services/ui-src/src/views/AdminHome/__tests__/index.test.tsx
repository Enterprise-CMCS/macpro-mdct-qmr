import { render, screen } from "@testing-library/react";
import { AdminHome } from "../index";
import { RouterWrappedComp } from "utils/testing";
import { territoryList } from "libs";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const testComponent = (
  <RouterWrappedComp>
    <AdminHome />
  </RouterWrappedComp>
);

describe("Test AdminHome", () => {
  test("Check basic page rendering", () => {
    render(testComponent);
    expect(screen.getByText("Admin Home")).toBeInTheDocument();
    territoryList.forEach((territory) =>
      expect(
        screen.getByRole("option", { name: territory.value })
      ).toBeInTheDocument()
    );
    expect(
      screen.getByRole("button", { name: "Go To State Home" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Banner Admin" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Banner Editor" })
    ).toBeInTheDocument();
  });
});

describe("Test AdminHome accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
