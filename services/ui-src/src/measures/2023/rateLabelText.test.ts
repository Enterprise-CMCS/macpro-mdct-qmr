import { data } from "./rateLabelText";

describe("Rate Label Data", () => {
  test("Categories should have globally-unique IDs", () => {
    const categoryIdUsage = new Map<
      string,
      { measureName: string; categoryIndex: number }
    >();
    for (const [measureName, measure] of Object.entries(data)) {
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
  });

  test("Qualifiers should have unique IDs within each measure", () => {
    for (const [measureName, measure] of Object.entries(data)) {
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
  });
});
