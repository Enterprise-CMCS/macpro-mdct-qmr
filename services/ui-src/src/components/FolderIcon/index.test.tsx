import { render, screen } from "@testing-library/react";
import { FolderIcon } from ".";

describe("Test Logo.tsx", () => {
  test("Check that the QMRLogo renders", () => {
    render(<FolderIcon />);

    expect(screen.getByAltText(/file upload icon/i)).toBeInTheDocument();
  });
});
