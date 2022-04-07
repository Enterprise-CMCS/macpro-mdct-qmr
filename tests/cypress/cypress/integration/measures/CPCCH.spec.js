describe("OY2 9963 CPC CH", () => {
  beforeEach(() => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CPC-CH");
  });

  it("If not collecting and not why not -> show error", () => {
    cy.get('[data-cy="DidCollect1"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Why Are You Not Collecting On This Measure Error"]'
    ).should("have.text", "Why Are You Not Collecting On This Measure Error");
  });

  it("should show correct data source options", () => {
    cy.get("#DataSource-CAHPS-Version-CAHPS\\ 5\\.1H").should(
      "have.text",
      "CAHPS 5.1H"
    );
    cy.get("#DataSource-CAHPS-Version-Other").should("have.text", "Other");
  });

  it("should show correct sections", () => {
    cy.get(
      '[data-cy="DataSource-Included-ItemSets0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "No Supplemental Item Sets were included");
    cy.get(
      '[data-cy="DataSource-Included-ItemSets1"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "CAHPS Item Set for Children with Chronic Conditions"
    );
    cy.get(
      '[data-cy="DataSource-Included-ItemSets2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other CAHPS Item Set");
    cy.get("#DefinitionOfSurveySample-SurveySampleiIncludesCHIPOnly").should(
      "have.text",
      "Survey sample includes CHIP (Title XXI) population only"
    );
  });
});
