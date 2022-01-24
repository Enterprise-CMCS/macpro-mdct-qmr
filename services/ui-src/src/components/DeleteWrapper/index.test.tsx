import { DeleteWrapper } from ".";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const testFunction = jest.fn();
const testFunction2 = jest.fn();

describe("Test DeleteWrapper", () => {
  describe("DeleteWrapper enabled", () => {
    beforeEach(() => {
      render(
        <DeleteWrapper onDelete={testFunction}>
          <div>test label</div>
        </DeleteWrapper>
      );
    });

    test("Check DeleteWrapper Renders", () => {
      expect(screen.getByTestId("delete-wrapper")).toBeInTheDocument();
    });

    test("Check that clicking delete removes from render", () => {
      act(() => {
        userEvent.click(screen.getByTestId("delete-wrapper"));
      });
      expect(screen.queryByText("test label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("delete-wrapper")).not.toBeInTheDocument();
    });

    test("Check that onDeleteFunction is called on click", () => {
      act(() => {
        userEvent.click(screen.getByTestId("delete-wrapper"));
      });
      expect(screen.queryByText("test label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("delete-wrapper")).not.toBeInTheDocument();
      expect(testFunction).toHaveBeenCalled();
    });
  });

  describe("DeletWrapper disabled", () => {
    beforeEach(() => {
      render(
        <DeleteWrapper onDelete={testFunction2} allowDeletion={false}>
          <div>test label</div>
        </DeleteWrapper>
      );
    });

    test("DeleteWrapper does not render, but children do", () => {
      expect(screen.queryByText("test label")).toBeInTheDocument();
      expect(screen.queryByTestId("delete-wrapper")).not.toBeInTheDocument();
    });
  });
});
