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
          buttons={
            <QMR.MeasureButtons
              handleSave={() => {}}
              handleSubmit={() => {}}
              lastSavedText="Saved Moments Ago"
            />
          }
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
              handleSubmit={() => {}}
              lastSavedText="Saved Moments Ago"
            />
          }
        />
      </RouterWrappedComp>
    );
    expect(getByTestId("last-saved-text")).toBeVisible();
  });
});
