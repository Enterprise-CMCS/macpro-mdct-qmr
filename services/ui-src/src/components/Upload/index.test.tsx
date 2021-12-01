import { render, screen, fireEvent } from "@testing-library/react";
import { Upload } from "./index";

describe("Test Upload Component", () => {
  test("Check that the Upload Component renders", () => {
    render(<Upload files={[]} setFiles={() => {}} />);

    expect(screen.getByText(/drag & drop/i)).toBeInTheDocument();
  });

  test("Check that the Upload Component renders", () => {
    render(<Upload label="Test Label" files={[]} setFiles={() => {}} />);

    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });

  test("Check that the Upload Component renders", () => {
    const file = new File([JSON.stringify({ ping: true })], "ping.json", {
      type: "application/json",
    });

    render(<Upload files={[file]} setFiles={() => {}} />);

    expect(screen.getByText(/ping.json/i)).toBeInTheDocument();
  });

  test("Check that the Upload Component renders", async () => {
    const file = new File([JSON.stringify({ ping: true })], "ping.json", {
      type: "application/json",
    });

    const deleteFileMockFn = jest.fn();

    render(<Upload files={[file]} setFiles={deleteFileMockFn} />);

    expect(screen.getByText(/ping.json/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(/test-delete-btn-0/i));

    expect(deleteFileMockFn).toHaveBeenCalledTimes(1);
  });
});
