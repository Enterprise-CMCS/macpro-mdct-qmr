/* eslint-disable no-console */
import { render, screen, fireEvent } from "@testing-library/react";
import { IKebabMenuItem, KebabMenu } from ".";
import { useUser } from "hooks/authHooks";
import { CoreSetTableItem } from "components/Table/types";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

describe("Test the KebabMenu component", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });
    const menuLabel = "ACS";
    const KebabMenuItems: IKebabMenuItem[] = [
      {
        itemText: "Edit",
        menuLabel: "Edit for ACS",
        handleSelect: () => console.log("1"),
      },
      {
        itemText: "Export",
        menuLabel: "Export for ACS",
        handleSelect: () => console.log("2"),
      },
      {
        itemText: "Clear Measure Entries",
        handleSelect: () => console.log("3"),
      },
    ];

    render(<KebabMenu menuLabel={menuLabel} menuItems={KebabMenuItems} />);
  });

  test("Check whether the component renders", () => {
    expect(screen.getByLabelText(/Action Menu/i));
  });

  test("Check menu click event populates menu item", () => {
    fireEvent.click(screen.getByLabelText(/Action Menu/i));
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  test("Check menu item click event calls the callback function", () => {
    console.log = jest.fn();
    fireEvent.click(screen.getByLabelText(/Action Menu/i));
    fireEvent.click(screen.getByText(/Edit/i));
    expect(console.log).toHaveBeenCalledWith("1");
  });

  test("Should show descriptive aria label", () => {
    fireEvent.click(screen.getByLabelText(/Action Menu/i));
    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByLabelText(/Edit for ACS/i)).toBeInTheDocument();
  });
});

describe("Test the DeleteMenuItemAlertDialog -- Health home", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    const menuLabel = "ACS";
    const KebabMenuItems: IKebabMenuItem[] = [
      {
        itemText: "Delete",
        menuLabel: "Delete for ACS",
        handleSelect: () => console.log("1"),
        type: CoreSetTableItem.Type.HEALTH_HOME,
      },
    ];

    render(<KebabMenu menuLabel={menuLabel} menuItems={KebabMenuItems} />);
  });

  test("Check whether the correct dialog renders for health home", () => {
    fireEvent.click(screen.getByLabelText(/Action Menu/i));
    fireEvent.click(screen.getByText(/Delete/i));
    expect(
      screen.getByText(
        "Are you sure? You can't undo this action afterwards. This will delete this Health Home Core Set and all associated measures from this fiscal year's reporting."
      )
    );
  });

  test("Check whether deleting core set works", () => {
    console.log = jest.fn();
    fireEvent.click(screen.getByLabelText(/Action Menu/i));
    fireEvent.click(screen.getByText(/Delete/i));
    const inputField = screen.getByPlaceholderText("Enter 'DELETE' to confirm");
    fireEvent.change(inputField, { target: { value: "DELETE" } });
    expect(screen.getByTestId("delete-button")).not.toBeDisabled;
    fireEvent.click(screen.getByTestId("delete-button"));
    expect(console.log).toHaveBeenCalledWith("1");
  });
});

describe("Test the DeleteMenuItemAlertDialog -- Child", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    const menuLabel = "ACS";
    const KebabMenuItems: IKebabMenuItem[] = [
      {
        itemText: "Delete",
        menuLabel: "Delete for ACS",
        handleSelect: () => console.log("1"),
        type: CoreSetTableItem.Type.CHILD,
      },
    ];

    render(<KebabMenu menuLabel={menuLabel} menuItems={KebabMenuItems} />);
  });

  test("Check whether the correct dialog renders for child", () => {
    fireEvent.click(screen.getByLabelText(/Action Menu/i));
    fireEvent.click(screen.getByText(/Delete/i));
    expect(
      screen.getByText(
        "Are you sure? You can't undo this action afterwards. This will delete all Child Core Sets and their associated measures from this fiscal year's reporting."
      )
    );
  });
});
