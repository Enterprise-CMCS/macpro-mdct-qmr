import testConfig from "../../test-config.js";
const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 16265 Validation text needs to appear in CH/AD qualifiers", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type(testConfig.TEST_USER_1);
    cy.xpath(passwordForCognito).type(testConfig.TEST_PASSWORD_1);
    cy.get('[data-cy="login-with-cognito-button"]').click();

    // ensure combined CCS
    cy.deleteChildCoreSets();
    cy.get('[data-cy="Add Child Core Set"]').click({ force: true }); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-combined").click({ force: true }); //selecting combined core set
    cy.get('[data-cy="Create"]').click(); //clicking create
  });
  it("validation child core set questions Medicaid required and CHIP are not required", () => {
    /* ==== clear the data in the form and click on validate core set questions button ==== */
    cy.wait(2000);
    cy.get("[data-cy=CCS]").click({ force: true });
    cy.get("[data-cy=core-set-qualifiers-link]").click();

    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for Medicaid Under Age 21 column must have values"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries for Medicaid Under Age 21 column must have values"]'
    ).should(
      "have.text",
      "Entries for Medicaid Under Age 21 column must have values"
    );
  });

  /* ==== Test Created with Cypress Studio ==== */
  it.skip("validation for child core set qualifiers percentage", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.wait(2000);
    cy.get("[data-cy=CCS]").click({ force: true });
    cy.get("[data-cy=core-set-qualifiers-link]").click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneMedicaid"]'
    ).type("51");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneMedicaid"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneMedicaid"]'
    ).type("52");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for Medicaid Under Age 21 column must total 100"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries for Medicaid Under Age 21 column must total 100"]'
    ).should(
      "have.text",
      "Entries for Medicaid Under Age 21 column must total 100"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneMedicaid"]'
    ).type("49");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneMedicaid"]'
    ).type("48");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for Medicaid Under Age 21 column must total 100"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries for Medicaid Under Age 21 column must total 100"]'
    ).should(
      "have.text",
      "Entries for Medicaid Under Age 21 column must total 100"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneMedicaid"]'
    ).type("50");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneCHIP"]'
    ).type("51");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneCHIP"]'
    ).type("52");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for CHIP Under Age 21 column must total 100"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries for CHIP Under Age 21 column must total 100"]'
    ).should(
      "have.text",
      "Entries for CHIP Under Age 21 column must total 100"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneCHIP"]'
    ).type("49");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOneCHIP"]'
    ).type("48");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for CHIP Under Age 21 column must total 100"]'
    ).should(
      "have.text",
      "Entries for CHIP Under Age 21 column must total 100"
    );
    cy.get(
      '[data-cy="Entries for CHIP Under Age 21 column must total 100"]'
    ).should("be.visible");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it.skip("validation Adult core set qualifiers age 21 to 64 and 65 older required", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=ACS]").click();
    cy.get("[data-cy=core-set-qualifiers-link]").click();
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for Ages 21 to 64 column must have values"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries for Ages 21 to 64 column must have values"]'
    ).should("have.text", "Entries for Ages 21 to 64 column must have values");
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFour"]'
    ).type("50");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.GreaterThanSixtyFour"]'
    ).type("10");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.GreaterThanSixtyFour"]'
    ).type("20");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.GreaterThanSixtyFour"]'
    ).type("20");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for Ages 21 to 64 column must have values"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries for Ages 21 to 64 column must have values"]'
    ).should("have.text", "Entries for Ages 21 to 64 column must have values");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.TwentyOneToSixtyFour"]'
    ).type("50");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).type("10");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.TwentyOneToSixtyFour"]'
    ).type("20");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.TwentyOneToSixtyFour"]'
    ).type("20");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("validation Adult core set qualifiers percentage", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=ACS]").click();
    cy.wait(2000);
    cy.get("[data-cy=core-set-qualifiers-link]").click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.TwentyOneToSixtyFour"]'
    ).type("51");
    cy.wait(2000);
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.TwentyOneToSixtyFour"]'
    ).type("52");
    cy.wait(2000);
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for Ages 21 to 64 column must total 100"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries for Ages 21 to 64 column must total 100"]'
    ).should("have.text", "Entries for Ages 21 to 64 column must total 100");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).type("7");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).type("6");
    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries for Ages 21 to 64 column must total 100"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries for Ages 21 to 64 column must total 100"]'
    ).should("have.text", "Entries for Ages 21 to 64 column must total 100");
    /* ==== End Cypress Studio ==== */
  });
});
