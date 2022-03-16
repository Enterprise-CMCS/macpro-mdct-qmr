describe("Measure: OHD-AD", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("OHD-AD");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    const a = document.querySelector('label[data-cy="Performance Measure"]');
    console.log("a.innerText", a.innerHTML);
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it("Ensure Data Source question includes Administrative Data, and Other Data Source selections.", () => {
    // admin data
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");

    // other data source
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
  });
});
