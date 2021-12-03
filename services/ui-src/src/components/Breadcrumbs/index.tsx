// import { Breadcrumb } from "react-bootstrap";
import * as CUI from "@chakra-ui/react";
import { Link, useRouteMatch } from "react-router-dom";
import { routes } from "Routes";
// import "./index.css";

export const Breadcrumbs = () => {
  const route = useRouteMatch();

  const items = routes
    .filter(({ path }) => route.path.includes(path as string))
    .map(({ path, ...rest }) => ({
      path: Object.keys(route.params).length
        ? Object.keys(route.params).reduce(
            // @ts-ignore
            (path, param) => path?.replace(`:${param}`, route.params[param]),
            path
          )
        : path,
      ...rest,
    }));

  return (
    <CUI.Breadcrumb>
      {items.map((item, idx) => (
        <CUI.BreadcrumbItem active={idx + 1 === items.length}>
          <CUI.BreadcrumbLink as={Link} to={item.path || ""}>
            {item.name}
          </CUI.BreadcrumbLink>
        </CUI.BreadcrumbItem>
      ))}
    </CUI.Breadcrumb>
  );
};
