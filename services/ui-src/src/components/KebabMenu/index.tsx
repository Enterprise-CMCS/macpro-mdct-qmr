import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { CoreSetType } from "views/StateHome/helpers";

interface Data {
  year: string;
  state: string;
  coreSet: CoreSetType;
}

export interface IKebabMenuItem {
  itemText: string;
  handleSelect: (data: Data) => void;
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
            handleSelect={i.handleSelect}
            key={uuidv4()}
          />
        ))}
      </CUI.MenuList>
    </CUI.Menu>
  );
};

const KebabMenuItem = ({ itemText, handleSelect }: IKebabMenuItem) => {
  return (
    <CUI.MenuItem
      bg="blue.500"
      color="white"
      fontWeight="bold"
      _notLast={{ borderBottomWidth: "1px" }}
      _focus={{ background: "blue.600" }}
      borderColor="white"
      minH="48px"
      // @ts-ignore
      onClick={handleSelect}
      aria-label={itemText}
    >
      <CUI.Text fontSize="sm">{itemText}</CUI.Text>
    </CUI.MenuItem>
  );
};
