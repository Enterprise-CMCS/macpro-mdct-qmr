import { areObjectsDifferent, rateIsReadOnly } from "./form";

const mockGetMeasureYear = jest.fn();
jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: () => mockGetMeasureYear(),
}));

describe("Test rateIsReadOnly()", () => {
  test("should return default false if nothing is selected in 2025", () => {
    mockGetMeasureYear.mockReturnValue(2025);
    const isReadOnly = rateIsReadOnly([undefined, undefined]);
    expect(isReadOnly).toBe(false);
  });
  test("should return true if AdministrativeData is selected in 2025", () => {
    mockGetMeasureYear.mockReturnValue(2025);
    const isReadOnly = rateIsReadOnly([["AdministrativeData"], undefined]);
    expect(isReadOnly).toBe(true);
  });

  test("should return false if ElectronicHealthRecords is selected in 2025", () => {
    mockGetMeasureYear.mockReturnValue(2025);
    const isReadOnly = rateIsReadOnly([["ElectronicHealthRecords"], undefined]);
    expect(isReadOnly).toBe(false);
  });

  test("should return default true if nothing is selected in 2026", () => {
    mockGetMeasureYear.mockReturnValue(2026);
    const isReadOnly = rateIsReadOnly([undefined, undefined]);
    expect(isReadOnly).toBe(true);
  });
  test("should return true if AdministrativeData is selected in 2026", () => {
    mockGetMeasureYear.mockReturnValue(2026);
    const isReadOnly = rateIsReadOnly([["AdministrativeData"], undefined]);
    expect(isReadOnly).toBe(true);
  });
  test("should return false if HybridAdministrativeandMedicalRecordsData is selected in 2026", () => {
    mockGetMeasureYear.mockReturnValue(2026);
    const isReadOnly = rateIsReadOnly([
      ["HybridAdministrativeandMedicalRecordsData"],
      undefined,
    ]);
    expect(isReadOnly).toBe(false);
  });

  test("should return false if multiple Data Sources are selected in 2026", () => {
    mockGetMeasureYear.mockReturnValue(2026);
    const isReadOnly = rateIsReadOnly([
      ["HybridAdministrativeandMedicalRecordsData", "AdministrativeData"],
      undefined,
    ]);
    expect(isReadOnly).toBe(false);
  });

  test("should return false if multiple nested Data Sources are selected in 2026", () => {
    mockGetMeasureYear.mockReturnValue(2026);
    const isReadOnly = rateIsReadOnly([
      ["AdministrativeData"],
      {
        AdministrativeData0: {
          selected: ["AdministrativeData", "ElectronicHealthRecords"],
        },
      },
    ]);
    expect(isReadOnly).toBe(false);
  });
});

describe("Test areObjectsDifferent", () => {
  const objA = {
    measure: "AAB-AD",
    status: "completed",
    data: { pm: [{ label: "test 1", numerator: "2" }] },
  };
  const objB = {
    status: "completed",
    measure: "AAB-AD",
    data: { pm: [{ label: "test 1", numerator: "2" }] },
  };
  const objC = {
    status: "completed",
    measure: "AAB-AD",
    data: { pm: [{ label: "test 1", numerator: "4" }] },
  };
  test("should return false when comparing the same two objects", () => {
    const isDiff = areObjectsDifferent(objA, objB);
    expect(isDiff).toBe(false);
  });
  test("should return true when comparing two different objects", () => {
    const isDiff = areObjectsDifferent(objA, objC);
    expect(isDiff).toBe(true);
  });
});
