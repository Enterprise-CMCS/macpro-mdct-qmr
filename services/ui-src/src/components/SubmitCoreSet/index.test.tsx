import { screen } from "@testing-library/react";
import { CoreSetTableItem } from "components/Table/types";
import { CoreSetAbbr } from "types";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { SubmitCoreSetButton } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApiMock } from "utils/testUtils/useApiMock";

const queryClient = new QueryClient();
const year = "2021";

describe("Test the SubmitCoreSetButton component", () => {
  beforeEach(() => {
    useApiMock({});
    renderWithHookForm(
      <QueryClientProvider client={queryClient}>
        <SubmitCoreSetButton
          coreSet={CoreSetAbbr.ACS}
          coreSetStatus={CoreSetTableItem.Status.COMPLETED}
          isSubmitted={false}
          year={year}
        />
      </QueryClientProvider>
    );
  });

  test("Check that the component renders", () => {
    expect(screen.getByText("Submit Core Set")).toBeVisible();
    expect(
      screen.getByText(
        `Complete all Adult Core Set Questions and Adult Core Set Measures to submit FFY ${year}`
      )
    ).toBeVisible();
  });
});
