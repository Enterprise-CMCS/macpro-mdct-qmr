import { DefinitionOfPopulation } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

/*
Turn this:
  for="field-1379718737-40"
  id="field-1379718737-40-label"

Into this:
  for="field-40"
  id="field-40-label"

So that the snapshot doesn't confuse dynamicaly generated attributes. Otherwise snapshot comparisons will fail.
*/
const cleanAttributes = (container: HTMLElement) => {
  const attributes = ["id", "for", "aria-describedby"];
  const prefixes = ["field", "radio"];
  const clean = (attr: string) => {
    let attrList = attr.split("-");
    if (prefixes.includes(attrList[0])) {
      attrList.splice(1, 1);
      return attrList.join("-");
    } else {
      return attr;
    }
  };

  attributes.forEach((attr) => {
    if (container.hasAttribute(attr)) {
      const value = clean(container.getAttribute(attr)!);
      container.setAttribute(attr, value);
    }
  });

  Array.from(container.children).forEach((child) => {
    cleanAttributes(child as HTMLElement);
  });
};

describe("Test DefinitionOfPopulation componnent", () => {
  it("(ACS) Component renders with correct content", () => {
    const { container } = renderWithHookForm(<DefinitionOfPopulation />, {
      defaultValues: adult,
    });
    cleanAttributes(container);
    expect(container).toMatchSnapshot();
  });

  it("(ACS Hybrid) Component renders with correct content", () => {
    const { container } = renderWithHookForm(
      <DefinitionOfPopulation hybridMeasure />,
      {
        defaultValues: adultHybrid,
      }
    );
    cleanAttributes(container);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("(CCS) Component renders with correct content", () => {
    const { container } = renderWithHookForm(
      <DefinitionOfPopulation childMeasure />,
      {
        defaultValues: child,
      }
    );
    cleanAttributes(container);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("(CCS Hybrid) Component renders with correct content", () => {
    const { container } = renderWithHookForm(
      <DefinitionOfPopulation childMeasure hybridMeasure />,
      {
        defaultValues: childHybrid,
      }
    );
    cleanAttributes(container);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("(HHS) Component renders with correct content", () => {
    const { container } = renderWithHookForm(
      <DefinitionOfPopulation healthHomeMeasure />,
      {
        defaultValues: healthHome,
      }
    );
    cleanAttributes(container);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("(HHS Hybrid) Component renders with correct content", () => {
    const { container } = renderWithHookForm(
      <DefinitionOfPopulation healthHomeMeasure hybridMeasure />,
      {
        defaultValues: healthHomeHybrid,
      }
    );
    cleanAttributes(container);
    expect(container.firstChild).toMatchSnapshot();
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
