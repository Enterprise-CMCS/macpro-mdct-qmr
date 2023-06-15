import { render, screen, fireEvent } from "@testing-library/react";
import { IKebabMenuItem, KebabMenu } from ".";

describe("Test the KebabMenu component", () => {
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

  test("Check whether the component renders", () => {
    const { getByLabelText } = render(
      <KebabMenu menuLabel={menuLabel} menuItems={KebabMenuItems} />
    );
    expect(getByLabelText(/Action Menu/i));
  });

  test("Check menu click event populates menu item", () => {
    const { getByLabelText } = render(
      <KebabMenu menuLabel={menuLabel} menuItems={KebabMenuItems} />
    );
    fireEvent.click(getByLabelText(/Action Menu/i));
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  test("Check menu item click event calls the callback function", () => {
    const { getByLabelText } = render(
      <KebabMenu menuLabel={menuLabel} menuItems={KebabMenuItems} />
    );
    console.log = jest.fn();
    fireEvent.click(getByLabelText(/Action Menu/i));
    fireEvent.click(screen.getByText(/Edit/i));
    expect(console.log).toHaveBeenCalledWith("1");
  });

  test("Should show descriptive aria label", () => {
    const { getByLabelText } = render(
      <KebabMenu menuLabel={menuLabel} menuItems={KebabMenuItems} />
    );
    fireEvent.click(getByLabelText(/Action Menu/i));
    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByLabelText(/Edit for ACS/i)).toBeInTheDocument();
  });
});
