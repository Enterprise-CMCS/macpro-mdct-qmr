describe("Submit Core Set button", () => {
  beforeEach(() => {
    cy.login("stateuser1");
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Reset All Measures"]').click();
    cy.wait(1000);
  });

  it("should allow submission inside the core set measure selection", () => {
    // confirm reset
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "in progress1 of 32 complete"
    );

    // complete core set
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Complete All Measures"]').click();
    cy.wait(4000);
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "complete32 of 32 complete"
    );

    // submit core set
    cy.goToAdultMeasures();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
    cy.get('[data-cy="SubmitCoreSetButtonWrapper"]').should(
      "contain.text",
      "Submitted"
    );

    // confirm submission
    cy.visit("/");
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "submitted32 of 32 complete"
    );
  });

  // This test takes 2 minutes
  it("should require qualifiers to submit the core set", () => {
    // confirm reset
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "in progress1 of 32 complete"
    );

    // complete all measures
    cy.goToAdultMeasures();
    for (const abbr of measureAbbrList) {
      completeMeasure(abbr);
    }
    cy.get('[data-cy="Submit Core Set"]').should("be.disabled");

    // confirm all measures complete
    cy.visit("/");
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "complete32 of 32 complete"
    );

    // complete qualifier
    cy.goToAdultMeasures();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get('[data-cy="complete-core-set-questions-button"]')
      .should("be.visible")
      .click();
    cy.get(".chakra-modal__content footer button").contains("Yes").click();

    // submit core set
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
    cy.get('[data-cy="SubmitCoreSetButtonWrapper"]').should(
      "contain.text",
      "Submitted"
    );
  });
});

const measureAbbrList = [
  "AMM-AD",
  "AMR-AD",
  "BCS-AD",
  "CBP-AD",
  "CCP-AD",
  "CCS-AD",
  "CCW-AD",
  "CDF-AD",
  "CHL-AD",
  "COB-AD",
  "CPA-AD",
  "FUA-AD",
  "FUH-AD",
  "FUM-AD",
  "FVA-AD",
  "HPC-AD",
  "HPCMI-AD",
  "HVL-AD",
  "IET-AD",
  "MSC-AD",
  // "NCIDDS-AD",  // complete on creation
  "OHD-AD",
  "OUD-AD",
  "PC01-AD",
  "PCR-AD",
  "PPC-AD",
  "PQI01-AD",
  "PQI05-AD",
  "PQI08-AD",
  "PQI15-AD",
  "SAA-AD",
  "SSD-AD",
];

// Complete all measures excluding Core Set Qualifier
const completeMeasure = (measureName: string) => {
  cy.goToMeasure(measureName);
  cy.get('[data-cy="Complete Measure"]').should("be.visible").click();
  cy.get(".chakra-modal__content footer button").contains("Yes").click();
};
