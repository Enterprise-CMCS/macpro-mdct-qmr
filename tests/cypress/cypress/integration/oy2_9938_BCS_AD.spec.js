const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 9938 BCS-AD", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });
  it("Fill out BCS-AD form and verify NDR section", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="BCS-AD"]').click();
    cy.wait(2000);
    cy.get('[data-cy="Clear Data"]').click();
    cy.get('[data-cy="BCS-AD"]').click();
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2020"
    );
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get("#DataSource0-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData.selected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData\\.selected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData-AdministrativeDataOther.description"]'
    ).click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get('[data-cy="DataSource2"] > .chakra-checkbox__control').click();
    cy.get("#DataSource2-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.OtherDataSource.description"]'
    ).click();
    cy.get('[data-cy="DataSourceDescription"]').click();
    cy.get('[data-cy="DateRange.startDate-month"]').clear();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type("2019");
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
    cy.get('[data-cy="DateRange.endDate-year"]').type("2021");
    cy.get(".css-foph78").click();
    cy.get(".css-14tgbft > :nth-child(1)").should(
      "have.text",
      "Denominator includes Medicaid population"
    );
    cy.get(".css-14tgbft > :nth-child(2)").should(
      "have.text",
      "Denominator includes Medicare and Medicaid Dually-Eligible population"
    );
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator0-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator1-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator2-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator3-checkbox").check();
    cy.get('[data-cy="DefinitionOfDenominator-Other"]').click();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator0-checkbox").check();
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').type("10");
    cy.get('[data-cy="DeliverySys-FeeForService-No-Population"]').clear();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Population"]').type("10");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").check();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").uncheck();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").check();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement-No-Percent"]').type(
      "10"
    );
    cy.get(
      '[data-cy="DeliverySys-PrimaryCareManagement-No-Population"]'
    ).clear();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement-No-Population"]').type(
      "10"
    );
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator2-checkbox").check();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-Percent"]').type("10");
    cy.get('[data-cy="DeliverySys-MCO_PIHP-NumberOfPlans"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-NumberOfPlans"]').type("10");
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').type("10");
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').type("10");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator3-checkbox").check();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Percent"]').type("10");
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Population"]').clear();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Population"]').type(
      "10"
    );
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator4-checkbox").check();
    cy.get('[data-cy="DeliverySys-Other"]').click();
    cy.get('[data-cy="DeliverySys-Other-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-Other-Percent"]').type("10");
    cy.get('[data-cy="DeliverySys-Other-NumberOfHealthPlans"]').clear();
    cy.get('[data-cy="DeliverySys-Other-NumberOfHealthPlans"]').type("10");
    cy.get('[data-cy="DeliverySys-Other-Population"]').clear();
    cy.get('[data-cy="DeliverySys-Other-Population"]').type("10");
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio NDR section ==== */
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("10");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "20.0"
    );
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
    ).type("10");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
      "have.value",
      "30.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("10");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "100.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(":nth-child(9) > div.css-0").click();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "0.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "99"
    );
    cy.get('[data-cy="DidCalculationsDeviate1"]').click();
    cy.get('[data-cy="CombinedRates1"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").uncheck();
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
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.ageRangeRates.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.ageRangeRates\\.options0-checkbox"
    ).check();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.ageRangeRates.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.ageRangeRates\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.ageRangeRates.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.BlackorAfricanAmerican\\.ageRangeRates\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.ageRangeRates.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.BlackorAfricanAmerican\\.ageRangeRates\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options1-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options2-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Primary Language (Including Sign Language)");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options3-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options4-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options4-checkbox").uncheck();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options4-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options5"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options5-checkbox").check();
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Manually entered rate should be 0 if numerator is 0"]'
    ).should(
      "have.text",
      "Manually entered rate should be 0 if numerator is 0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "0.0"
    );
    cy.get(":nth-child(9) > div.css-0").click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="The measure has been validated successfully"]').should(
      "have.text",
      "The measure has been validated successfully"
    );
    /* ==== End Cypress Studio ==== */
  });
});
