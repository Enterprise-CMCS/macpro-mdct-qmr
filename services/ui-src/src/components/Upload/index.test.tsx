import { screen } from "@testing-library/react";
import * as QMR from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

describe("Test Upload Component", () => {
  beforeEach(() => {
    renderWithHookForm(
      <QueryClientProvider client={queryClient}>
        <QMR.Upload name="test-component" label="test label" />
      </QueryClientProvider>,
      {
        defaultValues: {
          "test-component": [
            new File([JSON.stringify({ ping: true })], "ping.json", {
              type: "application/json",
            }),
          ],
        },
      }
    );
  });
  test("Check that the Upload Component renders", () => {
    expect(screen.getByText(/drag & drop/i)).toBeInTheDocument();
  });

  test("Check that the Upload Component renders", () => {
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });
});
