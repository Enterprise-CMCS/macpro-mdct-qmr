import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { useApiMock } from "utils/testUtils/useApiMock";
import { RouterWrappedComp } from "utils/testing";
import { CombinedRatesMeasure } from "views";
expect.extend(toHaveNoViolations);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2024",
    state: "OH",
  }),
}));

describe("Test CombinedRatesMeasure", () => {
  it("renders", () => {
    render(
      <RouterWrappedComp>
        <CombinedRatesMeasure
          year={"2024"}
          measureId={"AAB-AD"}
          measureName={
            "Avoidance of Antibiotic Treatment for Acute Bronchitis/Bronchiolitis: Age 18 And Older"
          }
        />
      </RouterWrappedComp>
    );
    expect(
      screen.getByText("Measures used to calculate combined rates:")
    ).toBeVisible();
  });
});

describe("Test accessibility", () => {
  it("passes a11y tests", async () => {
    useApiMock({});
    const { container } = render(
      <RouterWrappedComp>
        <CombinedRatesMeasure
          year={"2024"}
          measureId={"AAB-AD"}
          measureName={
            "Avoidance of Antibiotic Treatment for Acute Bronchitis/Bronchiolitis: Age 18 And Older"
          }
        />
      </RouterWrappedComp>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
