const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 8976 CCW-AD", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Yes for Reporting", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > :nth-child(1) > a > .chakra-text').click();
    cy.get(':nth-child(7) > :nth-child(1) > a > .chakra-text').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-itvw0n').should('have.text', 'For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov.');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.xpath("//p[@id='DataStatus-I am reporting final data.']").click({force: true});
    //cy.get('#radio-184').check();

    /* ==== Generated with Cypress Studio ==== */
    cy.xpath("//p[@id='MeasurementSpecification-OPA']").click({force: true});
    cy.get(':nth-child(4) > .chakra-form__label').should('be.visible');
    cy.get('#MeasurementSpecification-OPA').should('have.id', 'MeasurementSpecification-OPA');
    cy.get('#MeasurementSpecification-OPA').click();
    //cy.get('#radio-188').check();
    cy.xpath("//label[contains(text(),'Data Source')]").should('be.visible');

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text').should('be.visible');
    cy.xpath("//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[4]/div[1]/div[1]/div[1]/label[1]/span[1]").click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text').click();
    cy.xpath("//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[4]/div[1]/div[1]/div[1]/label[1]/span[1]").click({force: true});
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.xpath("//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/label[1]/span[1]").click({force: true});
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DateRange.startDate-month"]').click({force: true});
    cy.get('[data-cy="DateRange.startDate-month"]').type('2');

    cy.get('[data-cy="DateRange.startDate-year"]').click({force: true});
    cy.get('[data-cy="DateRange.startDate-year"]').type('2021');

    cy.get('[data-cy="DateRange.endDate-month"]').click({force: true});
    cy.get('[data-cy="DateRange.endDate-month"]').type('5');

    cy.get('[data-cy="DateRange.endDate-year"]').click({force: true});
    cy.get('[data-cy="DateRange.endDate-year"]').type('2021');

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(7) > .css-1ddmh30').should('be.visible');
    cy.get('[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DefinitionOfDenominator0"] > #DefinitionOfDenominator').check();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get('#DenominatorDefineTotalTechSpec0').check();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator0"] > #DeliverySysRepresentationDenominator').check();
    cy.get('[data-cy="DeliverySys-FreeForService0"]').click();
    cy.get('#DeliverySys-FreeForService0').check();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="PerformanceMeasure-Explanation"]').click({force: true});
    cy.get('[data-cy="PerformanceMeasure-Explanation"]').type('Test');
    cy.get('.chakra-container > :nth-child(8)').click();
    cy.get('[data-cy="ModeratelyEffectiveMethodOfContraceptionRate.0.numerator"]').clear();
    cy.get('[data-cy="ModeratelyEffectiveMethodOfContraceptionRate.0.numerator"]').type('1');
    cy.get('[data-cy="ModeratelyEffectiveMethodOfContraceptionRate.0.denominator"]').clear();
    cy.get('[data-cy="ModeratelyEffectiveMethodOfContraceptionRate.0.denominator"]').type('2');
    cy.get('.chakra-container > :nth-child(8)').click();
    cy.get('[data-cy="ReversibleMethodOfContraceptionRate.0.numerator"]').clear();
    cy.get('[data-cy="ReversibleMethodOfContraceptionRate.0.numerator"]').type('2');
    cy.get('[data-cy="ReversibleMethodOfContraceptionRate.0.denominator"]').clear();
    cy.get('[data-cy="ReversibleMethodOfContraceptionRate.0.denominator"]').type('3');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    cy.get('#DidCalculationsDeviate0').check();
    cy.get('[data-cy="DeviationOptions0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationOptions0"] > #DeviationOptions').check();
    cy.get('[data-cy="moderate-method-deviation.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="moderate-method-deviation.options0"] > #moderate-method-deviation\\.options').check();
    cy.get('[data-cy="moderate-method-deviation.explain.numerator"]').click({force: true});
    cy.get('[data-cy="moderate-method-deviation.explain.numerator"]').type('Test1');

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="moderate-method-deviation.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="moderate-method-deviation.options1"] > #moderate-method-deviation\\.options').check();
    cy.get('[data-cy="moderate-method-deviation.explain.denominator"]').click({force: true});
    cy.get('[data-cy="moderate-method-deviation.explain.denominator"]').type('Test2');
    cy.get('[data-cy="moderate-method-deviation.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="moderate-method-deviation.options2"] > #moderate-method-deviation\\.options').check();
    cy.get('[data-cy="moderate-method-deviation.explain.other"]').click({force: true});
    cy.get('[data-cy="moderate-method-deviation.explain.other"]').type('Test3');

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DeviationOptions1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationOptions1"] > #DeviationOptions').check();
    cy.get('[data-cy="reversible-method-deviation.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="reversible-method-deviation.options0"] > #reversible-method-deviation\\.options').check();
    cy.get('[data-cy="reversible-method-deviation.explain.numerator"]').click({force: true});
    cy.get('[data-cy="reversible-method-deviation.explain.numerator"]').type('Test4');
    cy.get('[data-cy="reversible-method-deviation.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="reversible-method-deviation.options1"] > #reversible-method-deviation\\.options').check();
    cy.get('[data-cy="reversible-method-deviation.explain.denominator"]').click({force: true});
    cy.get('[data-cy="reversible-method-deviation.explain.denominator"]').type('Test5');
    cy.get('[data-cy="reversible-method-deviation.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="reversible-method-deviation.options2"] > #reversible-method-deviation\\.options').check();
    cy.get('[data-cy="reversible-method-deviation.explain.other"]').click({force: true});
    cy.get('[data-cy="reversible-method-deviation.explain.other"]').type('Test6');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('#CombinedRates0').check();
    cy.get('[data-cy="CombinedRates-CombinedRates0"]').click();
    cy.get('#CombinedRates-CombinedRates0').check();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="CategoriesReported0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="CategoriesReported0"] > #CategoriesReported').check();
    cy.get('[data-cy="NonHispanicRacialCategories0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="NonHispanicRacialCategories0"] > #NonHispanicRacialCategories').check();
    cy.get('[data-cy="NHRC-WhiteRates.contraceptionData0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="NHRC-WhiteRates.contraceptionData0"] > #NHRC-WhiteRates\\.contraceptionData').check();
    cy.get('[data-cy="NHRC-WhiteRates.subRates.0.moderate-method.0.numerator"]').clear();
    cy.get('[data-cy="NHRC-WhiteRates.subRates.0.moderate-method.0.numerator"]').type('1');
    cy.get('[data-cy="NHRC-WhiteRates.subRates.0.moderate-method.0.denominator"]').clear();
    cy.get('[data-cy="NHRC-WhiteRates.subRates.0.moderate-method.0.denominator"]').type('2');
    cy.get('[data-cy="NHRC-WhiteRates.contraceptionData1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="NHRC-WhiteRates.contraceptionData1"] > #NHRC-WhiteRates\\.contraceptionData').check();
    cy.get('[data-cy="NHRC-WhiteRates.subRates.0.reversible-method.0.numerator"]').clear();
    cy.get('[data-cy="NHRC-WhiteRates.subRates.0.reversible-method.0.numerator"]').type('3');
    cy.get('[data-cy="NHRC-WhiteRates.subRates.0.reversible-method.0.denominator"]').clear();
    cy.get('[data-cy="NHRC-WhiteRates.subRates.0.reversible-method.0.denominator"]').type('4');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="NonHispanicRacialCategories5"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="NonHispanicRacialCategories5"] > #NonHispanicRacialCategories').check();
    cy.get('#field-276').clear();
    cy.get('#field-276').type('North');
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.contraceptionData0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.contraceptionData0"] > #AddtnlNonHispanicRaceRates\\.0\\.contraceptionData').check();
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.moderate-method.0.numerator"]').clear();
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.moderate-method.0.numerator"]').type('1');
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.moderate-method.0.denominator"]').clear();
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.moderate-method.0.denominator"]').type('2');
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.contraceptionData1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.contraceptionData1"] > #AddtnlNonHispanicRaceRates\\.0\\.contraceptionData').check();
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.reversible-method.0.numerator"]').clear();
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.reversible-method.0.numerator"]').type('3');
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.reversible-method.0.denominator"]').clear();
    cy.get('[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.reversible-method.0.denominator"]').type('4');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="Validate Measure"]').should('be.enabled');
    cy.get('[data-cy="Complete Measure"]').should('be.enabled');
    /* ==== End Cypress Studio ==== */
  } );

   it("No for Reporting", () => {
     /* ==== Generated with Cypress Studio ==== */
     cy.get('[data-cy="ACS"]').click();
     cy.get('[data-cy="CCW-AD"]').click();
     cy.get('[data-cy="DidReport1"]').click({ force: true });
     
     
     /* ==== End Cypress Studio ==== */
   } );

