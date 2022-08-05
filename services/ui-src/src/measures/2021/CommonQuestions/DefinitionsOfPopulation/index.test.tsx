import { DefinitionOfPopulation } from ".";
import { DefinitionOfPopulationData as DOP } from "utils/testUtils/testFormData";
import { testSnapshot } from "utils/testUtils/testSnapshot";

describe("Test DefinitionOfPopulation componnent", () => {
  it("(ACS) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation />;
    testSnapshot({ component, defaultValues: { defaultValues: DOP.adult } });
  });

  it("(ACS Hybrid) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation hybridMeasure />;
    testSnapshot({
      component,
      defaultValues: { defaultValues: DOP.adultHybrid },
    });
  });

  it("(CCS) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation childMeasure />;
    testSnapshot({ component, defaultValues: { defaultValues: DOP.child } });
  });

  it("(CCS Hybrid) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation childMeasure hybridMeasure />;
    testSnapshot({
      component,
      defaultValues: { defaultValues: DOP.childHybrid },
    });
  });

  it("(HHS) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation healthHomeMeasure />;
    testSnapshot({
      component,
      defaultValues: { defaultValues: DOP.healthHome },
    });
  });

  it("(HHS Hybrid) Component renders with correct content", () => {
    const component = (
      <DefinitionOfPopulation healthHomeMeasure hybridMeasure />
    );
    testSnapshot({
      component,
      defaultValues: { defaultValues: DOP.healthHomeHybrid },
    });
  });
});
