import { testingYear } from "../../../../support/constants";

describe("Measure: PQI15-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI15-AD");
  });

  it("Delivery system are represented in denominator", function () {
    cy.get("[data-cy=DidReport0]").click();
    cy.get("[data-cy=DataStatus0]").click();
    cy.get("[data-cy=DataStatus-ProvisionalExplanation]").click();
    cy.get("[data-cy=MeasurementSpecification0]").click();
    cy.get("[data-cy=DataSource0]").click();
    cy.get("[data-cy=DefinitionOfDenominator0]").click();
    cy.get("[data-cy=DenominatorDefineTotalTechSpec0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator0]").click();
    cy.get("[data-cy=DeliverySys-FeeForService0]").click();
    cy.get("[data-cy=DeliverySys-FeeForService1]").click();
    cy.get(
      '[data-cy="What percent of your measure-eligible Fee-for-Service (FFS) population are included in the measure?"]'
    ).should("be.visible");
    cy.get("[data-cy=DeliverySysRepresentationDenominator1]").click();
    cy.get("[data-cy=DeliverySys-PrimaryCareManagement0]").click();
    cy.get("[data-cy=DeliverySys-PrimaryCareManagement1]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator2]").click();
    cy.get(
      '[data-cy="What is the number of Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) plans that are included in the reported data?"]'
    ).should("be.visible");
    cy.get("[data-cy=DeliverySys-MCO_PIHP0]").click();
    cy.get("[data-cy=DeliverySys-MCO_PIHP1]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator3]").click();
    cy.get("[data-cy=DeliverySys-IntegratedCareModel0]").click();
    cy.get("[data-cy=DeliverySys-IntegratedCareModel1]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator4]").click();
    cy.get("[data-cy=DefinitionOfDenominator0]").click();
    cy.get("[data-cy=DenominatorDefineTotalTechSpec0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator1]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator2]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator3]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator4]").click();
  });

  it("Combined rates from multiple reporting", function () {
    cy.get("[data-cy=DidReport0]").click();
    cy.get("[data-cy=DataStatus0]").click();
    cy.get("[data-cy=MeasurementSpecification0]").click();
    cy.get("[data-cy=DataSource0]").click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"]'
    ).click();
    cy.get("[data-cy=DefinitionOfDenominator0]").click();
    cy.get("[data-cy=DenominatorDefineTotalTechSpec0]").click();
    cy.get("[data-cy=CombinedRates0]").click();
    cy.get("[data-cy=DidCalculationsDeviate0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator1]").click();

    cy.get("[data-cy=DeliverySys-PrimaryCareManagement0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator2]").click();

    cy.get("[data-cy=DeliverySys-MCO_PIHP0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator3]").click();

    cy.get("[data-cy=DeliverySysRepresentationDenominator3]").click();

    cy.get("[data-cy=DeliverySysRepresentationDenominator3]").click();

    cy.get("[data-cy=DeliverySys-IntegratedCareModel0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator4]").click();
    cy.get("[data-cy=CombinedRates-CombinedRates0]").click();
    cy.get(".css-bxak8j").should("be.visible");
  });
});
