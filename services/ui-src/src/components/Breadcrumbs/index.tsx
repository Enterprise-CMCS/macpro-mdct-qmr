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
        <CUI.Box fontSize="2xl" mr="4">
          <Link to={items[items.length - 2].path}>
            <HiOutlineChevronLeft />
          </Link>
        </CUI.Box>
      )}
      <CUI.Breadcrumb color={color} separator="">
        {items?.map((item, idx) => (
          <CUI.BreadcrumbItem
            isCurrentPage={idx + 1 === items.length}
            key={item.name}
          >
            <CUI.BreadcrumbLink
              as={Link}
              to={item.path || ""}
              _hover={{ color }}
            >
              <CUI.Heading size="md">{item.name}</CUI.Heading>
            </CUI.BreadcrumbLink>
          </CUI.BreadcrumbItem>
        ))}
      </CUI.Breadcrumb>
    </CUI.Flex>
  );
};
