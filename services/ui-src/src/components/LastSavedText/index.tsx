import { formatDistanceToNow } from "date-fns";
import * as CUI from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

interface Props {
  lastAltered?: number;
  isSubmitted?: boolean;
}
export const LastSavedText = ({ lastAltered, isSubmitted }: Props) => {
  if (!lastAltered) return null;
  const lastAlteredText = formatDistanceToNow(new Date(lastAltered), {
    addSuffix: true,
  });
  return (
    <CUI.Flex justifyContent="center" data-testid="circle-check-icon">
      <CUI.Box mt="1">
        <FaCheck />
      </CUI.Box>
      <CUI.Text ml="2" fontSize="sm" id="last-saved-text">
        {`${isSubmitted ? "Submitted" : "Saved"} ${lastAlteredText}`}
      </CUI.Text>
    </CUI.Flex>
  );
};
