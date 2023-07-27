describe("Measure: AMM-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("AMM-AD");
  });

  it.skip("should match snapshot", () => {
    // skipping this as it will serve as an example only for now
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.EffectiveAcutePhaseTreatment.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.EffectiveAcutePhaseTreatment.0.denominator"]'
    ).type("4");
    cy.matchImageSnapshot("AMM-AD-render");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it("If not reporting and not why not -> show error", () => {
    cy.get('[data-cy="DidReport1"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("have.text", "Why Are You Not Reporting On This Measure Error");
  });

  it("should show correct data source options", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataSource0"]').should("be.visible");
    cy.get('[data-cy="DataSource1"]').should("be.visible");
    cy.get('[data-cy="DataSource2"]').should("be.visible");
  });

  it("if primary measurement spec is selected -> show performance measures", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Performance Measure"]').should(
      "have.text",
      "Performance Measure"
    );
    cy.get('[data-cy="Ages 18 to 64"]')
      .first()
      .should("have.text", "Ages 18 to 64");
    cy.get('[data-cy="Age 65 and older"]')
      .first()
      .should("have.text", "Age 65 and older");
  });

  it("if other measurement spec is selected -> show other performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  });

  it("if only admin data cannot override, if anything else, rate is editable", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.EffectiveAcutePhaseTreatment.0.rate"]'
    ).should("have.attr", "readonly");
    cy.get('[data-cy="DataSource2"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.EffectiveAcutePhaseTreatment.0.rate"]'
    ).should("not.have.attr", "readonly");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.EffectiveAcutePhaseTreatment.0.rate"]'
    ).type("56");
  });

  it("should have adult eligibility group in OMS", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.EffectiveAcutePhaseTreatment.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.EffectiveAcutePhaseTreatment.0.denominator"]'
    ).type("6");
  });

  it("at least one dnr set if reporting and measurement spec or error.", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
  });
  it("if yes for combined rates → and no additional selection → show warning", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="You must select at least one option for Combined Rate(s) Details if Yes is selected."]'
    ).should(
      "have.text",
      "You must select at least one option for Combined Rate(s) Details if Yes is selected."
    );
  });
});
