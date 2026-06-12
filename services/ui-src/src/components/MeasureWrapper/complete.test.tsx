import { render, screen } from "@testing-library/react";
import { CompleteCoreSets } from "./complete";
import userEvent from "@testing-library/user-event";

const mockHandleValidation = jest.fn();
const mockHandleSubmit = jest.fn();

describe("Test CompleteCoreSet", () => {
  it("Test CompleteCoreSet render", async () => {
    render(
      <CompleteCoreSets
        handleSubmit={mockHandleSubmit}
        handleValidation={mockHandleValidation}
        type={"AD"}
      />
    );
    expect(
      screen.getByText(
        "Complete all Adult Core Set Questions and Adult Core Set Measures to submit to CMS"
      )
    ).toBeVisible();

    const validateBtn = screen.getByRole("button", {
      name: "Validate Core Set Questions",
    });
    expect(validateBtn).toBeVisible();
    await userEvent.click(validateBtn);
    expect(mockHandleValidation).toHaveBeenCalled();

    const completeBtn = screen.getByRole("button", {
      name: "Complete Core Set Questions",
    });
    expect(completeBtn).toBeVisible();
    await userEvent.click(completeBtn);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
