import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterWrappedComp } from "utils/testing";
import { AddChildCoreSet } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApiMock } from "utils/testUtils/useApiMock";

const queryClient = new QueryClient();

describe("Test Add Child Core Set Component", () => {
  beforeEach(() => {
    useApiMock({});
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <AddChildCoreSet />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
  });

  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("Renders the correct child components", () => {
    expect(
      screen.getByText(/How are you reporting Child Core Set measures/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Remember to complete all Child Core Set Questions and Child Core Set Measures to submit for CMS review./i
      )
    ).toBeInTheDocument();
  });

  it("Form properly interactable", () => {
    userEvent.click(
      screen.getByText(
        /Reporting Medicaid and CHIP measures in separate Core Sets/i
      )
    );

    expect(
      screen.getByLabelText(
        /Reporting Medicaid and CHIP measures in separate Core Sets/i
      )
    ).toBeChecked();
  });
});
