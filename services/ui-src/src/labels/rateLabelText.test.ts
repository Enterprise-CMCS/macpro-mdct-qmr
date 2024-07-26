import { cleanString } from "utils";
import * as Labels from "./RateLabelTexts";

describe("rate label text", () => {
  it("generated ids should match hardcoded ids", () => {
    for (let [measureAbbr, groups] of [
      ...Object.entries(Labels.RateLabel2021.data),
      ...Object.entries(Labels.RateLabel2021.data),
    ]) {
      const mismatches = [];
      for (let groupType of ["categories", "qualifiers"] as const) {
        for (let group of groups[groupType]) {
          const cleanLabel = cleanString(group.label);
          const id = group.id;
          if (cleanLabel !== id) {
            mismatches.push({ measureAbbr, groupType, cleanLabel, id });
          }
        }
      }
      if (mismatches.length > 0) {
        console.error(JSON.stringify(mismatches));
        throw new Error("Mismatch(es) detected! See console output");
      }
    }
  });
});
