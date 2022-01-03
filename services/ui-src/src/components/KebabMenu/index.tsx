import { useState, useRef, RefObject } from "react";
import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { CoreSetTableItem } from "components/Table/types";

export interface IKebabMenuItem {
  itemText: string;
  handleSelect: () => void;
  type?: CoreSetTableItem.Type;
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
            type={i.type}
          />
        ))}
      </CUI.MenuList>
    </CUI.Menu>
  );
};

const KebabMenuItem = ({ itemText, handleSelect, type }: IKebabMenuItem) => {
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const handleCloseDeleteDialog = () => setDeleteDialogIsOpen(false);
  const cancelRef = useRef();

  return (
    <>
      <CUI.MenuItem
        bg="blue.500"
        color="white"
        fontWeight="bold"
        _notLast={{ borderBottomWidth: "1px" }}
        _focus={{ background: "blue.600" }}
        borderColor="white"
        minH="48px"
        // @ts-ignore
        onClick={
          itemText.toLocaleLowerCase() === "delete"
            ? () => setDeleteDialogIsOpen(true)
            : handleSelect
        }
        aria-label={itemText}
      >
        <CUI.Text fontSize="sm">{itemText}</CUI.Text>
      </CUI.MenuItem>
      <DeleteMenuItemAlertDialog
        isOpen={deleteDialogIsOpen}
        onClose={handleCloseDeleteDialog}
        cancelRef={cancelRef}
        handleDelete={handleSelect}
        type={type}
      />
    </>
  );
};

interface DeleteMenuItemAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<any>;
  handleDelete: () => void;
  type?: CoreSetTableItem.Type;
}

// The language contained in this Alert Dialog is specific to coresets since only coresets can be deleted atm.
const DeleteMenuItemAlertDialog = ({
  isOpen,
  onClose,
  cancelRef,
  handleDelete,
  type,
}: DeleteMenuItemAlertDialogProps) => {
  const [userInput, setUserInput] = useState("");

  let alertBodyText = "Are you sure? You can't undo this action afterwards. ";
  if (type === CoreSetTableItem.Type.CHILD) {
    alertBodyText +=
      "This will delete all Child Core Sets and their associated measures from this fiscal year's reporting.";
  } else if (type === CoreSetTableItem.Type.HEALTH_HOMES) {
    alertBodyText +=
      "This will delete this Health Home Core Set and all associated measures from this fiscal year's reporting.";
  }

  return (
    <CUI.AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <CUI.AlertDialogOverlay>
        <CUI.AlertDialogContent>
          <CUI.AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Core Set
          </CUI.AlertDialogHeader>

          <CUI.AlertDialogBody>
            {alertBodyText}
            <CUI.Input
              mt="4"
              value={userInput}
              placeholder="Type DELETE to confirm"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </CUI.AlertDialogBody>

          <CUI.AlertDialogFooter>
            <CUI.Button ref={cancelRef} onClick={onClose}>
              Cancel
            </CUI.Button>
            <CUI.Button
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              isDisabled={userInput !== "DELETE"}
            >
              Delete
            </CUI.Button>
          </CUI.AlertDialogFooter>
        </CUI.AlertDialogContent>
      </CUI.AlertDialogOverlay>
    </CUI.AlertDialog>
  );
};
