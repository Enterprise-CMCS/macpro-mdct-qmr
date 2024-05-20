import { useState, useRef, RefObject } from "react";
import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { CoreSetTableItem } from "components/Table/types";
import { useUser } from "hooks/authHooks";

export interface IKebabMenuItem {
  itemText: string;
  handleSelect: (data?: any) => void;
  type?: CoreSetTableItem.Type;
  headerText?: string;
  menuLabel?: string;
  modalAction?: () => void;
}

export interface KebabMenuProps {
  menuItems: IKebabMenuItem[];
  headerText?: string;
  menuLabel?: string;
}

export const VerticalKebabMenu = ({ menuItems, menuLabel }: KebabMenuProps) => {
  return (
    <CUI.VStack spacing="0.75rem" padding="0.75rem 0">
      {menuItems.map((i) => (
        <CUI.Button
          type="button"
          display="block"
          color="blue.600"
          width="100%"
          height="fit-content"
          fontSize="small"
          textAlign="left"
          textDecoration="underline"
          variant="unstyled"
          onClick={i.modalAction ?? i.handleSelect}
          aria-label={
            i.itemText ? `${i.itemText} for ${menuLabel}` : "itemText"
          }
          data-cy={i.itemText}
          key={i.itemText}
        >
          {i.itemText}
        </CUI.Button>
      ))}
    </CUI.VStack>
  );
};

export const HorizontalKebabMenu = ({
  menuItems,
  headerText,
  menuLabel,
}: KebabMenuProps) => {
  return (
    <CUI.Menu>
      <CUI.Tooltip
        label={menuLabel ? `Action Menu for ${menuLabel}` : "Action Menu"}
      >
        <CUI.MenuButton
          aria-label={
            menuLabel ? `Action Menu for ${menuLabel}` : "Action Menu"
          }
          data-cy={`${menuItems[0].type}-kebab-menu`}
        >
          <BsThreeDotsVertical />
        </CUI.MenuButton>
      </CUI.Tooltip>
      <CUI.MenuList bg="blue.500" maxW="40px" p="0">
        {menuItems.map((i) => (
          <KebabMenuItem
            menuLabel={menuLabel}
            itemText={i.itemText}
            modalAction={i.modalAction}
            handleSelect={i.handleSelect}
            headerText={headerText}
            key={uuidv4()}
            type={i.type}
          />
        ))}
      </CUI.MenuList>
    </CUI.Menu>
  );
};

export const KebabMenu = ({
  menuItems,
  headerText,
  menuLabel,
}: KebabMenuProps) => {
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const handleCloseDeleteDialog = () => setDeleteDialogIsOpen(false);
  const cancelRef = useRef();
  const { isStateUser } = useUser();

  const deleteOption = menuItems.find(
    (item) => item.itemText.toLowerCase() === "delete"
  );
  if (deleteOption) {
    deleteOption.modalAction = () => setDeleteDialogIsOpen(true);
    //remove delete button if user is not stateUser
    if (!isStateUser) menuItems.splice(menuItems.indexOf(deleteOption), 1);
  }

  return (
    <>
      <CUI.Hide below="md">
        {HorizontalKebabMenu({ menuItems, headerText, menuLabel })}
      </CUI.Hide>
      <CUI.Show below="md">
        {VerticalKebabMenu({ menuItems, headerText, menuLabel })}
      </CUI.Show>
      <DeleteMenuItemAlertDialog
        isOpen={deleteDialogIsOpen}
        onClose={handleCloseDeleteDialog}
        cancelRef={cancelRef}
        handleDelete={deleteOption?.handleSelect!}
        type={deleteOption?.type!}
        headerText={headerText}
      />
    </>
  );
};

const KebabMenuItem = ({
  itemText,
  handleSelect,
  modalAction,
  menuLabel,
}: IKebabMenuItem) => {
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
        onClick={modalAction ?? handleSelect}
        aria-label={itemText ? `${itemText} for ${menuLabel}` : "itemText"}
        data-cy={itemText}
      >
        <CUI.Text fontSize="sm">{itemText}</CUI.Text>
      </CUI.MenuItem>
    </>
  );
};

interface DeleteMenuItemAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<any>;
  handleDelete: () => void;
  headerText?: string;
  type?: CoreSetTableItem.Type;
}

// The language contained in this Alert Dialog is specific to coresets since only coresets can be deleted atm.
const DeleteMenuItemAlertDialog = ({
  isOpen,
  onClose,
  cancelRef,
  handleDelete,
  headerText,
  type,
}: DeleteMenuItemAlertDialogProps) => {
  const [userInput, setUserInput] = useState("");

  let alertBodyText = "Are you sure? You can't undo this action afterwards. ";
  if (type === CoreSetTableItem.Type.CHILD) {
    alertBodyText +=
      "This will delete all Child Core Sets and their associated measures from this fiscal year's reporting.";
  } else if (type === CoreSetTableItem.Type.HEALTH_HOME) {
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            <CUI.AlertDialogHeader fontSize="lg" fontWeight="bold">
              {headerText || "Delete Core Set"}
            </CUI.AlertDialogHeader>

            <CUI.AlertDialogBody>
              {alertBodyText}
              <CUI.Input
                mt="4"
                type="text"
                value={userInput}
                placeholder="Enter 'DELETE' to confirm"
                onChange={(e) => setUserInput(e.target.value)}
                data-cy="delete-table-item-input"
              />
              <CUI.Text fontSize="xs" fontWeight="bold">
                Enter DELETE to confirm.
              </CUI.Text>
            </CUI.AlertDialogBody>

            <CUI.AlertDialogFooter>
              <CUI.Button
                ref={cancelRef}
                onClick={onClose}
                data-cy="canel-delete-table-item-button"
              >
                Cancel
              </CUI.Button>
              <CUI.Button
                colorScheme="red"
                ml={3}
                type="submit"
                isDisabled={userInput.toLocaleLowerCase() !== "delete"}
                data-cy="delete-table-item-button"
                data-testid="delete-button"
              >
                Delete
              </CUI.Button>
            </CUI.AlertDialogFooter>
          </form>
        </CUI.AlertDialogContent>
      </CUI.AlertDialogOverlay>
    </CUI.AlertDialog>
  );
};
