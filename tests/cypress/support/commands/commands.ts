import "cypress-file-upload";
import "cypress-wait-until";
import "cypress-file-upload";
// allow for Cypress Snapshot command
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

before(() => {
  cy.visit("/", { timeout: 60000 * 7 });
});

addMatchImageSnapshotCommand({
  failureThreshold: 0.01, // threshold for entire image -> 0.01 = 1%
  failureThresholdType: "percent", // percent of image or number of pixels
  // customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  // capture: "viewport", // capture viewport in screenshot
});

const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

// the default stateuser3 is used to login but can also be changed
// by passing in a user (not including the @test.com) ex. cy.login('bouser')
Cypress.Commands.add(
  "login",
  (
    user = "stateuser3" // pragma: allowlist secret
  ) => {
    const users = {
      stateuser4: Cypress.env("TEST_USER_4"),
      stateuser3: Cypress.env("TEST_USER_3"),
      stateuser2: Cypress.env("TEST_USER_2"),
      stateuser1: Cypress.env("TEST_USER_1"),
    };
    cy.visit("/");
    cy.xpath(emailForCognito).type(`${users[user]}`);
    cy.xpath(passwordForCognito).type(Cypress.env("TEST_PASSWORD_1"));
    cy.get('[data-cy="login-with-cognito-button"]').click();
  }
);

// the default stateuserDC is used to login but can also be changed
Cypress.Commands.add(
  "loginHealthHome",
  (
    user = "stateuser4" // pragma: allowlist secret
  ) => {
    const users = {
      stateuser4: Cypress.env("TEST_USER_4"),
      stateuser3: Cypress.env("TEST_USER_3"),
      stateuser2: Cypress.env("TEST_USER_2"),
      stateuser1: Cypress.env("TEST_USER_1"),
    };
    cy.visit("/");
    cy.xpath(emailForCognito).type(`${users[user]}`);
    cy.xpath(passwordForCognito).type(Cypress.env("TEST_PASSWORD_1"));
    cy.get('[data-cy="login-with-cognito-button"]').click();
  }
);

// Visit Adult Core Set Measures
Cypress.Commands.add("goToAdultMeasures", () => {
  cy.get('[data-cy="ACS"]').click();
});

// Visit Child Core Set Measures
Cypress.Commands.add("goToChildCoreSetMeasures", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy="CCS"]').length > 0) {
      cy.get('[data-cy="CCS"]').click();
    }
  });
});

// Visit Health Home Core Set Measures
Cypress.Commands.add("goToHealthHomeSetMeasures", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy^="HHCS"]').length > 0) {
      cy.get('[data-cy^="HHCS"]').first().click();
    }
  });
});

// Visit Measures based on abbr
Cypress.Commands.add("goToMeasure", (measure) => {
  cy.get(`[data-cy="${measure}"]`, { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.get(`[data-cy="Clear Data"]`, { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.get(`[data-cy="${measure}"]`, { timeout: 10000 })
    .should("be.visible")
    .click();
});

// Correct sections visible when user is reporting data on measure
Cypress.Commands.add("displaysSectionsWhenUserIsReporting", () => {
  cy.get('[data-cy="DidReport0"]').click();

  // these sections should not exist when a user selects they are reporting
  cy.get('[data-cy="Why are you not reporting on this measure?"]').should(
    "not.exist"
  );

  // these sections should be visible when a user selects they are reporting
  cy.get('[data-cy="Status of Data Reported"]').should("be.visible");
  cy.get('[data-cy="Measurement Specification"]').should("be.visible");
  cy.get('[data-cy="Data Source"]').should("be.visible");
  cy.get('[data-cy="Date Range"]').should("be.visible");
  cy.get('[data-cy="Definition of Population Included in the Measure"]').should(
    "be.visible"
  );
  cy.get('[data-cy="Combined Rate(s) from Multiple Reporting Units"]').should(
    "be.visible"
  );
  cy.get(
    '[data-cy="Additional Notes/Comments on the measure (optional)"]'
  ).should("be.visible");
});

// Correct sections visible when user is not reporting data on measure
Cypress.Commands.add("displaysSectionsWhenUserNotReporting", () => {
  cy.wait(1000);
  cy.get('[data-cy="DidReport1"]').click();

  // these sections should not exist when a user selects they are not reporting
  cy.get('[data-cy="Status of Data Reported"]').should("not.exist");
  cy.get('[data-cy="Measurement Specification"]').should("not.exist");
  cy.get('[data-cy="Data Source"]').should("not.exist");
  cy.get('[data-cy="Date Range"]').should("not.exist");
  cy.get('[data-cy="Definition of Population Included in the Measure"]').should(
    "not.exist"
  );
  cy.get('[data-cy="Combined Rate(s) from Multiple Reporting Units"]').should(
    "not.exist"
  );

  // these sections should be visible when a user selects they are not reporting
  cy.get('[data-cy="Why are you not reporting on this measure?"]').should(
    "be.visible"
  );
  cy.get(
    '[data-cy="Additional Notes/Comments on the measure (optional)"]'
  ).should("be.visible");
});

// helper recursive function to remove added core sets
const removeCoreSetElements = (kebab: string, coreSetAction: string) => {
  cy.get(kebab).first().click();
  cy.get('[data-cy="Delete"]').first().click({ force: true });
  cy.get('[data-cy="delete-table-item-input"]').type("delete{enter}");
  cy.wait(1000);
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find(kebab).length > 0) {
      removeCoreSetElements(kebab, coreSetAction);
    }
  });
};

// removes child core set from main page
Cypress.Commands.add("deleteChildCoreSets", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy="child-kebab-menu"]').length > 0) {
      removeCoreSetElements(
        '[data-cy="child-kebab-menu"]',
        '[data-cy^="Core Set Actions-DC2021C"]'
      );
    }
  });
});

