import { testingYear } from "../../../../support/constants";

describe("OY2 8977 Measure 15 MSC-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("MSC-AD");
  });

  it("User click on No option for the first question and fill out the form with No option", () => {
    cy.get("[data-cy=DidReport1]").click();
    cy.get("[data-cy=WhyAreYouNotReporting0]").click();

    cy.get("[data-cy=WhyAreYouNotReporting1]").click();
  });

  it("Click on Yes option from first question", function () {
    cy.get("[data-cy=DidReport0]").click(); // clicking yes
    cy.get("[data-cy=DataStatus0]").click();
    cy.get("[data-cy=MeasurementSpecification0]").click();
    cy.get("[data-cy=MeasurementSpecification-HEDISVersion]").select(
      "HEDIS MY 2020 (FFY 2021 Core Set Reporting)"
    );
    cy.enterValidDateRange();
    cy.get("[data-cy=DefinitionOfDenominator0]").click();
    cy.get("[data-cy=DefinitionOfDenominator1]").click();
    cy.get("[data-cy=DefinitionOfDenominator2]").click();
    cy.get("[data-cy=DefinitionOfDenominator3]").click();

    cy.get("[data-cy=DenominatorDefineTotalTechSpec0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator0]").click();
    cy.get("[data-cy=DeliverySys-FeeForService0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator1]").click();
    cy.get("[data-cy=DeliverySys-PrimaryCareManagement0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator2]").click();
    cy.get("[data-cy=DeliverySys-MCO_PIHP-NumberOfPlans]").type("20");
    cy.get("[data-cy=DeliverySys-MCO_PIHP0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator3]").click();
    cy.get("[data-cy=DeliverySys-IntegratedCareModel0]").click();
    cy.get("[data-cy=DeliverySysRepresentationDenominator4]").click();
    cy.get("[data-cy=DeliverySys-Other-Percent]").type("10");
    cy.get("[data-cy=DeliverySys-Other-NumberOfHealthPlans]").type("20");

    /* ==== Performance Measure and Deviations from Measure Specifications ==== */
    cy.get('[data-cy="PerformanceMeasure.rates.fF0COe.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.fF0COe.0.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.fF0COe.1.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.fF0COe.1.denominator"]').type(
      "10"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.S2ngC7.0.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.S2ngC7.1.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.S2ngC7.1.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.S2ngC7.1.rate"]').should(
      "have.value",
      "20.0"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.Hk5dWm.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.Hk5dWm.0.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.Hk5dWm.1.numerator"]').type("7");
    cy.get('[data-cy="PerformanceMeasure.rates.Hk5dWm.1.denominator"]').type(
      "10"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.xiXN7R.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.xiXN7R.0.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.xiXN7R.1.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.xiXN7R.1.denominator"]').type(
      "10"
    );

    cy.get('[data-cy="DidCalculationsDeviate1"]').click();

    cy.get("[data-cy=CombinedRates0]").click();
    cy.get("[data-cy=CombinedRates-CombinedRates0]").click();

    cy.get("[data-cy=AdditionalNotes-AdditionalNotes]").type("notes");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("File upload and button verification", function () {
    const filePath = "fixtures/files/";
    cy.get('[data-testid="upload-stack"]').scrollIntoView();
    cy.get('[data-testid="upload-component"]')
      .invoke("show")
      .selectFile(`${filePath}test3.docx`);
    cy.get('[data-cy="file-upload-test3.docx"]').should("be.visible");
    cy.get('[data-cy="Validate Measure"]').should("be.visible");
    cy.get('[data-cy="Complete Measure"]').should("be.visible");
    cy.get("[data-cy=Save]").should("be.visible");
  });
});
