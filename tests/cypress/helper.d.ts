/// <reference types="cypress-axe" />

type MeasureList = "OHD-AD";
declare namespace Cypress {
  interface Chainable {
    // the default stateuser3 is used to login but can also be changed
    // by passing in a user (not including the @test.com) ex. cy.login('bouser')
    login(user?: string, password?: string): Chainable<Element>;

    // the default stateuser4 is used to login but can also be changed
    // by passing in a user (not including the @test.com) ex. cy.login('bouser')
    loginHealthHome(user?: string, password?: string): Chainable<Element>;

    //Select Reporting Year
    selectYear(year: string): Chainable<Element>;

    // Visit Adult Core Set Measures
    goToAdultMeasures(): Chainable<Element>;

    // Visit Child Core Set Measures
    goToChildCoreSetMeasures(): Chainable<Element>;

    // Visit Health Home Core Set Measures
    goToHealthHomeSetMeasures(): Chainable<Element>;

    // Select file method
    selectFile(fileName: string);

    // Visit Measures based on abbr
    goToMeasure(measure: MeasureList | string): Chainable<Element>;

    // Correct sections visible when user is reporting data on measure
    displaysSectionsWhenUserIsReporting(): Chainable<Element>;

    // Correct sections visible when user is not reporting data on measure
    displaysSectionsWhenUserNotReporting(): Chainable<Element>;

    // removes child core set from main page
    deleteChildCoreSets(): Chainable<Element>;

    // removes health home core set from main page
    deleteHealthHomeSets(): Chainable<Element>;

    // if user doesn't fill description box, show error
    showErrorIfNotReportingAndNotWhy(): Chainable<Element>;

    showErrorIfReportingAndNoNdrSet(): Chainable<Element>;

    showErrorIfCombinedRatesAndNoAdditionalSelection(): Chainable<Element>;

    /** Validate measure needs to wait for the page reload before components are interactable */
    clickValidateMeasure(timeout?: number): Chainable<Element>;

    /** Add combined child coreset */
    addCombinedChildCoreset(): Chainable<Element>;

    // Helper function to enter a valid date range
    enterValidDateRange(): Chainable<Element>;

    /** Add a new State Specific measure. Optionally define description and detailedDescription. */
    addStateSpecificMeasure(
      description?: string,
      detailedDescription?: string
    ): Chainable<Element>;

    /** Delete a State Specific measure. Optionally define description*/
    deleteStateSpecificMeasure(description?: string): Chainable<Element>;

    /** Correct sections visible in SSHH measure */
    SSHHdisplaysCorrectSections(): Chainable<Element>;
  }
}
