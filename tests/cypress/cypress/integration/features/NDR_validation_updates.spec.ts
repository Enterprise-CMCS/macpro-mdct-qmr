describe("OY2 16341 NDR set validation updates for all measures ", () => {
  beforeEach(() => {
    cy.login("stateuser2");
  });

  it("Click on NO for the first question then click on validate and complete button for CCP-AD", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
    cy.get('[data-cy="DidReport1"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("have.text", "Why Are You Not Reporting On This Measure Error");
    cy.get(
      '[data-cy="You must select at least one reason for not reporting on this measure"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="You must select at least one reason for not reporting on this measure"]'
    ).should(
      "have.text",
      "You must select at least one reason for not reporting on this measure"
    );
    cy.get('[data-cy="Complete Measure"]').click();
    cy.get(".css-cirab6").click();
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("have.text", "Why Are You Not Reporting On This Measure Error");
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="You must select at least one reason for not reporting on this measure"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="You must select at least one reason for not reporting on this measure"]'
    ).should(
      "have.text",
      "You must select at least one reason for not reporting on this measure"
    );
  });

  it("PM NDR verification for CCP-AD", function () {
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator2-checkbox").check();
    cy.wait(1000);
    cy.xpath(
      "//input[@data-cy='PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.numerator']"
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.numerator"]'
    ).type("20");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.denominator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.denominator"]'
    ).type("50");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.rate"]'
    ).should("have.value", "40.0");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.1.numerator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.1.numerator"]'
    ).type("40");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.1.denominator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.1.denominator"]'
    ).type("80");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.1.rate"]'
    ).should("have.value", "50.0");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.1.numerator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.1.numerator"]'
    ).type("0");
    //cy.get(":nth-child(9) > :nth-child(8)").click();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.1.rate"]'
    ).should("have.value", "0.0");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.rate"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.rate"]'
    ).type("0");
    //cy.get(':nth-child(7) > [data-cy="Sixty Days Postpartum Rate"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should("be.visible");
  });

  it("OPM NDR verification for CCP-AD", function () {
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator2-checkbox").check();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "4"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("40");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "10.0"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "0"
    );
    cy.get(":nth-child(9) > .css-1bpnzr3 > .css-0").click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "0.0"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "5"
    );
    cy.get(":nth-child(9) > .css-1bpnzr3 > .css-0").click();
    cy.get(":nth-child(9) > .css-1bpnzr3 > .css-0").click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type("0");
    cy.get(":nth-child(9) > .css-1bpnzr3").click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
    cy.get('[data-cy="Complete Measure"]').click();
    cy.get(".css-cirab6").click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });

  it("Click on NO for the first question then click on validate and complete button for PQI01-AD", function () {
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI01-AD");
    cy.get('[data-cy="DidReport1"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("have.text", "Why Are You Not Reporting On This Measure Error");
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="You must select at least one reason for not reporting on this measure"]'
    ).should(
      "have.text",
      "You must select at least one reason for not reporting on this measure"
    );
    cy.get(
      '[data-cy="You must select at least one reason for not reporting on this measure"]'
    ).should("be.visible");
    cy.get('[data-cy="Complete Measure"]').click();
    cy.get(".css-cirab6").click();
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("have.text", "Why Are You Not Reporting On This Measure Error");
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="You must select at least one reason for not reporting on this measure"]'
    ).should(
      "have.text",
      "You must select at least one reason for not reporting on this measure"
    );
    cy.get(
      '[data-cy="You must select at least one reason for not reporting on this measure"]'
    ).should("be.visible");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("PM NDR verification for PQI01-AD", function () {
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI01-AD");
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator2-checkbox").check();
    cy.wait(1000);
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("4");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("40");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).should("have.value", "10000.0");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("5");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("70");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]'
    ).should("have.value", "7142.9");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).should("have.value", "0.0");
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]'
    ).clear();
    cy.xpath(
      '//input[@data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]'
    ).type("0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should("be.visible");
    cy.get('[data-cy="Complete Measure"]').click();
    cy.get(".css-cirab6").click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should("be.visible");
  });

  it("OPM NDR verification for PQI01-AD", function () {
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI01-AD");
    cy.get('[data-cy="DataSource1"]').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator2-checkbox").check();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "5"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("8");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "62500.0"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "0"
    );
    cy.get(":nth-child(9) > .css-1bpnzr3 > .css-0").click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "0.0"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "2"
    );
    cy.get(":nth-child(9) > .css-1bpnzr3 > .css-0").click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type("0");
    cy.get(":nth-child(9) > .css-1bpnzr3 > .css-0").click();
    cy.get(":nth-child(9) > .css-1bpnzr3 > .css-0").click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should("be.visible");
    cy.get('[data-cy="Complete Measure"]').click();
    cy.get(".chakra-modal__content-container").click();
    cy.get('[data-cy="Complete Measure"]').click();
    cy.get(".css-cirab6").click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
    cy.get(
      '[data-cy="Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should("be.visible");
    /* ==== End Cypress Studio ==== */
  });
});