it("Other Performance Measure", () => {
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-cy="ACS"]').click();
  cy.get('[data-cy="CCW-AD"]').click();
  cy.get('[data-cy="MeasurementSpecification1"]').click({force: true});
  cy.get('[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]').click({force: true});
  cy.get('[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]').type('Test');

  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('.css-zhlq69 > .chakra-form-control').click();
  cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
  cy.get('[data-cy="DataSource0"] > #DataSource').check();
  cy.get('[data-cy="DataSource-Administrative0"] > .chakra-checkbox__control').click();
  cy.get('[data-cy="DataSource-Administrative0"] > #DataSource-Administrative').check();
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-cy="OtherPerformanceMeasure-Explanation"]').click({force: true});
  cy.get('[data-cy="OtherPerformanceMeasure-Explanation"]').type('OPM');
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').click({force: true});
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type('Age Range: 21 to 44');
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').clear();
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type('1');
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]').clear();
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]').type('2');
  cy.get('[data-cy="+ Add Another"]').click();
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').clear();
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').type('Test2');
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').clear();
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type('3');
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]').clear();
  cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]').type('4');
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-cy="Validate Measure"]').should('be.enabled');
  cy.get('[data-cy="Complete Measure"]').should('be.enabled');
  /* ==== End Cypress Studio ==== */
} );
  }); 
