import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";
import {
  exampleCoreSetData,
  coreSetColumns,
  exampleMeasuresData,
  measuresColumns,
  Table,
} from "../";

const WrappedDemoComponents = ({ props }: any) => (
  <Router>
    <Table {...props} />
  </Router>
);

describe("Test Table Component", () => {
  it("renders coreset table correctly", () => {
    const el = render(
      <WrappedDemoComponents
        data={exampleCoreSetData}
        columns={coreSetColumns}
      />
    );
    expect(el).toMatchSnapshot();
  });

  it("renders measures table correctly", () => {
    const el = render(
      <WrappedDemoComponents
        data={exampleMeasuresData}
        columns={measuresColumns}
      />
    );
    expect(el).toMatchSnapshot();
  });
});
