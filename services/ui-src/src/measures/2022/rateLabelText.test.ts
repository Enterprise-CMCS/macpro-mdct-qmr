import { cleanString } from "utils";
import { data } from "./rateLabelText";

describe("rate label text", () => {
  it("generated ids should match hardcoded ids", () => {
    for (let [measureAbbr, groups] of Object.entries(data)) {
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
