import { render, screen, fireEvent } from "@testing-library/react";
import { IKebabMenuItem, KebabMenu } from ".";

describe("Test the KebabMenu component", () => {
  const KebabMenuItems: IKebabMenuItem[] = [
    { itemText: "Edit", itemIndex: 1 },
    { itemText: "Export", itemIndex: 2 },
    { itemText: "Clear Measure Entries", itemIndex: 3 },
  ];

  const kebabMenuItemClick = (itemIndex: number) =>
    console.log(`You have selected item # ${itemIndex}`);

  test("Check whether the component renders", () => {
    const { getByLabelText } = render(
      <KebabMenu
        menuItems={KebabMenuItems}
        handleItemClick={kebabMenuItemClick}
      />
    );
    expect(getByLabelText(/Action menu/i));
  });

  test("Check menu click event populates menu item", () => {
    const { getByLabelText } = render(
      <KebabMenu
        menuItems={KebabMenuItems}
        handleItemClick={kebabMenuItemClick}
      />
    );
    fireEvent.click(getByLabelText(/Action menu/i));
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  test("Check menu item click event calls the callback function", () => {
    const { getByLabelText } = render(
      <KebabMenu
        menuItems={KebabMenuItems}
        handleItemClick={kebabMenuItemClick}
      />
    );
    console.log = jest.fn();
    fireEvent.click(getByLabelText(/Action menu/i));
    fireEvent.click(screen.getByText(/Edit/i));
    expect(console.log).toHaveBeenCalledWith("You have selected item # 1");
  });
});
