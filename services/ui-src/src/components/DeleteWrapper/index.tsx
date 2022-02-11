import { useState } from "react";
import * as CUI from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

interface DeleteWrapperProps extends CUI.ColorProps {
  children: React.ReactNode;
  onDelete?: () => void;
  allowDeletion?: boolean;
  childWrapperProps?: CUI.BoxProps;
}

export const DeleteWrapper = ({
  children,
  onDelete,
  childWrapperProps,
  color = "blue.600",
  textColor = "blue.600",
  allowDeletion,
}: DeleteWrapperProps) => {
  const [render, setRender] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!render) return null;

  return (
    <CUI.Box position="relative" {...childWrapperProps}>
      {allowDeletion && (
        <CUI.HStack
          top={0}
          right={0}
          zIndex={2}
          position={"absolute"}
          padding={2}
          as={"button"}
          borderColor={isHovered ? "red.700" : color}
          alignItems={"center"}
          data-testid="delete-wrapper"
          aria-label="Delete Field"
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            onDelete && onDelete();
            setRender(false);
          }}
        >
          <CUI.Icon
            color={isHovered ? "red.700" : textColor}
            fontSize={"lg"}
            as={BsTrash}
            transition={"linear 0.1s color"}
          />
        </CUI.HStack>
      )}
      {children}
    </CUI.Box>
  );
};
