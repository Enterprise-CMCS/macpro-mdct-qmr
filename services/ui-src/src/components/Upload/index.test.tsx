import { render, screen } from "@testing-library/react";
import { Upload } from "./index";

describe("Test Upload Component", () => {
  test("Check that the Upload Component renders", () => {
    render(<Upload />);

    expect(screen.getByText(/drag & drop/i)).toBeInTheDocument();
  });
});
