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
      stateuser3: Cypress.env("TEST_USER_3"),
      stateuser2: Cypress.env("TEST_USER_2"),
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
  cy.get("tbody").then(($tbody) => {
    if ($tbody.find('[data-cy="CCS"]').length > 0) {
      cy.get('[data-cy="CCS"]').click();
    }
  });
});

// Visit Measures based on abbr
Cypress.Commands.add("goToMeasure", (measure) => {
  cy.get(`[data-cy="${measure}"]`).should("be.visible").click();
  cy.get(`[data-cy="Clear Data"]`).should("be.visible").click();
  cy.get(`[data-cy="${measure}"]`).should("be.visible").click();
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

// removes child core set from main page
Cypress.Commands.add("deleteChildCoreSets", () => {
  cy.get("tbody").then(($tbody) => {
    if ($tbody.find('[data-cy="child-kebab-menu"]').length > 0) {
      cy.get('[data-cy="child-kebab-menu"]').first().click({ force: true });
      cy.get("[data-cy='child-kebab-menu'] + div [data-cy='Delete']")
        .first()
        .click({
          force: true,
        });
      cy.get('[data-cy="delete-table-item-input"]').type("delete{enter}");
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
      includedImpacts: ["minor", "moderate", "serious", "critical"], // options: "minor", "moderate", "serious", "critical"
    },
    terminalLog,
    // (err) => {
    //   console.log("Accessibility violations:");
    //   console.log({ err });
    // },
    true // does not fail tests for ally violations
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
