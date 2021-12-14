import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export interface IKebabMenuItem {
  itemText: string;
  id: string;
  handleSelect: (id: string) => void;
}
export interface KebabMenuProps {
  menuItems: IKebabMenuItem[];
}

export const KebabMenu = ({ menuItems }: KebabMenuProps) => {
  return (
    <CUI.Menu>
      <CUI.MenuButton aria-label="Action Menu">
        <BsThreeDotsVertical />
      </CUI.MenuButton>
      <CUI.MenuList bg="blue.500" maxW="40px" p="0">
        {menuItems.map((i) => (
          <KebabMenuItem
            itemText={i.itemText}
            id={i.id}
            handleSelect={i.handleSelect}
          />
        ))}
      </CUI.MenuList>
    </CUI.Menu>
  );
};

const KebabMenuItem = ({ itemText, id, handleSelect }: IKebabMenuItem) => {
  return (
    <CUI.MenuItem
      bg="blue.500"
      color="white"
      fontWeight="bold"
      _notLast={{ borderBottomWidth: "1px" }}
      _focus={{ background: "blue.600" }}
      borderColor="white"
      minH="48px"
      onClick={() => handleSelect(id)}
      aria-label={itemText}
      key={id}
    >
      <CUI.Text fontSize="sm">{itemText}</CUI.Text>
    </CUI.MenuItem>
  );
};
