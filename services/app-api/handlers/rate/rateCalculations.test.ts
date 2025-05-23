import {
  getMeasureFromTable,
  putCombinedRatesToTable,
} from "../../storage/table";
import { RateParameters } from "../../types";
import { calculateAndPutRate } from "./rateCalculations";

jest.mock("../../storage/table", () => ({
  getMeasureFromTable: jest.fn(),
  putCombinedRatesToTable: jest.fn(),
}));

jest.mock("../../types", () => ({
  ...jest.requireActual("../../types"),
  isCoreSetAbbr: jest.fn().mockReturnValue(true),
}));

describe("Combined Rate Calculations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should not calculate a combined rate for core sets that are already combined", async () => {
    await calculateAndPutRate({ coreSet: "ACS" } as RateParameters);
    await calculateAndPutRate({ coreSet: "CCS" } as RateParameters);
    await calculateAndPutRate({ coreSet: "HHCS" } as RateParameters);

    expect(getMeasureFromTable).not.toHaveBeenCalled();
  });

  it("Should calculate combined rates for separated child core sets", async () => {
    await calculateAndPutRate({ coreSet: "CCSM" } as RateParameters);

    expect(getMeasureFromTable).toHaveBeenCalledWith(
      expect.objectContaining({ coreSet: "CCSM" })
    );
    expect(getMeasureFromTable).toHaveBeenCalledWith(
      expect.objectContaining({ coreSet: "CCSC" })
    );
    expect(putCombinedRatesToTable).toHaveBeenCalledWith(
      { coreSet: "CCS" },
      expect.any(Object)
    );
  });

  it("Should calculate combined rates for separated asult core sets", async () => {
    await calculateAndPutRate({ coreSet: "ACSC" } as RateParameters);

    expect(getMeasureFromTable).toHaveBeenCalledWith(
      expect.objectContaining({ coreSet: "ACSM" })
    );
    expect(getMeasureFromTable).toHaveBeenCalledWith(
      expect.objectContaining({ coreSet: "ACSC" })
    );
    expect(putCombinedRatesToTable).toHaveBeenCalledWith(
      { coreSet: "ACS" },
      expect.any(Object)
    );
  });
});
