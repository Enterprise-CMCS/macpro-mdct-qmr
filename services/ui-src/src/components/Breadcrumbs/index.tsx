import * as CUI from "@chakra-ui/react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

export type BreadCrumbItems = {
  path: string;
  name: string;
}[];

interface Props {
  items: BreadCrumbItems;
  color: "inherit" | "white";
}

export const Breadcrumbs = ({ items, color }: Props) => {
  const isMultipleItems = items.length > 1;

  return (
    <CUI.Flex>
      {isMultipleItems && (
        <CUI.Center fontSize="2xl" mr="4">
          <Link
            to={items[items.length - 2].path}
            aria-label="Return to measures list"
          >
            <HiOutlineChevronLeft className="hidden-print-items" />
          </Link>
        </CUI.Center>
      )}
      <CUI.HStack>
        {items?.map((item, idx) => (
          <CUI.Heading
            size="md"
            minW={idx === 0 ? "max-content" : "none"}
            as={idx === items.length - 1 ? "h1" : Link}
            // @ts-ignore
            to={item.path}
            color={color}
            _visited={{ color }}
            key={`${idx}-${item.path}`}
          >
            {item.name}
          </CUI.Heading>
        ))}
      </CUI.HStack>
    </CUI.Flex>
  );
};
