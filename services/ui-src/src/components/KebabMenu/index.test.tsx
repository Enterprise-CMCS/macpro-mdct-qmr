import { render, screen, fireEvent } from "@testing-library/react";
import { IKebabMenuItem, KebabMenu } from ".";

describe("Test the KebabMenu component", () => {
  const KebabMenuItems: IKebabMenuItem[] = [
    { itemText: "Edit", handleSelect: () => console.log("1") },
    { itemText: "Export", handleSelect: () => console.log("2") },
    {
      itemText: "Clear Measure Entries",
      handleSelect: () => console.log("3"),
    },
  ];

  test("Check whether the component renders", () => {
    const { getByLabelText } = render(<KebabMenu menuItems={KebabMenuItems} />);
    expect(getByLabelText(/Action Menu/i));
  });

  test("Check menu click event populates menu item", () => {
    const { getByLabelText } = render(<KebabMenu menuItems={KebabMenuItems} />);
    fireEvent.click(getByLabelText(/Action Menu/i));
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  test("Check menu item click event calls the callback function", () => {
    const { getByLabelText } = render(<KebabMenu menuItems={KebabMenuItems} />);
    console.log = jest.fn();
    fireEvent.click(getByLabelText(/Action Menu/i));
    fireEvent.click(screen.getByText(/Edit/i));
    expect(console.log).toHaveBeenCalledWith("1");
  });
});
