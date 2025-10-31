/* eslint-disable no-console */
import { cleanString } from "utils";
import * as Labels from "./RateLabelTexts";

describe("rate label text", () => {
  it("generated ids should match hardcoded ids", () => {
    //this is only relevant for 2021 & 2022, when labels were being converted to ids
    for (let [measureAbbr, groups] of [
      ...Object.entries(Labels.RateLabel2021.data),
      ...Object.entries(Labels.RateLabel2022.data),
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

  test("Categories should have globally-unique IDs", () => {
    for (const [key, value] of Object.entries(Labels)) {
      const year = key.substring(key.length - 4);
      if (parseInt(year) > 2022) {
        const categoryIdUsage = new Map<
          string,
          { measureName: string; categoryIndex: number }
        >();

        for (const [measureName, measure] of Object.entries(value.data)) {
          for (let i = 0; i < measure.categories.length; i += 1) {
            const category = measure.categories[i];
            if (categoryIdUsage.has(category.id)) {
              const existingIdUse = categoryIdUsage.get(category.id);
              throw new Error(
                `Measure ${existingIdUse?.measureName}, category #${existingIdUse?.categoryIndex} has the same ID as ${measureName}, category #${i}.`
              );
            } else {
              categoryIdUsage.set(category.id, {
                measureName,
                categoryIndex: i,
              });
            }
          }
        }
      }
    }
  });

  test("Qualifiers should have unique IDs within each measure", () => {
    for (const [key, value] of Object.entries(Labels)) {
      const year = key.substring(key.length - 4);
      if (parseInt(year) > 2022) {
        for (const [measureName, measure] of Object.entries(value.data)) {
          if (
            measure.qualifiers.some(
              (qual, i, arr) => i !== arr.findIndex((q) => q.id === qual.id)
            )
          ) {
            throw new Error(
              `Measure ${measureName} has multiple qualifiers with the same ID.`
            );
          }
        }
      }
    }
  });
});
