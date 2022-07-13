import { DefinitionOfPopulation } from ".";
import { testSnapshot } from "utils/testUtils/testSnapshot";

describe("Test DefinitionOfPopulation componnent", () => {
  it("(ACS) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation />;
    testSnapshot(component, { defaultValues: adult });
  });

  it("(ACS Hybrid) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation hybridMeasure />;
    testSnapshot(component, { defaultValues: adultHybrid });
  });

  it("(CCS) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation childMeasure />;
    testSnapshot(component, { defaultValues: child });
  });

  it("(CCS Hybrid) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation childMeasure hybridMeasure />;
    testSnapshot(component, { defaultValues: childHybrid });
  });

  it("(HHS) Component renders with correct content", () => {
    const component = <DefinitionOfPopulation healthHomeMeasure />;
    testSnapshot(component, { defaultValues: healthHome });
  });

  it("(HHS Hybrid) Component renders with correct content", () => {
    const component = (
      <DefinitionOfPopulation healthHomeMeasure hybridMeasure />
    );
    testSnapshot(component, { defaultValues: healthHomeHybrid });
  });
});

const adult = {
  "DenominatorDefineTotalTechSpec-No-Explanation": "Another one bites the dust",
  "DeliverySys-Other-Percent": "12",
  "DeliverySys-PrimaryCareManagement-No-Percent": "12",
  DeliverySysRepresentationDenominator: [
    "FFS",
    "PCCM",
    "MCO-PIHP",
    "ICM",
    "Other",
  ],
  DefinitionOfDenominator: [
    "DenominatorIncMedicaidPop",
    "DenominatorIncCHIP",
    "DenominatorIncMedicareMedicaidDualEligible",
    "DenominatorIncOther",
  ],
  "DenominatorDefineTotalTechSpec-No-Size": "1234567890",
  "DeliverySys-MCO_PIHP-No-Excluded": "1234567890",
  "DeliverySys-IntegratedCareModel-No-Population": "1234567890",
  ChangeInPopulationExplanation: "dun dun dun",
  "DeliverySys-MCO_PIHP-NumberOfPlans": "1234567890",
  "DeliverySys-FeeForService-No-Percent": "12",
  "DeliverySys-IntegratedCareModel": "no",
  "DeliverySys-Other-NumberOfHealthPlans": "1234567890",
  "DefinitionOfDenominator-Other": "Another one bites the dust",
  DenominatorDefineTotalTechSpec: "no",
  "DeliverySys-MCO_PIHP": "no",
  "DeliverySys-MCO_PIHP-No-Included": "12",
  "DeliverySys-PrimaryCareManagement": "no",
  "DeliverySys-IntegratedCareModel-No-Percent": "12",
  "DeliverySys-Other": "Another one bites the dust",
  "DeliverySys-FeeForService": "no",
};

const adultHybrid = {
  "DeliverySys-Other-Percent": "12",
  "DeliverySys-PrimaryCareManagement-No-Percent": "12",
  HybridMeasurePopulationIncluded: "1234567890",
  "DenominatorDefineTotalTechSpec-No-Size": "1234567890",
  ChangeInPopulationExplanation: "dun dun dun",
  "DeliverySys-FeeForService-No-Percent": "12",
  "DeliverySys-IntegratedCareModel": "no",
  "DeliverySys-Other-NumberOfHealthPlans": "1234567890",
  DenominatorDefineTotalTechSpec: "no",
  "DeliverySys-MCO_PIHP-No-Included": "12",
  "DeliverySys-PrimaryCareManagement": "no",
  "DeliverySys-Other": "Another one bites the dust",
  "DeliverySys-FeeForService": "no",
  "DenominatorDefineTotalTechSpec-No-Explanation": "Another one bites the dust",
  DeliverySysRepresentationDenominator: [
    "FFS",
    "PCCM",
    "MCO-PIHP",
    "ICM",
    "Other",
  ],
  DefinitionOfDenominator: [
    "DenominatorIncMedicaidPop",
    "DenominatorIncCHIP",
    "DenominatorIncMedicareMedicaidDualEligible",
    "DenominatorIncOther",
  ],
  HybridMeasureSampleSize: "1234567890",
  "DeliverySys-MCO_PIHP-No-Excluded": "1234567890",
  "DeliverySys-IntegratedCareModel-No-Population": "1234567890",
  "DeliverySys-MCO_PIHP-NumberOfPlans": "1234567890",
  "DefinitionOfDenominator-Other": "Another one bites the dust",
  "DeliverySys-MCO_PIHP": "no",
  "DeliverySys-IntegratedCareModel-No-Percent": "12",
};

const child = {
  "DenominatorDefineTotalTechSpec-No-Explanation": "Another one bites the dust",
  "DeliverySys-Other-Percent": "12",
  "DeliverySys-PrimaryCareManagement-No-Percent": "12",
  DeliverySysRepresentationDenominator: [
    "FFS",
    "PCCM",
    "MCO-PIHP",
    "ICM",
    "Other",
  ],
  DefinitionOfDenominator: ["DenominatorIncMedicaidAndCHIPPop"],
  "DenominatorDefineTotalTechSpec-No-Size": "1234567890",
  "DeliverySys-MCO_PIHP-No-Excluded": "1234567890",
  "DeliverySys-IntegratedCareModel-No-Population": "1234567890",
  ChangeInPopulationExplanation: "Another one bites the dust",
  "DeliverySys-MCO_PIHP-NumberOfPlans": "1234567890",
  "DeliverySys-FeeForService-No-Percent": "12",
  "DeliverySys-IntegratedCareModel": "no",
  "DeliverySys-Other-NumberOfHealthPlans": "1234567890",
  DenominatorDefineTotalTechSpec: "no",
  "DeliverySys-MCO_PIHP": "no",
  "DeliverySys-MCO_PIHP-No-Included": "12",
  "DeliverySys-PrimaryCareManagement": "no",
  "DeliverySys-Other": "Another one bites the dust",
  "DeliverySys-IntegratedCareModel-No-Percent": "12",
  "DeliverySys-FeeForService": "no",
};

