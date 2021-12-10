import { screen } from "@testing-library/react";
import { TextArea } from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test the TextArea component", () => {
  test("Check that component renders", () => {
    renderWithHookForm(<TextArea name="test-component" label="label" />);

    expect(screen.getByLabelText("label")).toBeInTheDocument();
  });

  test("Pre-populates with data", () => {
    renderWithHookForm(<TextArea name="test-component" />, {
      defaultValues: {
        "test-component": "testing",
      },
    });

    expect(screen.getByText("testing")).toBeInTheDocument();
  });

  test("Check that label and helper texts get rendered correctly", () => {
    renderWithHookForm(
      <TextArea name="test-component" label="label" helperText="helper" />
    );

    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByText("helper")).toBeInTheDocument();
  });
});
