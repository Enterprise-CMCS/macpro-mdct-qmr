describe("Measure 19: AMB-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("AMB-HH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "shows an error if user not reporting and doesn't specify why not",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it("displays the correct Measurement Specification options", () => {
    cy.get('[data-cy="measurement-specification-options"]')
      .should(
        "contain",
        "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
      )
      .and("contain", "Other");
  });

  it("displays the correct Data Source options", () => {
    cy.get('[data-cy="data-source-options"]')
      .should("contain", "Administrative Data")
      .and("contain", "Other Data Source");
  });

  it("calculates rates correctly", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "800.0"
    );

    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
      "have.value",
      "833.3"
    );
  });

  it("calculates rates correctly - OPM", () => {
    cy.get('[data-cy="MeasurementSpecification1"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "4"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "800.0"
    );
    cy.get('[data-cy="+ Add Another"]').click();

    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "5"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("6");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]').should(
      "have.value",
      "833.3"
    );

    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]')
      .clear()
      .type("177.4");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]').should(
      "have.value",
      "177.4"
    );
  });

  it("calculates rates correctly - OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();

    cy.get('[data-cy="Performance Measure"]').click();
    cy.get('[data-cy="Performance Measure"]').should(
      "have.text",
      "Performance Measure"
    );
    cy.get(
      ':nth-child(1) > .chakra-stack > :nth-child(1) > [data-cy="ED Visits"]'
    ).should("have.text", "ED Visits");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      ':nth-child(1) > .chakra-stack > :nth-child(2) > [data-cy="Enrollee Months"]'
    ).should("have.text", "Enrollee Months");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("2");
    cy.get(
      ':nth-child(1) > .chakra-stack > :nth-child(3) > [data-cy="Visits per 1,000 Enrollee Months"]'
    ).should("have.text", "Visits per 1,000 Enrollee Months");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "500.0"
    );
    cy.get(".css-0 > :nth-child(2) > .chakra-stack").click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
      "have.value",
      "500.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.denominator"]'
    ).type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.2.rate"]').should(
      "have.value",
      "750.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.denominator"]'
    ).type("7");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.numerator"]'
    ).type("55");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.rate"]').should(
      "have.value",
      "7857.1"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options0-checkbox"
    ).check();
    cy.get(
      '.css-zhlq69 > .css-1wlqfwj > .chakra-stack > :nth-child(1) > [data-cy="ED Visits"]'
    ).should("have.text", "ED Visits");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '.css-zhlq69 > .css-1wlqfwj > .chakra-stack > :nth-child(2) > [data-cy="Enrollee Months"]'
    ).should("have.text", "Enrollee Months");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.rate"]'
    ).should("have.value", "500.0");
    cy.get(
      '.css-zhlq69 > .css-1wlqfwj > .chakra-stack > :nth-child(3) > [data-cy="Visits per 1,000 Enrollee Months"]'
    ).should("have.text", "Visits per 1,000 Enrollee Months");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options2"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options2-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Age65andolder.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Age65andolder.singleCategory.0.numerator"]'
    ).type("33");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Age65andolder.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Age65andolder.singleCategory.0.denominator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Age65andolder.singleCategory.0.rate"]'
    ).should("have.value", "8250.0");
  });

  it("Ensure that Total NDR set is auto calculated from the according age ranges", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.numerator"]'
    ).should("have.value", "4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.denominator"]'
    ).should("have.value", "5");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.4.rate"]').should(
      "have.value",
      "800.0"
    );
  });

  it("checks that Total NDR should have a value if other NDRs have been filled", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.denominator"]'
    ).clear();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Total must contain values if other fields are filled."]'
    ).should("be.visible");
  });

  it("Ensure that Total NDR set is auto calculated from the according age ranges - OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();

    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
    ).type("4");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.TotalAllAges.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.TotalAllAges.singleCategory.0.numerator"]'
    ).type("6");
    cy.get(":nth-child(2) > .css-0 > .css-1wlqfwj > .chakra-stack").click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.TotalAllAges.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.TotalAllAges.singleCategory.0.denominator"]'
    ).type("8");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Total numerator field is not equal to the sum of other numerators."] > .chakra-text'
    ).should(
      "have.text",
      "Total numerator field is not equal to the sum of other numerators."
    );
    cy.get(
      '[data-cy="Total denominator field is not equal to the sum of other denominators."] > .chakra-text'
    ).should(
      "have.text",
      "Total denominator field is not equal to the sum of other denominators."
    );
  });

  it("checks that Total NDR should have calculated numerator/denominator", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.denominator"]'
    ).type("6");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Total numerator field is not equal to the sum of other numerators."]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Total denominator field is not equal to the sum of other denominators."]'
    ).should("be.visible");
  });

  it("checks that Total NDR should have calculated numerator/denominator - OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();

    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages0to17.singleCategory.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
    ).type("4");
    cy.get(':nth-child(2) > .css-0 > .css-1wlqfwj > [data-cy="Total"]').should(
      "have.text",
      "Total"
    );

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Total.singleCategory.0.numerator"]'
    ).should("have.value", "4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Total.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Total.singleCategory.0.denominator"]'
    ).should("have.value", "6");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Total.singleCategory.0.denominator"]'
    ).clear();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Total must contain values if other fields are filled."] > .chakra-text'
    ).should(
      "have.text",
      "Total must contain values if other fields are filled."
    );
  });

  it("rounds the numerical value after the decimal up/down for auto-calculated rates", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "333.3"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "666.7"
    );
  });

  it("displays a warning when N=0, D>0, and user enters a rate > 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("12");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "10.0"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Performance Measure/Other Performance Measure ErrorManually entered rate should be 0 if numerator is 0"
    );
  });

  it("displays a warning when N>0, D>0, and user enters a rate of 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("12");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "0"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
