describe("Measure: CCP-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it(
    "at least one dnr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );

  it("should show correct data source options", () => {
    cy.get("#MeasurementSpecification-OPA").should(
      "have.text",
      "HHS Office of Population Affairs (OPA)"
    );
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Medicaid Management Information System (MMIS)");
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data Other");
  });

  it("if primary measurement spec is selected -> show performance measures", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Performance Measure"]').should(
      "have.text",
      "Performance Measure"
    );
    cy.get(
      ':nth-child(1) > :nth-child(2) > [data-cy="Three Days Postpartum Rate"]'
    ).should("have.text", "Three Days Postpartum Rate");
    cy.get(
      ':nth-child(1) > :nth-child(3) > [data-cy="Sixty Days Postpartum Rate"]'
    ).should("have.text", "Sixty Days Postpartum Rate");
    cy.get(
      ':nth-child(2) > :nth-child(2) > [data-cy="Three Days Postpartum Rate"]'
    ).should("have.text", "Three Days Postpartum Rate");
    cy.get(
      ':nth-child(2) > :nth-child(3) > [data-cy="Sixty Days Postpartum Rate"]'
    ).should("have.text", "Sixty Days Postpartum Rate");
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
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.denominator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.rate"]'
    ).should("have.attr", "readonly");
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.rate"]'
    ).should("not.have.attr", "readonly");
  });

  it("should have adult eligibility group in OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.denominator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.rate"]'
    ).should("have.value", "100.0");
  });
});
