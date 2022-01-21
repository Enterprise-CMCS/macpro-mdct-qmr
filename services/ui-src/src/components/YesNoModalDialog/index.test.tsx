import { render, screen } from "@testing-library/react";
import { YesNoModalDialog } from ".";

// interface Props {
//     headerText: string;
//     bodyText: string;
//     handleModalResponse: (response: boolean) => void;
//     isOpen: boolean;
//   }

describe("Test YesNoModalDialog", () => {
  beforeEach(() => {
    render(
      <YesNoModalDialog
        headerText="header"
        bodyText="body"
        isOpen={true}
        handleModalResponse={() => {}}
      />
    );
  });

  test("Check that the YesNoModalDialog renders", () => {
    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/body/i)).toBeInTheDocument();
  });
});
