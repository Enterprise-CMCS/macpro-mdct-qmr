import { useEffect, useState } from "react";
import * as CUI from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

interface DeleteWrapperProps extends CUI.ColorProps {
  children: React.ReactNode;
  onDelete?: () => void;
  allowDeletion?: boolean;
  childWrapperProps?: CUI.BoxProps;
}

// export const DeleteWrapper = ({
//   children,
//   onDelete,
//   childWrapperProps,
//   color = "blue.600",
//   textColor = "blue.600",
//   allowDeletion = true,
// }: DeleteWrapperProps) => {
//   const [render, setRender] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   if (!render) return null;

//   return (
//     <CUI.HStack alignItems={"flex-start"} justifyContent={"space-between"}>
//       <CUI.Box {...childWrapperProps}>{children}</CUI.Box>
//       {allowDeletion && (
//         <CUI.HStack
//           as={"button"}
//           alignItems={"center"}
//           border={"1px"}
//           padding={2}
//           borderRadius={"md"}
//           borderColor={color}
//           data-testid="delete-wrapper"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           onClick={() => {
//             onDelete && onDelete();
//             setRender(false);
//           }}
//         >
//           {isHovered && (
//             <CUI.Text size={"sm"} color={textColor}>
//               Delete
//             </CUI.Text>
//           )}

//           <CUI.Icon color={textColor} fontSize={"xl"} as={BsTrash} />
//         </CUI.HStack>
//       )}
//     </CUI.HStack>
//   );
// };

export const DeleteWrapper = ({
  children,
  onDelete,
  childWrapperProps,
  color = "blue.600",
  textColor = "blue.600",
  allowDeletion = true,
}: DeleteWrapperProps) => {
  const [render, setRender] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    allowDeletion && setIsOpen(true);
    return () => {
      setIsOpen(false);
    };
  }, [allowDeletion]);

  if (!render) return null;

  return (
    <CUI.Popover
      eventListeners
      isOpen={isOpen}
      autoFocus={false}
      placement="right-start"
    >
      <CUI.PopoverAnchor>
        <CUI.Box {...childWrapperProps}>{children}</CUI.Box>
      </CUI.PopoverAnchor>
      <CUI.PopoverContent border={0} shadow={0} bg={"transparent"}>
        <CUI.PopoverBody
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          {allowDeletion && (
            <CUI.HStack
              as={"button"}
              alignItems={"center"}
              border={"1px"}
              padding={2}
              borderRadius={"md"}
              borderColor={color}
              data-testid="delete-wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                onDelete && onDelete();
                setIsOpen(false);
                setRender(false);
              }}
            >
              {isHovered && (
                <CUI.Text size={"sm"} color={textColor}>
                  Delete
                </CUI.Text>
              )}

              <CUI.Icon color={textColor} fontSize={"xl"} as={BsTrash} />
            </CUI.HStack>
          )}
        </CUI.PopoverBody>
      </CUI.PopoverContent>
    </CUI.Popover>
  );
};