// removes health home core set from main page
Cypress.Commands.add("deleteHealthHomeSets", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy="health home-kebab-menu"]').length > 0) {
      removeCoreSetElements(
        '[data-cy="health home-kebab-menu"]',
        '[data-cy^="Core Set Actions-DC2021HHCS"]'
      );
    }
  });
});

// Define at the top of the spec file or just import it
function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);
}

// axe api documentation: https://www.deque.com/axe/core-documentation/api-documentation/
Cypress.Commands.add("checkA11yOfPage", () => {
  cy.wait(3000);
  cy.injectAxe();
  cy.checkA11y(
    null,
    {
      // @ts-ignore
      values: ["wcag2a", "wcag2aa"],
      includedImpacts: ["serious", "critical"], // options: "minor", "moderate", "serious", "critical"
    },
    terminalLog,
    // (err) => {
    //   console.log("Accessibility violations:");
    //   console.log({ err });
    // },
    false // true = does not fail tests for ally violations
  );
});

// if user doesn't fill description box, show error
Cypress.Commands.add("showErrorIfNotReportingAndNotWhy", () => {
  cy.get('[data-cy="DidReport1"]').click();
  cy.get('[data-cy="Validate Measure"]').click();
  cy.get('[data-cy="Why Are You Not Reporting On This Measure Error"]').should(
    "have.text",
    "Why Are You Not Reporting On This Measure Error"
  );
});

Cypress.Commands.add("showErrorIfReportingAndNoNdrSet", () => {
  cy.get('[data-cy="DidReport0"]').click();
  cy.get('[data-cy="Validate Measure"]').click();
  cy.get(
    '[data-cy="Performance Measure/Other Performance Measure Error"]'
  ).should("be.visible");
});

Cypress.Commands.add("showErrorIfCombinedRatesAndNoAdditionalSelection", () => {
  cy.get('[data-cy="DidReport0"]').click();
  cy.get('[data-cy="MeasurementSpecification0"]').click();
  cy.get('[data-cy="CombinedRates0"]').click();
  cy.get('[data-cy="Validate Measure"]').click();
  cy.get(
    '[data-cy="You must select at least one option for Combined Rate(s) Details if Yes is selected."]'
  ).should(
    "have.text",
    "You must select at least one option for Combined Rate(s) Details if Yes is selected."
  );
});

Cypress.Commands.add("addCombinedChildCoreset", () => {
  cy.wait(3000);
  cy.get('[data-cy="Add Child Core Set"]').click();
  cy.get("#ChildCoreSet-ReportType-combined").click({ force: true });
  cy.get('[data-cy="Create"]').click(); //add combined child core set
});

/** Validate measure needs a wait for the page reload before components are interactable */
Cypress.Commands.add("clickValidateMeasure", (timeout = 500) => {
  cy.get('[data-cy="Validate Measure"]').click();
  cy.wait(timeout);
});

Cypress.Commands.add("enterValidDateRange", () => {
  cy.get('[data-cy="DateRange.startDate-month"]').type("1");
  cy.get('[data-cy="DateRange.startDate-year"]').type("2021");
  cy.get('[data-cy="DateRange.endDate-month"]').type("12");
  cy.get('[data-cy="DateRange.endDate-year"]').type("2021");
});

const _description = `New Measure ${Date.now()}`;
const _detailedDescription =
  "Don't hurry. Take your time and enjoy. Fluff it up a little and hypnotize it. The more we do this - the more it will do good things to our heart. There are no mistakes. You can fix anything that happens.";

/** Add a new State Specific measure.
 *
 * Optionally define description and detailedDescription.
 * */
Cypress.Commands.add(
  "addStateSpecificMeasure",
  (description = _description, detailedDescription = _detailedDescription) => {
    cy.get('[data-cy="add-ssm-button"]').click();
    cy.get('[data-cy="add-ssm.0.description"]').type(description);
    cy.get('[data-cy="add-ssm.0.detailedDescription"]').type(
      detailedDescription
    );
    cy.get('[data-cy="Create"]').click();

    // Confirm measure exists and values set correctly
    cy.contains(description).click();
    cy.contains(detailedDescription);
  }
);

/** Delete a State Specific measure.
 *
 * Optionally define description. If no description provided, delete the most recently created SSHH.
 */
Cypress.Commands.add("deleteStateSpecificMeasure", (description?) => {
  if (description) {
    cy.contains("tr", description).within(() => {
      cy.get('[data-cy="undefined-kebab-menu"]').click();
    });
  } else {
    cy.get('tr [data-cy="undefined-kebab-menu"]').last().click();
  }
  cy.get('[data-cy="Delete"]').last().click();
  cy.get('[data-cy="delete-table-item-input"]').type("DELETE{enter}");
});

// Correct sections visible when user is reporting data on measure
Cypress.Commands.add("SSHHdisplaysCorrectSections", () => {
  cy.get('[data-cy="Status of Data Reported"]').should("be.visible");
  cy.get('[data-cy="Data Source"]').should("be.visible");
  cy.get('[data-cy="Date Range"]').should("be.visible");
  cy.get('[data-cy="Definition of Population Included in the Measure"]').should(
    "be.visible"
  );
  cy.get('[data-cy="Performance Measure"]').should("be.visible");
  cy.get(
    '[data-cy="Additional Notes/Comments on the measure (optional)"]'
  ).should("be.visible");
});

export const measureAbbrList2021 = {
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
    "NCIDDS-AD", // complete on creation
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
    "LBW-CH", // complete on creation
    "LRCD-CH", // complete on creation
    "PDENT-CH", // complete on creation
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
