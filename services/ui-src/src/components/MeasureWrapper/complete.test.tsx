import { render, screen, fireEvent } from "@testing-library/react";
import { CompleteCoreSets } from "./complete";

const mockHandleValidation = jest.fn();
const mockHandleSubmit = jest.fn();

describe("Test CompleteCoreSet", () => {
  it("Test CompleteCoreSet render", () => {
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
    fireEvent.click(validateBtn);
    expect(mockHandleValidation).toHaveBeenCalled();

    const completeBtn = screen.getByRole("button", {
      name: "Complete Core Set Questions",
    });
    expect(completeBtn).toBeVisible();
    fireEvent.click(completeBtn);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
