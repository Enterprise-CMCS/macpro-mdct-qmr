import { render } from "@testing-library/react";
import * as QMR from "components";
import { RouterWrappedComp } from "utils/testing";
import { StateLayout } from "./";

describe("Test State Layout Component", () => {
  it("renders the state layout component", () => {
    const { getByTestId } = render(
      <RouterWrappedComp>
        <StateLayout
          breadcrumbItems={[{ path: `/OH/2021`, name: `FFY 2021` }]}
          buttons={<QMR.MeasureButtons handleSave={() => {}} />}
        />
      </RouterWrappedComp>
    );
    expect(getByTestId("state-layout-container")).toBeVisible();
  });

  it("renders the measure buttons", () => {
    const { getByTestId } = render(
      <RouterWrappedComp>
        <StateLayout
          breadcrumbItems={[{ path: `/OH/2021`, name: `FFY 2021` }]}
          buttons={
            <QMR.MeasureButtons
              handleSave={() => {}}
              lastAltered={1643771392904}
            />
          }
        />
      </RouterWrappedComp>
    );
    expect(getByTestId("last-saved-text")).toBeVisible();
  });
});
