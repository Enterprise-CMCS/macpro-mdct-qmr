import { screen } from "@testing-library/react";
import * as QMR from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test Upload Component", () => {
  beforeEach(() => {
    renderWithHookForm(
      <QMR.Upload name="test-component" label="test label" />,
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

  test("Check that data pre-populates", async () => {
    expect(await screen.getByTestId("test-delete-btn-0")).toBeInTheDocument();
  });
});