const childHybrid = {
  "DenominatorDefineTotalTechSpec-No-Explanation": "Another one bites the dust",
  "DeliverySys-Other-Percent": "12",
  "DeliverySys-PrimaryCareManagement-No-Percent": "12",
  HybridMeasurePopulationIncluded: "1234567890",
  DeliverySysRepresentationDenominator: [
    "FFS",
    "PCCM",
    "MCO-PIHP",
    "ICM",
    "Other",
  ],
  DefinitionOfDenominator: ["DenominatorIncMedicaidAndCHIPPop"],
  "DenominatorDefineTotalTechSpec-No-Size": "1234567890",
  HybridMeasureSampleSize: "1234567890",
  "DeliverySys-MCO_PIHP-No-Excluded": "1234567890",
  "DeliverySys-IntegratedCareModel-No-Population": "1234567890",
  ChangeInPopulationExplanation: "Another one bites the dust",
  "DeliverySys-MCO_PIHP-NumberOfPlans": "1234567890",
  "DeliverySys-FeeForService-No-Percent": "12",
  "DeliverySys-IntegratedCareModel": "no",
  "DeliverySys-Other-NumberOfHealthPlans": "1234567890",
  DenominatorDefineTotalTechSpec: "no",
  "DeliverySys-MCO_PIHP": "no",
  "DeliverySys-MCO_PIHP-No-Included": "12",
  "DeliverySys-PrimaryCareManagement": "no",
  "DeliverySys-IntegratedCareModel-No-Percent": "12",
  "DeliverySys-Other": "Another one bites the dust",
  "DeliverySys-FeeForService": "no",
};

const healthHome = {
  "DeliverySys-Other-Percent": "12",
  "DeliverySys-PrimaryCareManagement-No-Percent": "12",
  "DenominatorDefineTotalTechSpec-No-Size": "1234567890",
  ChangeInPopulationExplanation: "dun dun dun",
  "DeliverySys-FeeForService-No-Percent": "12",
  "DeliverySys-IntegratedCareModel": "no",
  "DeliverySys-Other-NumberOfHealthPlans": "1234567890",
  DenominatorDefineTotalTechSpec: "no",
  "DeliverySys-MCO_PIHP-No-Included": "12",
  "DeliverySys-PrimaryCareManagement": "no",
  "DeliverySys-Other": "Another one bites the dust",
  "DeliverySys-FeeForService": "no",
  "DenominatorDefineTotalTechSpec-No-Explanation": "Another one bites the dust",
  DeliverySysRepresentationDenominator: [
    "FFS",
    "PCCM",
    "MCO-PIHP",
    "ICM",
    "Other",
  ],
  DefinitionOfDenominator: [
    "DenominatorIncMedicaidPop",
    "DenominatorIncMedicareMedicaidDualEligible",
    "DenominatorIncOther",
  ],
  DenominatorDefineHealthHome: "no",
  "DeliverySys-MCO_PIHP-No-Excluded": "1234567890",
  "DeliverySys-IntegratedCareModel-No-Population": "1234567890",
  "DeliverySys-MCO_PIHP-NumberOfPlans": "1234567890",
  "DefinitionOfDenominator-Other": "Another one bites the dust",
  "DeliverySys-MCO_PIHP": "no",
  "DeliverySys-IntegratedCareModel-No-Percent": "12",
  "DenominatorDefineHealthHome-No-Explanation": "Another one bites the dust",
};

const healthHomeHybrid = {
  "DeliverySys-Other-Percent": "12",
  "DeliverySys-PrimaryCareManagement-No-Percent": "12",
  HybridMeasurePopulationIncluded: "1234567890",
  "DenominatorDefineTotalTechSpec-No-Size": "1234567890",
  ChangeInPopulationExplanation: "dun dun dun",
  "DeliverySys-FeeForService-No-Percent": "12",
  "DeliverySys-IntegratedCareModel": "no",
  "DeliverySys-Other-NumberOfHealthPlans": "1234567890",
  DenominatorDefineTotalTechSpec: "no",
  "DeliverySys-MCO_PIHP-No-Included": "12",
  "DeliverySys-PrimaryCareManagement": "no",
  "DeliverySys-Other": "Another one bites the dust",
  "DeliverySys-FeeForService": "no",
  "DenominatorDefineTotalTechSpec-No-Explanation": "Another one bites the dust",
  DeliverySysRepresentationDenominator: [
    "FFS",
    "PCCM",
    "MCO-PIHP",
    "ICM",
    "Other",
  ],
  DefinitionOfDenominator: [
    "DenominatorIncMedicaidPop",
    "DenominatorIncMedicareMedicaidDualEligible",
    "DenominatorIncOther",
  ],
  DenominatorDefineHealthHome: "no",
  HybridMeasureSampleSize: "1234567890",
  "DeliverySys-MCO_PIHP-No-Excluded": "1234567890",
  "DeliverySys-IntegratedCareModel-No-Population": "1234567890",
  "DeliverySys-MCO_PIHP-NumberOfPlans": "1234567890",
  "DefinitionOfDenominator-Other": "Another one bites the dust",
  "DeliverySys-MCO_PIHP": "no",
  "DeliverySys-IntegratedCareModel-No-Percent": "12",
  "DenominatorDefineHealthHome-No-Explanation": "Another one bites the dust",
};
