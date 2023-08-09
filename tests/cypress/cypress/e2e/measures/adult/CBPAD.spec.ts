import { testingYear } from "../../../../support/constants";

describe("Measure 34: CBP-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CBP-AD");
  });

  it("User click on No option for the first question and fill out the form with No option", () => {
    cy.get(".css-itvw0n").should(
      "have.text",
      "For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov."
    );
    cy.get("[data-cy=DidReport1]").click({ force: true });
    cy.get(
      "[data-cy=WhyAreYouNotReporting0] > .chakra-checkbox__control"
    ).click({ force: true });

    cy.get(
      "[data-cy=WhyAreYouNotReporting1] > .chakra-checkbox__control"
    ).click();
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Click on Yes option from first question", function () {
    cy.get("[data-cy=DidReport0]").click({ force: true }); // clicking yes
    cy.get("[data-cy=DataStatus0]").click({ force: true });
    cy.get("[data-cy=MeasurementSpecification0]").click({ force: true });
    cy.xpath("(//span[@class='chakra-radio__control css-gzpnyx'])[7]").click();
    cy.get("[data-cy=MeasurementSpecification-HEDISVersion]").select(
      "HEDIS MY 2020 (FFY 2021 Core Set Reporting)"
    );
    cy.xpath("(//input[@label='Month'])[1]").clear();
    cy.xpath("(//input[@label='Month'])[1]").type("10");
    cy.xpath("(//input[@label='Year'])[1]").clear();
    cy.xpath("(//input[@label='Year'])[1]").type("2019");
    cy.xpath("(//input[@label='Month'])[2]").clear();
    cy.xpath("(//input[@label='Month'])[2]").type("10");
    cy.xpath("(//input[@label='Year'])[2]").clear();
    cy.xpath("(//input[@label='Year'])[2]").type("2021");
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

  /* ==== Test Created with Cypress Studio ==== */
  it("File upload and button verification", function () {
    const filePath = "/files/";
    cy.xpath("//u[contains(text(),'browse')]").scrollIntoView();
    const browseBTN = "//u[contains(text(),'browse')]";
    cy.xpath(browseBTN).attachFile(filePath + "test3.docx", {
      subjectType: "drag-n-drop",
    });
    cy.get('[data-cy="file-upload-test3.docx"]').should("be.visible");
    cy.get('[data-cy="Validate Measure"]').should("be.visible");
    cy.get('[data-cy="Complete Measure"]').should("be.visible");
    cy.get("[data-cy=Save]").should("be.visible");
  });
});
