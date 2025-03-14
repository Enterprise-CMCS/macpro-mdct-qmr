import { render, screen } from "@testing-library/react";
import { AdminHome } from "../index";
import { RouterWrappedComp } from "utils/testing";
import { territoryList } from "libs";
import { useUser } from "hooks/authHooks";
import { UserRoles } from "types";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
expect.extend(toHaveNoViolations);

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("hooks/authHooks/useUser");
const mockedUseUser = useUser as jest.MockedFunction<typeof useUser>;

const testComponent = (
  <RouterWrappedComp>
    <AdminHome />
  </RouterWrappedComp>
);

describe("Test AdminHome", () => {
  beforeEach(() => {
    mockedUseUser.mockReturnValue({ userRole: UserRoles.ADMIN });
  });

  test("Check basic page rendering for super admin", () => {
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

  test("Check basic page rendering for admin-type (non super admin)", () => {
    mockedUseUser.mockReturnValueOnce({ userRole: UserRoles.HELP_DESK });
    render(testComponent);
    territoryList.forEach((territory) =>
      expect(
        screen.getByRole("option", { name: territory.value })
      ).toBeInTheDocument()
    );
    expect(
      screen.getByRole("button", { name: "Go To State Home" })
    ).toBeInTheDocument();
    // admin banner button is not displayed
    expect(
      screen.queryAllByRole("heading", { name: "Banner Admin" })
    ).toHaveLength(0);
    expect(
      screen.queryAllByRole("button", { name: "Banner Editor" })
    ).toHaveLength(0);
  });
});

describe("Test AdminHome accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
