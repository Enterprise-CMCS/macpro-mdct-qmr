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

  it("User click on No option for the first question and fill out the form with No option", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(21) > :nth-child(1) > a > .chakra-text").click();
    cy.get(".css-itvw0n").should(
      "have.text",
      "For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov."
    );
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=DidReport1]").click({ force: true });
    cy.get(
      "[data-cy=WhyAreYouNotReporting0] > .chakra-checkbox__control"
    ).click({ force: true });
    cy.get("[data-cy=WhyAreYouNotReporting0] > #WhyAreYouNotReporting").check({
      force: true,
    });
    cy.get(
      "[data-cy=WhyAreYouNotReporting1] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=WhyAreYouNotReporting1] > #WhyAreYouNotReporting").check({
      force: true,
    });
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Click on Yes option from first question", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > .chakra-text").click({ force: true });
    cy.get(":nth-child(21) > :nth-child(1) > a > .chakra-text").click({
      force: true,
    });
    cy.get("[data-cy=DidReport0]").click({ force: true }); // clicking yes
    //cy.get("#radio-177").check({ force: true });
    cy.get("[data-cy=DataStatus0]").click({ force: true });
    //cy.get("#radio-181").check({ force: true });
    cy.get("[data-cy=MeasurementSpecification0]").click({ force: true });
    cy.xpath("(//span[@class='chakra-radio__control css-gzpnyx'])[7]").click();
    //cy.get('#radio-234').check({force:true});
    //cy.get('#DataSource-CAHPS-Version_radiogroup > .chakra-stack > :nth-child(1) > .chakra-radio').click({force:true});
    //cy.get('#radio-238').check({force:true});
    cy.get("[data-cy=MeasurementSpecification-HEDISVersion]").select(
      "HEDIS MY 2020 (FFY 2021 Core Set Reporting)"
    );
    cy.xpath("(//input[@label='Month'])[1]").clear();
    cy.xpath("(//input[@label='Month'])[1]").type("10");
    cy.xpath("(//input[@label='Year'])[1]").clear();
    cy.xpath("(//input[@label='Year'])[1]").type("2019");
    cy.xpath("(//input[@label='Month'])[2]").clear();
    cy.xpath("(//input[@label='Month'])[2]").type("10");
    cy.xpath("(//input[@label='Year'])[2]").clear();
    cy.xpath("(//input[@label='Year'])[2]").type("2021");
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      "[data-cy=DefinitionOfDenominator0] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DefinitionOfDenominator0] > #DefinitionOfDenominator"
    ).check();
    cy.get("[data-cy=DefinitionOfDenominator1]").click();
    cy.get(
      "[data-cy=DefinitionOfDenominator1] > #DefinitionOfDenominator"
    ).check();
    cy.get(
      "[data-cy=DefinitionOfDenominator2] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DefinitionOfDenominator2] > #DefinitionOfDenominator"
    ).check();
    cy.get(
      "[data-cy=DefinitionOfDenominator3] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DefinitionOfDenominator3] > #DefinitionOfDenominator"
    ).check();
    cy.get("[data-cy=DefinitionOfDenominator-Other]").click();
    cy.get("[data-cy=ChangeInPopulationExplanation]").click();
    cy.get("[data-cy=DenominatorDefineTotalTechSpec0]").click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio (which delivery systems are represented in the denominator? section)==== */
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator0] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator0] > #DeliverySysRepresentationDenominator"
    ).check();
    cy.get("[data-cy=DeliverySys-FreeForService0]").click();
    //cy.get("#radio-246").check();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator1] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator1] > #DeliverySysRepresentationDenominator"
    ).check();
    cy.get("[data-cy=DeliverySys-PrimaryCareManagement0]").click();
    //cy.get("#radio-250").check();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator2] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator2] > #DeliverySysRepresentationDenominator"
    ).check();
    cy.get("[data-cy=DeliverySys-MCO_POHP-Percent]").clear();
    cy.get("[data-cy=DeliverySys-MCO_POHP-Percent]").type("10");
    cy.get("[data-cy=DeliverySys-MCO_POHP-NumberOfPlans]").clear();
    cy.get("[data-cy=DeliverySys-MCO_POHP-NumberOfPlans]").type("20");
    cy.get("[data-cy=DeliverySys-MCO_POHP0]").click();
    //cy.get("#radio-256").check();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator3] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator3] > #DeliverySysRepresentationDenominator"
    ).check();
    cy.get("[data-cy=DeliverySys-IntegratedCareModel0]").click();
    //cy.get("#radio-260").check();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator4] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeliverySysRepresentationDenominator4] > #DeliverySysRepresentationDenominator"
    ).check();
    cy.get("[data-cy=DeliverySys-Other]").click();
    cy.get("[data-cy=DeliverySys-Other-Percent]").clear();
    cy.get("[data-cy=DeliverySys-Other-Percent]").type("10");
    cy.get("[data-cy=DeliverySys-Other-NumberOfHealthPlans]").clear();
    cy.get("[data-cy=DeliverySys-Other-NumberOfHealthPlans]").type("20");
    cy.get("[data-cy=DeliverySys-Other-Population]").clear();
    cy.get("[data-cy=DeliverySys-Other-Population]").type("30");

    cy.get(".chakra-container > :nth-child(8)").should(
      "have.text",
      "Performance MeasureThe following components of this measure assess different facets of providing medical assistance with smoking and tobacco use cessation:Advising Smokers and Tobacco Users to Quit – A rolling average represents the percentage of beneficiaries age 18 and older who were current smokers or tobacco users and who received advice to quit during the measurement yearDiscussing Cessation Medications – A rolling average represents the percentage of beneficiaries age 18 and older who were current smokers or tobacco users and who discussed or were recommended cessation medications during the measurement yearDiscussing Cessation Strategies – A rolling average represents the percentage of beneficiaries age 18 and older who were current smokers or tobacco users and who discussed or were provided cessation methods or strategies during the measurement yearIf the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:Enter a number for the numerator and the denominator. Rate will auto-calculate:Advising Smokers and Tobacco Users to QuitAges 18 to 64NumeratorDenominatorRateAge 65 and olderNumeratorDenominatorRateDiscussing Cessation MedicationsAges 18 to 64NumeratorDenominatorRateAge 65 and olderNumeratorDenominatorRateDiscussing Cessation StrategiesAges 18 to 64NumeratorDenominatorRateAge 65 and olderNumeratorDenominatorRatePercentage of Current Smokers and Tobacco UsersAges 18 to 64NumeratorDenominatorRateAge 65 and olderNumeratorDenominatorRate"
    );

    cy.get("[data-cy=PerformanceMeasure-Explanation]").click();
    /* ==== End Cypress Studio ==== */
    /* ==== Performance Measure and Deviations from Measure Specifications ==== */
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-AdvisingUsers.1.rate"]'
    ).should("have.value", "20.0");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.1.numerator"]'
    ).type("7");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingMedications.1.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.1.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-DiscussingStrategies.1.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.1.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-PercentageUsers.1.denominator"]'
    ).type("10");
    cy.get(
      "#DidCalculationsDeviate_radiogroup > .chakra-stack > :nth-child(1) > .chakra-radio"
    ).click();
    //cy.get("#radio-241").check();
    cy.get("[data-cy=DeviationOptions0] > .chakra-checkbox__control").click();
    cy.get("[data-cy=DeviationOptions0] > #DeviationOptions").check();
    cy.get(
      "[data-cy=DeviationOptions-AdvisingUsersToQuit-AgeRange0] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-AdvisingUsersToQuit-AgeRange0] > #DeviationOptions-AdvisingUsersToQuit-AgeRange"
    ).check();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.0.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.0.options0"] > #DeviationFields-AdvisingUsersToQuit\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.0.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.0.options1"] > #DeviationFields-AdvisingUsersToQuit\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.0.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.0.options2"] > #DeviationFields-AdvisingUsersToQuit\\.0\\.options'
    ).check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.0.other"]').click();
    cy.get(
      "[data-cy=DeviationOptions-AdvisingUsersToQuit-AgeRange1] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-AdvisingUsersToQuit-AgeRange1] > #DeviationOptions-AdvisingUsersToQuit-AgeRange"
    ).check();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.1.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.1.options0"] > #DeviationFields-AdvisingUsersToQuit\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.1.numerator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.1.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.1.options1"] > #DeviationFields-AdvisingUsersToQuit\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.1.denominator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.1.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-AdvisingUsersToQuit.1.options2"] > #DeviationFields-AdvisingUsersToQuit\\.1\\.options'
    ).check();
    cy.get('[data-cy="DeviationFields-AdvisingUsersToQuit.1.other"]').click();
    cy.get("[data-cy=DeviationOptions1] > .chakra-checkbox__control").click();
    cy.get("[data-cy=DeviationOptions1] > #DeviationOptions").check();
    cy.get(
      "[data-cy=DeviationOptions-DiscussingCessationMedications-AgeRange0] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-DiscussingCessationMedications-AgeRange0] > #DeviationOptions-DiscussingCessationMedications-AgeRange"
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.options0"] > #DeviationFields-DiscussingCessationMedications\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.options1"] > #DeviationFields-DiscussingCessationMedications\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.options2"] > #DeviationFields-DiscussingCessationMedications\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.0.other"]'
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-DiscussingCessationMedications-AgeRange1] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-DiscussingCessationMedications-AgeRange1] > #DeviationOptions-DiscussingCessationMedications-AgeRange"
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.options0"] > #DeviationFields-DiscussingCessationMedications\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.numerator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.options1"] > #DeviationFields-DiscussingCessationMedications\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.denominator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.options2"] > #DeviationFields-DiscussingCessationMedications\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationMedications.1.other"]'
    ).click();
    cy.get("[data-cy=DeviationOptions2]").click();
    cy.get("[data-cy=DeviationOptions2] > #DeviationOptions").check();
    cy.get(
      "[data-cy=DeviationOptions-DiscussingCessationStrategies-AgeRange0] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-DiscussingCessationStrategies-AgeRange0] > #DeviationOptions-DiscussingCessationStrategies-AgeRange"
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.options0"] > #DeviationFields-DiscussingCessationStrategies\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.options1"] > #DeviationFields-DiscussingCessationStrategies\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.options2"] > #DeviationFields-DiscussingCessationStrategies\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.0.other"]'
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-DiscussingCessationStrategies-AgeRange1]"
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-DiscussingCessationStrategies-AgeRange1] > #DeviationOptions-DiscussingCessationStrategies-AgeRange"
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.options0"] > #DeviationFields-DiscussingCessationStrategies\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.numerator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.options1"] > #DeviationFields-DiscussingCessationStrategies\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.denominator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.options2"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.options2"] > #DeviationFields-DiscussingCessationStrategies\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-DiscussingCessationStrategies.1.other"]'
    ).click();
    cy.get("[data-cy=DeviationOptions3] > .chakra-checkbox__control").click();
    cy.get("[data-cy=DeviationOptions3] > #DeviationOptions").check();
    cy.get(
      "[data-cy=DeviationOptions-PercentageOfUsers-AgeRange0] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DeviationOptions-PercentageOfUsers-AgeRange0] > #DeviationOptions-PercentageOfUsers-AgeRange"
    ).check();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.0.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.0.options0"] > #DeviationFields-PercentageOfUsers\\.0\\.options'
    ).check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.numerator"]').click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.0.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.0.options1"] > #DeviationFields-PercentageOfUsers\\.0\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.0.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.0.options2"] > #DeviationFields-PercentageOfUsers\\.0\\.options'
    ).check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.0.other"]').click();
    cy.get("[data-cy=DeviationOptions-PercentageOfUsers-AgeRange1]").click();
    cy.get(
      "[data-cy=DeviationOptions-PercentageOfUsers-AgeRange1] > #DeviationOptions-PercentageOfUsers-AgeRange"
    ).check();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.1.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.1.options0"] > #DeviationFields-PercentageOfUsers\\.1\\.options'
    ).check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.numerator"]').click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.1.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.1.options1"] > #DeviationFields-PercentageOfUsers\\.1\\.options'
    ).check();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.1.denominator"]'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.1.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DeviationFields-PercentageOfUsers.1.options2"] > #DeviationFields-PercentageOfUsers\\.1\\.options'
    ).check();
    cy.get('[data-cy="DeviationFields-PercentageOfUsers.1.other"]').click();
    cy.get("[data-cy=CombinedRates0]").click();
    //cy.get("#radio-209").check();
    cy.get("[data-cy=CombinedRates-CombinedRates0]").click();
    //cy.get("#radio-306").check();
    cy.get(
      "#CombinedRates-CombinedRates_radiogroup > .chakra-stack > :nth-child(2) > .chakra-radio"
    ).click();
    //cy.get("#radio-307").check();
    cy.get("[data-cy=CombinedRates-CombinedRates2]").click();
    //cy.get("#radio-308").check();
    cy.get("[data-cy=CombinedRates-CombinedRates-Other-Explanation]").click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=CategoriesReported0] > .chakra-checkbox__control").click();
    cy.get("[data-cy=CategoriesReported0] > #CategoriesReported").check();
    cy.get(
      "[data-cy=NonHispanicRacialCategories0] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=NonHispanicRacialCategories0] > #NonHispanicRacialCategories"
    ).check();
    cy.get(
      '[data-cy="NHRC-WhiteRates.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="NHRC-WhiteRates.ageData0"] > #NHRC-WhiteRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      ".css-zhlq69 > :nth-child(3) > .chakra-stack > :nth-child(1)"
    ).click();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-WhiteRates.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="NHRC-WhiteRates.ageData1"] > #NHRC-WhiteRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-WhiteRates.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      "[data-cy=NonHispanicRacialCategories1] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=NonHispanicRacialCategories1] > #NonHispanicRacialCategories"
    ).check();
    cy.get('[data-cy="NHRC-BlackOrAfricanAmericanRates.ageData0"]').click();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.ageData0"] > #NHRC-BlackOrAfricanAmericanRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get('[data-cy="NHRC-BlackOrAfricanAmericanRates.ageData1"]').click();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.ageData1"] > #NHRC-BlackOrAfricanAmericanRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.advisingUsers.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-BlackOrAfricanAmericanRates.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      "[data-cy=NonHispanicRacialCategories2] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=NonHispanicRacialCategories2] > #NonHispanicRacialCategories"
    ).check();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.ageData0"] > #NHRC-AmericanIndianOrAlaskaNativeRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      ":nth-child(3) > :nth-child(2) > :nth-child(1) > .css-0 > :nth-child(1) > .css-n21gh5 > :nth-child(1) > .chakra-collapse > .css-zhlq69"
    ).click();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.ageData1"]'
    ).click();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.ageData1"] > #NHRC-AmericanIndianOrAlaskaNativeRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.percentageUsers.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AmericanIndianOrAlaskaNativeRates.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      "[data-cy=NonHispanicRacialCategories3] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=NonHispanicRacialCategories3] > #NonHispanicRacialCategories"
    ).check();
    cy.get("[data-cy=AsianIndependentReporting0]").click();
    //cy.get("#radio-388").check();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.ageData0"] > #NHRC-AggregateAsianRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.ageData1"] > #NHRC-AggregateAsianRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateAsianRates.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      "[data-cy=NonHispanicRacialCategories4] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=NonHispanicRacialCategories4] > #NonHispanicRacialCategories"
    ).check();
    cy.get("[data-cy=NativeHawaiianIndependentReporting0]").click();
    //cy.get("#radio-417").check();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.ageData0"]'
    ).click();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.ageData0"] > #NHRC-AggregateHawaiianOrPacificIslanderRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.ageData1"] > #NHRC-AggregateHawaiianOrPacificIslanderRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NHRC-AggregateHawaiianOrPacificIslanderRates.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      "[data-cy=NonHispanicRacialCategories5] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=NonHispanicRacialCategories5] > #NonHispanicRacialCategories"
    ).check();
    //cy.get("#field-444").clear();
    //cy.get("#field-444").type("test");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.ageData0"] > #AddtnlNonHispanicRaceRates\\.0\\.ageData'
    ).check();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.ageData1"] > #AddtnlNonHispanicRaceRates\\.0\\.ageData'
    ).check();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="AddtnlNonHispanicRaceRates.0.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=CategoriesReported1] > .chakra-checkbox__control").click();
    cy.get("[data-cy=CategoriesReported1] > #CategoriesReported").check();
    cy.get(
      "[data-cy=EthnicityCategories0] > .chakra-checkbox__control"
    ).click();
    cy.get("[data-cy=EthnicityCategories0] > #EthnicityCategories").check();
    cy.get('[data-cy="NonHispanicEthnicityRates.ageData0"]').click();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.ageData0"] > #NonHispanicEthnicityRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.ageData1"] > #NonHispanicEthnicityRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="NonHispanicEthnicityRates.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=EthnicityCategories1]").click();
    cy.get("[data-cy=EthnicityCategories1] > #EthnicityCategories").check();
    cy.get("[data-cy=HispanicIndependentReporting0]").click();
    //cy.get("#radio-499").check();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.ageData0"] > #HispanicEthnicityAggregateRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.ageData1"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.ageData1"] > #HispanicEthnicityAggregateRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="HispanicEthnicityAggregateRate.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=CategoriesReported2] > .chakra-checkbox__control").click();
    cy.get("[data-cy=CategoriesReported2] > #CategoriesReported").check();
    cy.get("[data-cy=SexOptions0] > .chakra-checkbox__control").click();
    cy.get("[data-cy=SexOptions0] > #SexOptions").check();
    cy.get(
      '[data-cy="MaleSexRates.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="MaleSexRates.ageData0"] > #MaleSexRates\\.ageData'
    ).check();
    cy.get("#field-528-label").click();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.advisingUsers.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="MaleSexRates.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="MaleSexRates.ageData1"] > #MaleSexRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="MaleSexRates.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=SexOptions1] > .chakra-checkbox__control").click();
    cy.get("[data-cy=SexOptions1] > #SexOptions").check();
    cy.get(
      '[data-cy="FemaleSexRates.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="FemaleSexRates.ageData0"] > #FemaleSexRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="FemaleSexRates.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="FemaleSexRates.ageData1"] > #FemaleSexRates\\.ageData'
    ).check();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="FemaleSexRates.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=CategoriesReported3] > .chakra-checkbox__control").click();
    cy.get("[data-cy=CategoriesReported3] > #CategoriesReported").check();
    cy.get("[data-cy=PrimaryLanguageOptions0]").click();
    cy.get(
      "[data-cy=PrimaryLanguageOptions0] > #PrimaryLanguageOptions"
    ).check();
    cy.get(
      '[data-cy="EnglishLanguageRate.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="EnglishLanguageRate.ageData0"] > #EnglishLanguageRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="EnglishLanguageRate.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="EnglishLanguageRate.ageData1"] > #EnglishLanguageRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.advisingUsers.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="EnglishLanguageRate.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      "[data-cy=PrimaryLanguageOptions1] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=PrimaryLanguageOptions1] > #PrimaryLanguageOptions"
    ).check();
    cy.get(
      '[data-cy="SpanishLanguageRate.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="SpanishLanguageRate.ageData0"] > #SpanishLanguageRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="SpanishLanguageRate.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="SpanishLanguageRate.ageData1"] > #SpanishLanguageRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      ":nth-child(4) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > .css-0 > :nth-child(1) > .css-n21gh5 > :nth-child(2) > .chakra-collapse > .css-zhlq69"
    ).click();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.percentageUsers.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="SpanishLanguageRate.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=CategoriesReported4] > .chakra-checkbox__control").click();
    cy.get("[data-cy=CategoriesReported4] > #CategoriesReported").check();
    cy.get(
      "[data-cy=DisabilityStatusOptions0] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DisabilityStatusOptions0] > #DisabilityStatusOptions"
    ).check();
    cy.get(
      '[data-cy="DisabilitySSIRate.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DisabilitySSIRate.ageData0"] > #DisabilitySSIRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilitySSIRate.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DisabilitySSIRate.ageData1"] > #DisabilitySSIRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilitySSIRate.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      "[data-cy=DisabilityStatusOptions1] > .chakra-checkbox__control"
    ).click();
    cy.get(
      "[data-cy=DisabilityStatusOptions1] > #DisabilityStatusOptions"
    ).check();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.ageData0"] > #DisabilityNonSSIRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.ageData1"] > #DisabilityNonSSIRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      ":nth-child(5) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > .css-0 > :nth-child(1) > .css-n21gh5 > :nth-child(2) > .chakra-collapse > .css-zhlq69"
    ).click();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="DisabilityNonSSIRate.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=CategoriesReported5] > .chakra-checkbox__control").click();
    cy.get("[data-cy=CategoriesReported5] > #CategoriesReported").check();
    cy.get("[data-cy=GeographyOptions0]").click();
    cy.get("[data-cy=GeographyOptions0] > #GeographyOptions").check();
    cy.get(
      '[data-cy="UrbanGeographyRate.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="UrbanGeographyRate.ageData0"] > #UrbanGeographyRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="UrbanGeographyRate.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="UrbanGeographyRate.ageData1"] > #UrbanGeographyRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="UrbanGeographyRate.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=GeographyOptions1]").click();
    cy.get("[data-cy=GeographyOptions1] > #GeographyOptions").check();
    cy.get(
      '[data-cy="RuralGeographyRate.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="RuralGeographyRate.ageData0"] > #RuralGeographyRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="RuralGeographyRate.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="RuralGeographyRate.ageData1"] > #RuralGeographyRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="RuralGeographyRate.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=CategoriesReported6] > .chakra-checkbox__control").click();
    cy.get("[data-cy=CategoriesReported6] > #CategoriesReported").check();
    cy.get(
      '[data-cy="ACAGroupRate.ageData0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="ACAGroupRate.ageData0"] > #ACAGroupRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.0.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="ACAGroupRate.ageData1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="ACAGroupRate.ageData1"] > #ACAGroupRate\\.ageData'
    ).check();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.advisingUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.advisingUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.advisingUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.advisingUsers.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.discussingMedications.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.discussingMedications.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.discussingMedications.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.discussingMedications.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.discussingStrategies.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.discussingStrategies.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.discussingStrategies.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.discussingStrategies.0.denominator"]'
    ).type("10");
    cy.get(
      ":nth-child(7) > :nth-child(2) > :nth-child(1) > .css-0 > :nth-child(1) > .css-n21gh5 > :nth-child(2) > .chakra-collapse > .css-zhlq69 > :nth-child(5) > .chakra-stack > :nth-child(1)"
    ).click();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.percentageUsers.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.percentageUsers.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.percentageUsers.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="ACAGroupRate.subRates.1.percentageUsers.0.denominator"]'
    ).type("10");
    cy.get("[data-cy=AdditionalNotes-AdditionalNotes]").click();
    cy.get("[data-cy=AdditionalNotes-AdditionalNotes]").click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("File upload and button verification", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.xpath("(//p[contains(text(),'Adult Core Set Measures')])[1]").click();
    cy.xpath("//p[contains(text(),'MSC-AD')]").scrollIntoView();
    cy.xpath("//p[contains(text(),'MSC-AD')]").should("be.visible");
    cy.xpath("//p[contains(text(),'MSC-AD')]").click({ force: true });
    const filePath = "/files/";
    cy.xpath("//u[contains(text(),'browse')]").scrollIntoView();
    const browseBTN = "//u[contains(text(),'browse')]";
    cy.xpath(browseBTN).attachFile(filePath + "test3.docx", {
      subjectType: "drag-n-drop",
    });
    cy.get(".css-9uu7yb > .chakra-text").should("be.visible");
    cy.get('[data-cy="Validate Measure"]').should("be.visible");
    cy.get('[data-cy="Complete Measure"]').should("be.visible");
    cy.get("[data-cy=Save]").should("be.visible");
    cy.get('[href="/WY/2021/ACS/MSC-AD"]').should("be.visible");
    /* ==== End Cypress Studio ==== */
  });
});
