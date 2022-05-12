describe("Submit Core Set button", () => {
  beforeEach(() => {
    cy.login("stateuser1");
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Reset All Measures"]').first().click();
    cy.wait(1000);
    // confirm reset
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "in progress1 of 32 complete"
    );
  });

  it("should allow submission inside the core set measure selection", () => {
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
    // complete all measures
    cy.goToAdultMeasures();
    for (const abbr of measureAbbrList.ADULT) {
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

  // test editing measure reverts core set status
  it("edits to measures of a 'submited' core set unsubmit the measure; button should reappear", () => {
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

    // Edit a measure
    cy.goToMeasure(measureAbbrList.ADULT[0]);
    cy.get('[data-cy="Save"]').click();
    cy.wait(1000);

    // Confirm unsubmission
    cy.visit("/");
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "in progress31 of 32 complete"
    );
    cy.goToAdultMeasures();
    cy.get('[data-cy="Submit Core Set"]').should("be.disabled");
  });

  // test editing qualifier reverts core set status
  it("edits to qualifier of a 'submited' core set unsubmit the measure; button should reappear (ACS)", () => {
    // complete all measures, qualifier, submit core set
    cy.goToAdultMeasures();
    qualifierTestSetup("ADULT", "MA2021ACS");

    // update submitted qualifier
    cy.goToAdultMeasures();
    completeQualifier();

    // confirm submit button reappears
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");

    // Confirm unsubmission
    cy.visit("/");
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "complete32 of 32 complete"
    );
    cy.goToAdultMeasures();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");
  });

  it("edits to qualifier of a 'submited' core set unsubmit the measure; button should reappear (CCS)", () => {
    // add child core set
    cy.get('[data-cy="add-childbutton"]').click();
    cy.get('[data-cy="ChildCoreSet-ReportType1"]').click();
    cy.get('[data-cy="Create"]').click();

    // complete all measures, qualifier, submit core set
    cy.get('[data-cy="CCS"]').click();
    qualifierTestSetup("CHILD", "MA2021CCS");

    // update submitted qualifier
    cy.get('[data-cy="CCS"]').click();
    completeQualifier();

    // confirm submit button reappears
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");

    // Confirm unsubmission
    cy.visit("/");
    cy.get('[data-cy="Status-MA2021CCS"]').should(
      "contain.text",
      "complete23 of 23 complete"
    );
    cy.get('[data-cy="CCS"]').click();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");

    // DELETE Child Core Set (CCS)
    cy.visit("/");
    cy.get('[data-cy="child-kebab-menu"]').click();
    cy.get('[data-cy="Delete"]').click();
    cy.get('[data-cy="delete-table-item-input"]').type("delete{enter}");
    cy.wait(1000);
  });

  it("edits to qualifier of a 'submited' core set unsubmit the measure; button should reappear (CCSC)", () => {
    // add child core set
    cy.get('[data-cy="add-childbutton"]').click();
    cy.get('[data-cy="ChildCoreSet-ReportType0"]').click();
    cy.get('[data-cy="Create"]').click();

    // complete all measures, qualifier, submit core set
    cy.get('[data-cy="CCSC"]').click();
    qualifierTestSetup("CHILD", "MA2021CCSC");

    // update submitted qualifier
    cy.get('[data-cy="CCSC"]').click();
    completeQualifier();

    // confirm submit button reappears
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");

    // Confirm unsubmission
    cy.visit("/");
    cy.get('[data-cy="Status-MA2021CCSC"]').should(
      "contain.text",
      "complete23 of 23 complete"
    );
    cy.get('[data-cy="CCSC"]').click();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");

    // Does not delete so core sets are available in next test
  });

  it("edits to qualifier of a 'submited' core set unsubmit the measure; button should reappear (CCSM)", () => {
    // Assumes CCSM was created in previous test

    // complete all measures, qualifier, submit core set
    cy.get('[data-cy="CCSM"]').click();
    qualifierTestSetup("CHILD", "MA2021CCSM");

    // update submitted qualifier
    cy.get('[data-cy="CCSM"]').click();
    completeQualifier();

    // confirm submit button reappears
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");

    // Confirm unsubmission
    cy.visit("/");
    cy.get('[data-cy="Status-MA2021CCSM"]').should(
      "contain.text",
      "complete23 of 23 complete"
    );
    cy.get('[data-cy="CCSM"]').click();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");
  });

  // it("edits to qualifier of a 'submited' core set unsubmit the measure; button should reappear (HHCS)", () => {});
});

const completeQualifier = () => {
  cy.get('[data-cy="core-set-qualifiers-link"]').click();
  cy.get('[data-cy="complete-core-set-questions-button"]')
    .should("be.visible")
    .click();
  cy.get(".chakra-modal__content footer button").contains("Yes").click();
};

// Complete all measures excluding Core Set Qualifier
const completeMeasure = (measureName: string) => {
  cy.goToMeasure(measureName);
  cy.get('[data-cy="Complete Measure"]').should("be.visible").click();
  cy.get(".chakra-modal__content footer button").contains("Yes").click();
};

const qualifierTestSetup = (abbrList: string, statusString: string) => {
  // complete all measures
  for (const abbr of measureAbbrList[abbrList]) {
    completeMeasure(abbr);
  }

  // complete qualifier
  cy.get('[data-cy="Submit Core Set"]').should("be.disabled");
  completeQualifier();

  // submit core set
  cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
  cy.get('[data-cy="SubmitCoreSetButtonWrapper"]').should(
    "contain.text",
    "Submitted"
  );

  // confirm core set submitted
  cy.visit("/");
  let numComplete = 0;
  switch (abbrList) {
    case "ADULT":
      numComplete = measureAbbrList[abbrList].length + 1;
      break;
    case "CHILD":
      numComplete = measureAbbrList[abbrList].length + 3;
      break;
    default:
      numComplete = measureAbbrList[abbrList].length;
  }
  cy.get(`[data-cy="Status-${statusString}"]`).should(
    "contain.text",
    `submitted${numComplete} of ${numComplete} complete`
  );
};

const measureAbbrList = {
  ADULT: [
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
  ],
  CHILD: [
    "ADD-CH",
    "AMB-CH",
    "AMR-CH",
    "APM-CH",
    "APP-CH",
    "AUD-CH",
    "CCP-CH",
    "CCW-CH",
    "CDF-CH",
    "CHL-CH",
    "CIS-CH",
    "CPC-CH",
    "DEV-CH",
    "FUH-CH",
    "IMA-CH",
    // "LBW-CH",  // complete on creation
    // "LRCD-CH",  // complete on creation
    // "PDENT-CH",  // complete on creation
    "PPC-CH",
    "SFM-CH",
    "W30-CH",
    "WCC-CH",
    "WCV-CH",
  ],
  HEALTH_HOME: [
    "AIF-HH",
    "AMB-HH",
    "CBP-HH",
    "CDF-HH",
    "FUA-HH",
    "FUH-HH",
    "IET-HH",
    "IU-HH",
    "OUD-HH",
    "PCR-HH",
    "PQI92-HH",
  ],
};
