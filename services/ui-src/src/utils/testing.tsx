import { PropsWithChildren } from "react";
import { BrowserRouter as Router } from "react-router";

jest.mock("react-router", () => {
  return {
    ...jest.requireActual("react-router"),
    useParams: jest.fn().mockReturnValue({
      year: "2021",
      state: "OH",
      coreSetId: "ACS",
      measureId: "FUH-AD",
    }),
  };
});

export const RouterWrappedComp: React.FC<PropsWithChildren> = ({
  children,
}) => <Router>{children}</Router>;
