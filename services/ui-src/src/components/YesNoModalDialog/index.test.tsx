import { fireEvent, render, screen } from "@testing-library/react";
import { YesNoModalDialog } from ".";

describe("Test YesNoModalDialog", () => {
  const mockChangeFn = jest.fn();

  beforeEach(() => {
    render(
      <YesNoModalDialog
        headerText="header"
        bodyText="body"
        isOpen={true}
        handleModalResponse={mockChangeFn}
      />
    );
  });

  test("Check that the YesNoModalDialog renders", () => {
    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/body/i)).toBeInTheDocument();
  });

  test("Check that the YesNoModalDialog calls the callback on close", () => {
    fireEvent.click(screen.getByText(/yes/i));
    expect(mockChangeFn).toHaveBeenCalledWith(true);
  });

  test("Check that the YesNoModalDialog calls the callback on close", () => {
    fireEvent.click(screen.getByText(/no/i));
    expect(mockChangeFn).toHaveBeenCalledWith(false);
  });
});
