import { fireEvent, render, screen } from "@testing-library/react";
import { Notification } from ".";

describe("Test Notification", () => {
  const myMock = jest.fn();

  beforeEach(() => {
    render(
      <Notification
        alertStatus="success"
        alertTitle="Success Title"
        alertDescription="success again"
        close={myMock}
      />
    );
  });
  test("Check that the Notification renders", () => {
    expect(screen.getByText(/success title/i)).toBeVisible();
    expect(screen.getByText(/success again/i)).toBeVisible();
  });

  test("Check that the Notification changes with updated prop values", () => {
    fireEvent.click(screen.getByTestId(/close/i));
    expect(myMock).toBeCalled();
  });
});
