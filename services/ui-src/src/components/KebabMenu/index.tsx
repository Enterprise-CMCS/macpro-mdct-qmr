import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export interface IKebabMenuItem {
  itemText: string;
  itemIndex: number;
}
export interface KebabMenuProps {
  menuItems: IKebabMenuItem[];
  handleItemClick: (itemIndex: number) => void;
}
interface KebabMenuItemProps {
  itemText: string;
  itemIndex: number;
  handleItemClick: (itemIndex: number) => void;
}
export const KebabMenu = ({ menuItems, handleItemClick }: KebabMenuProps) => {
  return (
    <CUI.Menu>
      <CUI.MenuButton aria-label="Action Menu">
        <BsThreeDotsVertical />
      </CUI.MenuButton>
      <CUI.MenuList bg="blue.500" maxW="40px" p="0">
        {menuItems.map((i) => (
          <KebabMenuItem
            itemText={i.itemText}
            itemIndex={i.itemIndex}
            handleItemClick={handleItemClick}
            key={i.itemIndex}
          />
        ))}
      </CUI.MenuList>
    </CUI.Menu>
  );
};

const KebabMenuItem = ({
  itemText,
  itemIndex,
  handleItemClick,
}: KebabMenuItemProps) => {
  return (
    <CUI.MenuItem
      bg="blue.500"
      color="white"
      fontWeight="bold"
      _notLast={{ borderBottomWidth: "1px" }}
      _focus={{ background: "blue.600" }}
      borderColor="white"
      minH="48px"
      onClick={() => handleItemClick(itemIndex)}
      aria-label={itemText}
      key={itemIndex}
    >
      <CUI.Text fontSize="sm">{itemText}</CUI.Text>
    </CUI.MenuItem>
  );
};
