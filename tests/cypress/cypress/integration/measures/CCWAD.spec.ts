describe("CCW-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CCW-AD");
  });

  it("Yes for Reporting", () => {
    cy.get(".css-itvw0n").should(
      "have.text",
      "For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov."
    );
    cy.xpath("//p[@id='DataStatus-ReportingFinalData']").click({
      force: true,
    });
    cy.xpath("//p[@id='MeasurementSpecification-OPA']").click({ force: true });
    cy.get(":nth-child(4) > .chakra-form__label").should("be.visible");
    cy.get("#MeasurementSpecification-OPA").should(
      "have.id",
      "MeasurementSpecification-OPA"
    );
    cy.get("#MeasurementSpecification-OPA").click();
    cy.xpath("//label[contains(text(),'Data Source')]").should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get("#DataSource0-checkbox").check();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click({
      force: true,
    });
    cy.get("#DataSource1-checkbox").check();
    cy.get('[data-cy="DateRange.startDate-month"]').click({ force: true });
    cy.get('[data-cy="DateRange.startDate-month"]').type("2");

    cy.get('[data-cy="DateRange.startDate-year"]').click({ force: true });
    cy.get('[data-cy="DateRange.startDate-year"]').type("2021");

    cy.get('[data-cy="DateRange.endDate-month"]').click({ force: true });
    cy.get('[data-cy="DateRange.endDate-month"]').type("5");

    cy.get('[data-cy="DateRange.endDate-year"]').click({ force: true });
    cy.get('[data-cy="DateRange.endDate-year"]').type("2021");

    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.rate"]'
    ).should("have.value", "50.0");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.LongactingreversiblemethodofcontraceptionLARC.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.LongactingreversiblemethodofcontraceptionLARC.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.LongactingreversiblemethodofcontraceptionLARC.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.LongactingreversiblemethodofcontraceptionLARC.0.denominator"]'
    ).type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.LongactingreversiblemethodofcontraceptionLARC.0.rate"]'
    ).should("have.value", "66.7");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Long-acting reversible method of contraception (LARC) Rate should not be higher than Most effective or moderately effective method of contraception Rate for All Women Ages 21 to 44 Rates."]'
    ).should(
      "contain.text",
      "Long-acting reversible method of contraception (LARC) Rate should not be higher than Most effective or moderately effective method of contraception Rate for All Women Ages 21 to 44 Rates."
    );
    cy.get(
      '[data-cy="The following categories must have the same denominator:"]'
    ).should(
      "include.text",
      "The following categories must have the same denominator:"
    );
    cy.get(
      '[data-cy="The following categories must have the same denominator:"]'
    ).should(
      "include.text",
      "Long-acting reversible method of contraception (LARC)"
    );
    cy.get(
      '[data-cy="The following categories must have the same denominator:"]'
    ).should(
      "include.text",
      "Most effective or moderately effective method of contraception"
    );
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
    cy.xpath("//label[contains(text(),'Data Source')]").should("be.visible");
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
    cy.get(":nth-child(9) > .css-1bpnzr3").click();
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
  });
});
