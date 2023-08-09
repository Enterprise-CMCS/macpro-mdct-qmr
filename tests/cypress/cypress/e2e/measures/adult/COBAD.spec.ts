describe("OY2 9940 COB-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("COB-AD");
  });

  it("Other Performance Measure", () => {
    cy.get('[data-cy="MeasurementSpecification1"]').click({ force: true });
    cy.xpath("//p[@id='MeasurementSpecification-Other']").click({
      force: true,
    });
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).type("Test");
    cy.get('[data-cy="Data Source"]').should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get("#DataSource0-checkbox").check();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.wait(500);
    cy.get('[data-cy="OtherPerformanceMeasure-Explanation"]').click({
      force: true,
    });
    cy.get('[data-cy="OtherPerformanceMeasure-Explanation"]').type("OPM");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').click({
      force: true,
    });
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "Age Range: 21 to 44"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="+ Add Another"]').click({ force: true });
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').type(
      "Test2"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "3"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("4");
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="Validate Measure"]').should("be.enabled");
    cy.get('[data-cy="Complete Measure"]').should("be.enabled");
    cy.wait(500);
    cy.get('[data-cy="+ Add Another"]').click({ force: true });
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.description"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.description"]').type(
      "check"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.numerator"]').type(
      "0"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.denominator"]'
    ).type("4");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.rate"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.rate"]').should(
      "be.enabled"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.rate"]').type("5");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Manually entered rate should be 0 if numerator is 0"]'
    ).should(
      "have.text",
      "Manually entered rate should be 0 if numerator is 0"
    );
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.wait(500);
    cy.get('[data-cy="+ Add Another"]').click({ force: true });
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.description"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.description"]').type(
      "check1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.rate"]').type("0");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.rate"]').should(
      "have.value",
      "0"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
    /* ==== End Cypress Studio ==== */
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
