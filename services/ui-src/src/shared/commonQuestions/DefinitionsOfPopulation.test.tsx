import { DefinitionOfPopulation } from "./DefinitionsOfPopulation";
import { DefinitionOfPopulationData as DOP } from "utils/testUtils/testFormData";
import { testSnapshot } from "utils/testUtils/testSnapshot";
import SharedContext from "shared/SharedContext";
import commonQuestionsLabel from "labels/2024/commonQuestionsLabel";

describe("Test DefinitionOfPopulation componnent", () => {
  it("(ACS) Component renders with correct content", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DefinitionOfPopulation />
      </SharedContext.Provider>
    );
    testSnapshot({ component, defaultValues: DOP.adult });
  });

  it("(ACS Hybrid) Component renders with correct content", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DefinitionOfPopulation hybridMeasure />
      </SharedContext.Provider>
    );
    testSnapshot({ component, defaultValues: DOP.adultHybrid });
  });

  it("(CCS) Component renders with correct content", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DefinitionOfPopulation childMeasure />
      </SharedContext.Provider>
    );
    testSnapshot({ component, defaultValues: DOP.child });
  });

  it("(CCS Hybrid) Component renders with correct content", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DefinitionOfPopulation childMeasure hybridMeasure />
      </SharedContext.Provider>
    );
    testSnapshot({ component, defaultValues: DOP.childHybrid });
  });

  it("(HHS) Component renders with correct content", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DefinitionOfPopulation healthHomeMeasure />
      </SharedContext.Provider>
    );
    testSnapshot({ component, defaultValues: DOP.healthHome });
  });

  it("(HHS Hybrid) Component renders with correct content", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DefinitionOfPopulation healthHomeMeasure hybridMeasure />
      </SharedContext.Provider>
    );
    testSnapshot({ component, defaultValues: DOP.healthHomeHybrid });
  });
});
