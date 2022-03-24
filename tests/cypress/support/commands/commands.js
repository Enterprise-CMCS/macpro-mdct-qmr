before(() => {
  cy.visit("/", { timeout: 60000 * 5 });
});
import "cypress-file-upload";

const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

// the default stateuser1 is used to login but can also be changed
// by passing in a user (not including the @test.com) ex. cy.login('bouser')
Cypress.Commands.add(
  "login",
  (
    user = "stateuser1", // pragma: allowlist secret
    password = "p@55W0rd!" // pragma: allowlist secret
  ) => {
    cy.xpath(emailForCognito).type(`${user}@test.com`);
    cy.xpath(passwordForCognito).type(password);
    cy.get('[data-cy="login-with-cognito-button"]').click();
  }
);

// Visit Adult Core Set Measures
Cypress.Commands.add("goToAdultMeasures", () => {
  cy.get('[data-cy="ACS"]').click();
});

Cypress.Commands.add("goToChildCoreSetMeasures", () => {
  cy.get("tbody").then(($tbody) => {
    if ($tbody.find('[data-cy="CCS"]').length > 0) {
      cy.get('[data-cy="CCS"]').click({ force: true });
    } else if ($tbody.find('[data-cy="CCSM"]').length > 0) {
      cy.deleteChildCoreSets();
      cy.wait(5000);
      cy.addCombinedChildCoreset();
      cy.get('[data-cy="CCS"]').click({ force: true });
    } else {
      cy.addCombinedChildCoreset();
      cy.wait(5000);
      cy.get('[data-cy="CCS"]').click({ force: true });
    }
    cy.reload();
    cy.wait(2000);
  });
});

// Visit Measures based on abbr
Cypress.Commands.add("goToMeasure", (measure) => {
  cy.wait(2000);
  cy.get(`[data-cy="${measure}"]`).click();
  cy.wait(2000);
  cy.get(`[data-cy="Clear Data"]`).click();
  cy.wait(2000);
  cy.reload();
  cy.wait(5000);
  cy.get(`[data-cy="${measure}"]`).click();
  cy.wait(5000);
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
      cy.wait(1000);
      cy.get('[data-cy="delete-table-item-input"]').type("delete{enter}");
      cy.wait(2000);
    } else {
      cy.wait(2000);
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
  cy.get("tbody").then(($tbody) => {
    if ($tbody.find('[data-cy="CCSM"]').length > 0) {
      cy.deleteChildCoreSets();
      cy.wait(2000);
    }

    if ($tbody.find('[data-cy="Add Child Core Set"]').length > 0) {
      cy.get('[data-cy="Add Child Core Set"]').click();
      cy.get("#ChildCoreSet-ReportType-combined").click({ force: true });
      cy.get('[data-cy="Create"]').click({ force: true });
    }
  });
});

/** Validate measure needs a wait for the page reload before components are interactable */
Cypress.Commands.add("clickValidateMeasure", (timeout = 500) => {
  cy.get('[data-cy="Validate Measure"]').click();
  cy.wait(timeout);
});
