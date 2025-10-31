import React, { useState } from "react";
import * as CUI from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

interface DeleteWrapperProps extends CUI.ColorProps {
  children: React.ReactNode;
  onDelete?: () => void;
  allowDeletion?: boolean;
  childWrapperProps?: CUI.BoxProps;
  showText?: boolean;
  deleteLabel?: string;
}

export const DeleteWrapper = ({
  children,
  onDelete,
  childWrapperProps,
  color = "blue.600",
  textColor = "blue.600",
  showText = true,
  allowDeletion,
  deleteLabel,
}: DeleteWrapperProps) => {
  const [render, setRender] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!render) return null;

  return (
    <CUI.Box
      position="relative"
      {...childWrapperProps}
      className="prince-option-label-wrapper"
    >
      {children}
      {allowDeletion && (
        <CUI.Tooltip
          hasArrow
          label={deleteLabel ? `Delete ${deleteLabel}` : "Delete Field"}
        >
          <CUI.HStack
            id={"delete-button-stack"}
            top={0}
            right={showText ? "0" : "-3rem"}
            zIndex={2}
            position={"absolute"}
            padding={2}
            as={"button"}
            className="hidden-print-items disabled-print-preview-items"
            borderColor={isHovered ? "red.700" : color}
            alignItems={"center"}
            data-testid="delete-wrapper"
            aria-label={deleteLabel ? `Delete ${deleteLabel}` : "Delete Field"}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              onDelete && onDelete();
              setRender(false);
            }}
          >
            <CUI.Icon color={textColor} fontSize={"xl"} as={BsTrash} />
          </CUI.HStack>
        </CUI.Tooltip>
      )}
    </CUI.Box>
  );
};
