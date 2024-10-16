import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import StateHome from "../index";
import { RouterWrappedComp } from "utils/testing";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApiMock, defaultMockValues } from "utils/testUtils/useApiMock";
import { axe, toHaveNoViolations } from "jest-axe";
import { useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useUser } from "hooks/authHooks";
import { CoreSetAbbr } from "types";
import { getMeasureYear } from "utils/getMeasureYear";
expect.extend(toHaveNoViolations);

const queryClient = new QueryClient();

const mockedNavigate = jest.fn();

const mockUseParams = useParams as jest.Mock;

jest.mock("../../../utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

const mockMutate = jest.fn((_variables: CoreSetAbbr, options?: any) => {
  if (typeof options?.onSuccess === "function") return options.onSuccess();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => mockedNavigate,
}));

const mockUseUser = useUser as jest.Mock;
jest.mock("hooks/authHooks", () => ({
  ...jest.requireActual("hooks/authHooks"),
  useUser: jest.fn(),
}));

const testComponent = (
  <QueryClientProvider client={queryClient}>
    <RouterWrappedComp>
      <StateHome />
    </RouterWrappedComp>
  </QueryClientProvider>
);

describe("Test StateHome", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => useUser);
    mockUseParams.mockReturnValue({
      year: "2021",
      state: "OH",
    });
    useApiMock({});
    render(testComponent);
  });
  test("Check that the Heading renders with correct year", () => {
    expect(
      screen.getByText(/2021 Core Set Measures Reporting/i)
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
      target: { value: "2021" },
    });
    expect(mockedNavigate).toHaveBeenCalledWith("/OH/2021");
  });

  test("Check that the banner is displayed when active", () => {
    expect(
      screen.getByText(defaultMockValues.useGetBannerValues.data.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultMockValues.useGetBannerValues.data.description)
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultMockValues.useGetBannerValues.data.link)
    ).toBeInTheDocument();
  });
});
describe("Test StateHome accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    mockUseUser.mockImplementation(() => useUser);
    mockUseParams.mockReturnValue({
      year: "2021",
      state: "OH",
    });
    useApiMock({});
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Test 2023 state without health home core sets", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => useUser);
    mockUseParams.mockReturnValue({
      year: "2023",
      state: "OH",
    });
    useApiMock({});
    render(testComponent);
  });
  test("Should not render health home core sets for CA", () => {
    expect(
      screen.getByText(/2023 Core Set Measures Reporting/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Need to report on Health home data/i)
    ).not.toBeInTheDocument();
  });
});

describe("Test StateHome 2024", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => useUser);
    mockGetMeasureYear.mockReturnValue(2024);
    mockUseParams.mockReturnValue({
      year: "2024",
      state: "IN",
    });
    useApiMock({});
    render(testComponent);
  });
  test("Check that the route is correct when reporting year is changed", () => {
    render(testComponent);
    const viewCombinedRatesButton = screen.getAllByRole("button", {
      name: "View Combined Rates",
    })[0];
    userEvent.click(viewCombinedRatesButton);
    expect(global.window.location.pathname).toContain("/combined-rates");
  });
});

const renderByCoreSet = (coreSet: CoreSetAbbr) => {
  const values = { coreSet: coreSet, state: "AL", year: 2023 };
  defaultMockValues.useGetCoreSetsValues.data.Items[0] = {
    ...defaultMockValues.useGetCoreSetsValues.data.Items[0],
    ...values,
  };
  defaultMockValues.useDeleteCoreSetValues.mutate = mockMutate;
  useApiMock(defaultMockValues);

  render(testComponent);
};

describe("Test kebab menu", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });
    global.open = jest.fn();
    mockUseParams.mockReturnValue({
      year: "2023",
      state: "AL",
    });
  });

  it("Simulate Export fom Kebab Menu", () => {
    renderByCoreSet(CoreSetAbbr.ACS);
    const test = screen.getByRole("button", { name: "Action Menu for ACS" });
    fireEvent.click(test);
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("Simulate Delete from Kebab Menu for Adult Split", async () => {
    const coreSet = CoreSetAbbr.ACSC;
    renderByCoreSet(coreSet);
    const deleteBtn = screen.getByLabelText(`Delete for ${coreSet}`);
    fireEvent.click(deleteBtn);

    waitFor(() => {
      expect(screen.getByText("Enter DELETE to confirm."));
    });

    const textbox = screen.getByPlaceholderText("Enter 'DELETE' to confirm");
    fireEvent.change(textbox, { target: { value: "DELETE" } });
    const modalDelete = screen.getByTestId("delete-button");
    fireEvent.click(modalDelete);
    expect(mockMutate).toHaveBeenCalled();
  });

  it("Simulate Delete from Kebab Menu for Child Split", async () => {
    const coreSet = CoreSetAbbr.CCSC;
    renderByCoreSet(coreSet);
    const deleteBtn = screen.getByLabelText(`Delete for ${coreSet}`);
    fireEvent.click(deleteBtn);

    waitFor(() => {
      expect(screen.getByText("Enter DELETE to confirm."));
    });

    const textbox = screen.getByPlaceholderText("Enter 'DELETE' to confirm");
    fireEvent.change(textbox, { target: { value: "DELETE" } });
    const modalDelete = screen.getByTestId("delete-button");
    fireEvent.click(modalDelete);
    expect(mockMutate).toHaveBeenCalled();
  });

  it("Simulate Delete from Kebab Menu for Health Home", async () => {
    const coreSet = CoreSetAbbr.HHCS;
    renderByCoreSet(coreSet);
    const deleteBtn = screen.getByLabelText(`Delete for ${coreSet}`);
    fireEvent.click(deleteBtn);

    waitFor(() => {
      expect(screen.getByText("Enter DELETE to confirm."));
    });

    const textbox = screen.getByPlaceholderText("Enter 'DELETE' to confirm");
    fireEvent.change(textbox, { target: { value: "DELETE" } });
    const modalDelete = screen.getByTestId("delete-button");
    fireEvent.click(modalDelete);
    expect(mockMutate).toHaveBeenCalled();
  });
});
