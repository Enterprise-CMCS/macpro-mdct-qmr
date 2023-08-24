import { testingYear } from "../../../../support/constants";

describe("Measure 34: CBP-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CBP-AD");
  });

  it.skip("User click on No option for the first question and fill out the form with No option", () => {
    cy.get(".css-itvw0n").should(
      "have.text",
      "For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov."
    );
    cy.get("[data-cy=DidReport1]").click();
    cy.get(
      "[data-cy=WhyAreYouNotReporting0] > .chakra-checkbox__control"
    ).click();

    cy.get(
      "[data-cy=WhyAreYouNotReporting1] > .chakra-checkbox__control"
    ).click();
  });

  it.skip("Click on Yes option from first question", function () {
    cy.get("[data-cy=DidReport0]").click();
    cy.get("[data-cy=DataStatus0]").click();
    cy.get("[data-cy=MeasurementSpecification0]").click();
    cy.get("[data-cy=MeasurementSpecification-HEDISVersion]").select(
      "HEDIS MY 2020 (FFY 2021 Core Set Reporting)"
    );
    cy.get("[data-cy=MeasurementPeriodAdhereToCoreSetSpecification1]").click();
    cy.get('[data-cy="DateRange.startDate-month"').type("10");
    cy.get('[data-cy="DateRange.startDate-year"').type("2020");
    cy.get('[data-cy="DateRange.endDate-month"').type("10");
    cy.get('[data-cy="DateRange.endDate-year"').type("2022");
    cy.get(
      "[data-cy=DefinitionOfDenominator0] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=DefinitionOfDenominator1]").click();
    cy.get(
      "[data-cy=DefinitionOfDenominator2] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DefinitionOfDenominator3] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=DefinitionOfDenominator-Other]").click();
    cy.get("[data-cy=ChangeInPopulationExplanation]").click();
    cy.get("[data-cy=DenominatorDefineTotalTechSpec0]").click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator0] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=DeliverySys-FeeForService0]").click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator1] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=DeliverySys-PrimaryCareManagement0]").click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator2] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=DeliverySys-MCO_PIHP-NumberOfPlans]").clear();
    cy.get("[data-cy=DeliverySys-MCO_PIHP-NumberOfPlans]").type("20");
    cy.get("[data-cy=DeliverySys-MCO_PIHP0]").click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator3] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=DeliverySys-IntegratedCareModel0]").click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator4] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=DeliverySys-Other]").click();
    cy.get("[data-cy=DeliverySys-Other-Percent]").clear();
    cy.get("[data-cy=DeliverySys-Other-Percent]").type("10");
    cy.get("[data-cy=DeliverySys-Other-NumberOfHealthPlans]").clear();
    cy.get("[data-cy=DeliverySys-Other-NumberOfHealthPlans]").type("20");
  });

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
