const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 8977 Measure 15 MSC-AD", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser3@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Screen Enhancement", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('a > .chakra-text').click();
    cy.get(':nth-child(21) > :nth-child(1) > a > .chakra-text').click();
    cy.get('.css-itvw0n').should('have.text', 'For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov.');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy=DidReport1]').click({force:true});
    cy.get('[data-cy=WhyAreYouNotReporting0] > .chakra-checkbox__control').click({force:true});
    cy.get('[data-cy=WhyAreYouNotReporting0] > #WhyAreYouNotReporting').check({force:true});
    cy.get('[data-cy=WhyAreYouNotReporting1] > .chakra-checkbox__control').click();
    cy.get('[data-cy=WhyAreYouNotReporting1] > #WhyAreYouNotReporting').check({force:true});
    /* ==== End Cypress Studio ==== */
  });



  /* ==== Test Created with Cypress Studio ==== */
  it('Click on Yes option from first question', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('a > .chakra-text').click({force:true});
    cy.get(':nth-child(21) > :nth-child(1) > a > .chakra-text').click({force:true});
    cy.get('[data-cy=DidReport0]').click({force:true});
    cy.get('#radio-177').check({force:true});
    cy.get('[data-cy=DataStatus0]').click({force:true});
    cy.get('#radio-181').check({force:true});
    cy.get('[data-cy=MeasurementSpecification0]').click({force:true});
    cy.xpath("(//span[@class='chakra-radio__control css-gzpnyx'])[7]").click();
    //cy.get('#radio-234').check({force:true});
    //cy.get('#DataSource-CAHPS-Version_radiogroup > .chakra-stack > :nth-child(1) > .chakra-radio').click({force:true});
    //cy.get('#radio-238').check({force:true});
    cy.get('[data-cy=MeasurementSpecification-HEDISVersion]').select('HEDIS MY 2020 (FFY 2021 Core Set Reporting)');
    cy.xpath("(//input[@label='Month'])[1]").clear();
    cy.xpath("(//input[@label='Month'])[1]").type('10');
    cy.xpath("(//input[@label='Year'])[1]").clear();
    cy.xpath("(//input[@label='Year'])[1]").type('2019');
    cy.xpath("(//input[@label='Month'])[2]").clear();
    cy.xpath("(//input[@label='Month'])[2]").type('10');
    cy.xpath("(//input[@label='Year'])[2]").clear();
    cy.xpath("(//input[@label='Year'])[2]").type('2021');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy=DefinitionOfDenominator0] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DefinitionOfDenominator0] > #DefinitionOfDenominator').check();
    cy.get('[data-cy=DefinitionOfDenominator1]').click();
    cy.get('[data-cy=DefinitionOfDenominator1] > #DefinitionOfDenominator').check();
    cy.get('[data-cy=DefinitionOfDenominator2] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DefinitionOfDenominator2] > #DefinitionOfDenominator').check();
    cy.get('[data-cy=DefinitionOfDenominator3] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DefinitionOfDenominator3] > #DefinitionOfDenominator').check();
    cy.get('[data-cy=DefinitionOfDenominator-Other]').click();
    cy.get('[data-cy=ChangeInPopulationExplanation]').click();
    cy.get('[data-cy=DenominatorDefineTotalTechSpec0]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio (which delivery systems are represented in the denominator? section)==== */
    cy.get('[data-cy=DeliverySysRepresentationDenominator0] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeliverySysRepresentationDenominator0] > #DeliverySysRepresentationDenominator').check();
    cy.get('[data-cy=DeliverySys-FreeForService0]').click();
    cy.get('#radio-246').check();
    cy.get('[data-cy=DeliverySysRepresentationDenominator1] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeliverySysRepresentationDenominator1] > #DeliverySysRepresentationDenominator').check();
    cy.get('[data-cy=DeliverySys-PrimaryCareManagement0]').click();
    cy.get('#radio-250').check();
    cy.get('[data-cy=DeliverySysRepresentationDenominator2] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeliverySysRepresentationDenominator2] > #DeliverySysRepresentationDenominator').check();
    cy.get('[data-cy=DeliverySys-MCO_POHP-Percent]').clear();
    cy.get('[data-cy=DeliverySys-MCO_POHP-Percent]').type('10');
    cy.get('[data-cy=DeliverySys-MCO_POHP-NumberOfPlans]').clear();
    cy.get('[data-cy=DeliverySys-MCO_POHP-NumberOfPlans]').type('20');
    cy.get('[data-cy=DeliverySys-MCO_POHP0]').click();
    cy.get('#radio-256').check();
    cy.get('[data-cy=DeliverySysRepresentationDenominator3] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeliverySysRepresentationDenominator3] > #DeliverySysRepresentationDenominator').check();
    cy.get('[data-cy=DeliverySys-IntegratedCareModel0]').click();
    cy.get('#radio-260').check();
    cy.get('[data-cy=DeliverySysRepresentationDenominator4] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeliverySysRepresentationDenominator4] > #DeliverySysRepresentationDenominator').check();
    cy.get('[data-cy=DeliverySys-Other]').click();
    cy.get('[data-cy=DeliverySys-Other-Percent]').clear();
    cy.get('[data-cy=DeliverySys-Other-Percent]').type('10');
    cy.get('[data-cy=DeliverySys-Other-NumberOfHealthPlans]').clear();
    cy.get('[data-cy=DeliverySys-Other-NumberOfHealthPlans]').type('20');
    cy.get('[data-cy=DeliverySys-Other-Population]').clear();
    cy.get('[data-cy=DeliverySys-Other-Population]').type('30');

    cy.get('.chakra-container > :nth-child(8)').should(
      'have.text',
      'Performance MeasureThe following components of this measure assess different facets of providing medical assistance with smoking and tobacco use cessation:Advising Smokers and Tobacco Users to Quit – A rolling average represents the percentage of beneficiaries age 18 and older who were current smokers or tobacco users and who received advice to quit during the measurement yearDiscussing Cessation Medications – A rolling average represents the percentage of beneficiaries age 18 and older who were current smokers or tobacco users and who discussed or were recommended cessation medications during the measurement yearDiscussing Cessation Strategies – A rolling average represents the percentage of beneficiaries age 18 and older who were current smokers or tobacco users and who discussed or were provided cessation methods or strategies during the measurement yearIf the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:Enter a number for the numerator and the denominator. Rate will auto-calculate:Advising Smokers and Tobacco Users to QuitAges 18 to 64NumeratorDenominatorRateAge 65 and olderNumeratorDenominatorRateDiscussing Cessation MedicationsAges 18 to 64NumeratorDenominatorRateAge 65 and olderNumeratorDenominatorRateDiscussing Cessation StrategiesAges 18 to 64NumeratorDenominatorRateAge 65 and olderNumeratorDenominatorRatePercentage of Current Smokers and Tobacco UsersAges 18 to 64NumeratorDenominatorRateAge 65 and olderNumeratorDenominatorRate'
    );

    cy.get('[data-cy=PerformanceMeasure-Explanation]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Performance Measure and Deviations from Measure Specifications ==== */
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.0.numerator"]').type('2');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.0.denominator"]').type('10');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.numerator"]').type('2');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.denominator"]').type('10');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.rate"]').should('have.value', '20.0');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.0.numerator"]').type('4');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.0.denominator"]').type('10');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.1.numerator"]').type('7');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.1.denominator"]').type('10');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.0.numerator"]').type('1');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.0.denominator"]').type('10');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.1.numerator"]').type('4');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.1.denominator"]').type('10');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.0.numerator"]').type('4');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.0.denominator"]').type('10');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.1.numerator"]').type('4');
    cy.get('[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.1.denominator"]').type('10');
    cy.get('#DidCalculationsDeviate_radiogroup > .chakra-stack > :nth-child(1) > .chakra-radio').click();
    cy.get('#radio-241').check();
    cy.get('[data-cy=DeviationOptions0] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions0] > #DeviationOptions').check();
    cy.get('[data-cy=DeviationOptions-AdvisingUsersToQuit-AgeRange0] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions-AdvisingUsersToQuit-AgeRange0] > #DeviationOptions-AdvisingUsersToQuit-AgeRange').check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.options0"] > #DeviationFields-AdvisingUsersToQuit\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.numerator"]').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.options1"] > #DeviationFields-AdvisingUsersToQuit\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.denominator"]').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.options2"] > #DeviationFields-AdvisingUsersToQuit\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.other"]').click();
    cy.get('[data-cy=DeviationOptions-AdvisingUsersToQuit-AgeRange1] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions-AdvisingUsersToQuit-AgeRange1] > #DeviationOptions-AdvisingUsersToQuit-AgeRange').check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.options0"] > #DeviationFields-AdvisingUsersToQuit\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.numerator"]').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.options1"] > #DeviationFields-AdvisingUsersToQuit\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.denominator"]').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.options2"] > #DeviationFields-AdvisingUsersToQuit\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.other"]').click();
    cy.get('[data-cy=DeviationOptions1] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions1] > #DeviationOptions').check();
    cy.get('[data-cy=DeviationOptions-DiscussingCessationMedications-AgeRange0] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions-DiscussingCessationMedications-AgeRange0] > #DeviationOptions-DiscussingCessationMedications-AgeRange').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.options0"] > #DeviationFields-DiscussingCessationMedications\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.numerator"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.options1"] > #DeviationFields-DiscussingCessationMedications\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.denominator"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.options2"] > #DeviationFields-DiscussingCessationMedications\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.0.other"]').click();
    cy.get('[data-cy=DeviationOptions-DiscussingCessationMedications-AgeRange1] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions-DiscussingCessationMedications-AgeRange1] > #DeviationOptions-DiscussingCessationMedications-AgeRange').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.options0"] > #DeviationFields-DiscussingCessationMedications\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.numerator"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.options1"] > #DeviationFields-DiscussingCessationMedications\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.denominator"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.options2"] > #DeviationFields-DiscussingCessationMedications\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationMedications.1.other"]').click();
    cy.get('[data-cy=DeviationOptions2]').click();
    cy.get('[data-cy=DeviationOptions2] > #DeviationOptions').check();
    cy.get('[data-cy=DeviationOptions-DiscussingCessationStrategies-AgeRange0] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions-DiscussingCessationStrategies-AgeRange0] > #DeviationOptions-DiscussingCessationStrategies-AgeRange').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.options0"] > #DeviationFields-DiscussingCessationStrategies\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.numerator"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.options1"] > #DeviationFields-DiscussingCessationStrategies\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.denominator"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.options2"] > #DeviationFields-DiscussingCessationStrategies\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.0.other"]').click();
    cy.get('[data-cy=DeviationOptions-DiscussingCessationStrategies-AgeRange1]').click();
    cy.get('[data-cy=DeviationOptions-DiscussingCessationStrategies-AgeRange1] > #DeviationOptions-DiscussingCessationStrategies-AgeRange').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.options0"] > #DeviationFields-DiscussingCessationStrategies\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.numerator"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.options1"] > #DeviationFields-DiscussingCessationStrategies\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.denominator"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.options2"]').click();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.options2"] > #DeviationFields-DiscussingCessationStrategies\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-DiscussingCessationStrategies.1.other"]').click();
    cy.get('[data-cy=DeviationOptions3] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions3] > #DeviationOptions').check();
    cy.get('[data-cy=DeviationOptions-PercentageOfUsers-AgeRange0] > .chakra-checkbox__control').click();
    cy.get('[data-cy=DeviationOptions-PercentageOfUsers-AgeRange0] > #DeviationOptions-PercentageOfUsers-AgeRange').check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.options0"] > #DeviationFields-PercentageOfUsers\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.numerator"]').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.options1"] > #DeviationFields-PercentageOfUsers\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.denominator"]').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.options2"] > #DeviationFields-PercentageOfUsers\\.0\\.options').check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.other"]').click();
    cy.get('[data-cy=DeviationOptions-PercentageOfUsers-AgeRange1]').click();
    cy.get('[data-cy=DeviationOptions-PercentageOfUsers-AgeRange1] > #DeviationOptions-PercentageOfUsers-AgeRange').check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.options0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.options0"] > #DeviationFields-PercentageOfUsers\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.numerator"]').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.options1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.options1"] > #DeviationFields-PercentageOfUsers\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.denominator"]').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.options2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.options2"] > #DeviationFields-PercentageOfUsers\\.1\\.options').check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.other"]').click();
    cy.get('[data-cy=CombinedRates0]').click();
    cy.get('#radio-209').check();
    cy.get('[data-cy=CombinedRates-CombinedRates0]').click();
    cy.get('#radio-306').check();
    cy.get('#CombinedRates-CombinedRates_radiogroup > .chakra-stack > :nth-child(2) > .chakra-radio').click();
    cy.get('#radio-307').check();
    cy.get('[data-cy=CombinedRates-CombinedRates2]').click();
    cy.get('#radio-308').check();
    cy.get('[data-cy=CombinedRates-CombinedRates-Other-Explanation]').click();
    /* ==== End Cypress Studio ==== */
  });
})
