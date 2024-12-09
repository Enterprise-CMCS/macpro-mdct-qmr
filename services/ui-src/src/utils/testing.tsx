import { PropsWithChildren } from "react";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
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
