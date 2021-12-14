import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "OH",
    coreSet: "ACS",
    measure: "AIF-HH",
  }),
}));

export const RouterWrappedComp: React.FC = ({ children }) => (
  <Router>{children}</Router>
);
