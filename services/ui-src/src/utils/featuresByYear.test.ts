import { featuresByYear } from "./featuresByYear";
import { getMeasureYear } from "./getMeasureYear";

jest.mock("./getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

const mockGetMeasureYear = getMeasureYear as jest.Mock;

describe("featuresByYear stratification banner flags", () => {
  it("disables both flags before 2026", () => {
    mockGetMeasureYear.mockReturnValue(2025);

    expect(featuresByYear.showStratificationSectionBanner).toBe(false);
    expect(featuresByYear.hasTailoredStratificationBanner).toBe(false);
  });

  it("enables both flags in 2026 and later", () => {
    mockGetMeasureYear.mockReturnValue(2026);

    expect(featuresByYear.showStratificationSectionBanner).toBe(true);
    expect(featuresByYear.hasTailoredStratificationBanner).toBe(true);
  });

  it("uses updated complete measure copy in 2026 and later", () => {
    mockGetMeasureYear.mockReturnValue(2026);

    expect(featuresByYear.hasUpdatedCompleteMeasureCopy).toBe(true);
  });

  it("uses legacy complete measure copy before 2026", () => {
    mockGetMeasureYear.mockReturnValue(2025);

    expect(featuresByYear.hasUpdatedCompleteMeasureCopy).toBe(false);
  });
});
