before(() => {
  cy.visit("/", { timeout: 60000 * 7 });
});

const emailForCognito = "input[name='email']";
const passwordForCognito = "input[name='password']";

const loginUser = (user: string) => {
  cy.session([user], () => {
    const users = {
      stateuser4: Cypress.env("STATE_USER_4"),
      stateuser2: Cypress.env("STATE_USER_2"),
      adminuser: Cypress.env("ADMIN_USER"),
    };
    cy.visit("/");
    cy.get(emailForCognito).type(users[user]);
    cy.get(passwordForCognito).type(Cypress.env("QMR_PASSWORD"), {
      log: false,
    });
    cy.get('[data-cy="login-with-cognito-button"]').click();
    cy.wait(4500);
  });
  cy.visit("/");
};
// the default stateuser2 is used to login but can also be changed
// by passing in a user (not including the @test.com) ex. cy.login('bouser')
Cypress.Commands.add(
  "login",
  (
    user = "stateuser2" // pragma: allowlist secret
  ) => {
    loginUser(user);
  }
);

// the default stateuserDC is used to login but can also be changed
Cypress.Commands.add(
  "loginHealthHome",
  (
    user = "stateuser4" // pragma: allowlist secret
  ) => {
    loginUser(user);
  }
);

// Select the year
Cypress.Commands.add("selectYear", (year) => {
  cy.get('[data-cy="year-select"]').select(year);
});

// Visit Adult Core Set Measures
Cypress.Commands.add("goToAdultMeasures", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy="ACS"]').length > 0) {
      cy.get('[data-cy="ACS"]').click();
    } else if ($tbody.find('[data-cy="ACSC"]').length > 0) {
      cy.get('[data-cy="ACSC"]').click();
    }
  });
});

// Visit Child Core Set Measures
Cypress.Commands.add("goToChildCoreSetMeasures", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy="CCS"]').length > 0) {
      cy.get('[data-cy="CCS"]').click();
    } else if ($tbody.find('[data-cy="CCSC"]').length > 0) {
      cy.get('[data-cy="CCSC"]').click();
    }
  });
});

// Visit Health Home Core Set Measures
Cypress.Commands.add("goToHealthHomeSetMeasures", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy^="HHCS"]').length > 0) {
      cy.get('[data-cy^="HHCS"]').first().click();
    } else {
      // adds first available HH core set if no healthhome was made
      cy.get('[data-cy="add-hhbutton"]').click(); // clicking on adding child core set measures
      cy.get('[data-cy="HealthHomeCoreSet-SPA"]').select(1); // select first available SPA
      cy.get('[data-cy="Create"]').click(); //clicking create
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
Cypress.Commands.add(
  "displaysSectionsWhenUserIsReporting",
  (coreSet: string, year: string) => {
    cy.get('[data-cy="DidReport0"]').click();

    // these sections should not exist when a user selects they are reporting
    cy.get('[data-cy="Why are you not reporting on this measure?"]').should(
      "not.exist"
    );

    // these sections should be visible when a user selects they are reporting
    cy.get('[data-cy="Status of Data Reported"]').should("be.visible");
    cy.get('[data-cy="Measurement Specification"]').should("be.visible");
    cy.get('[data-cy="Data Collection Method"]').should("be.visible");
    cy.get('[data-cy="Date Range"]').should("be.visible");
    cy.get(
      '[data-cy="Definition of Population Included in the Measure"]'
    ).should("be.visible");

    if (coreSet === "HHCS" && Number(year) < 2024) {
      cy.get(
        '[data-cy="Combined Rate(s) from Multiple Reporting Units"]'
      ).should("be.visible");
    }

    cy.get(
      '[data-cy="Additional Notes/Comments on the measure (optional)"]'
    ).should("be.visible");
  }
);

// Correct sections visible when user is not reporting data on measure
Cypress.Commands.add(
  "displaysSectionsWhenUserNotReporting",
  (coreSet: string, year: string) => {
    cy.wait(1000);
    cy.get('[data-cy="DidReport1"]').click();

    // these sections should not exist when a user selects they are not reporting
    cy.get('[data-cy="Status of Data Reported"]').should("not.exist");
    cy.get('[data-cy="Measurement Specification"]').should("not.exist");
    cy.get('[data-cy="Data Collection Method"]').should("not.exist");
    cy.get('[data-cy="Date Range"]').should("not.exist");
    cy.get(
      '[data-cy="Definition of Population Included in the Measure"]'
    ).should("not.exist");

    if (coreSet === "HHCS" && Number(year) < 2024) {
      cy.get(
        '[data-cy="Combined Rate(s) from Multiple Reporting Units"]'
      ).should("not.exist");
    }

    // these sections should be visible when a user selects they are not reporting
    cy.get('[data-cy="Why are you not reporting on this measure?"]').should(
      "be.visible"
    );
    cy.get(
      '[data-cy="Additional Notes/Comments on the measure (optional)"]'
    ).should("be.visible");
  }
);

const clickCoreSetAction = (kebab: string, selector: string) => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find(kebab).length > 0) {
      cy.get(kebab).first().click();
      cy.wait(3000);
      cy.get(selector).click({ force: true });
    }
  });
};

// helper recursive function to remove added core sets
const removeCoreSetElements = (kebab: string, selector: string) => {
  clickCoreSetAction(kebab, selector);
  cy.wait(3000);
  cy.get('[data-cy="delete-table-item-input"]').type("delete{enter}");
};

// removes adult core set from main page
Cypress.Commands.add("deleteAdultCoreSets", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy="adult-kebab-menu"]').length > 0) {
      removeCoreSetElements(
        '[data-cy="adult-kebab-menu"]',
        '[aria-label="Delete for ACS"]'
      );
    }
  });
});

// removes child core set from main page
Cypress.Commands.add("deleteChildCoreSets", () => {
  cy.get('[data-cy="tableBody"]').then(($tbody) => {
    if ($tbody.find('[data-cy="child-kebab-menu"]').length === 1) {
      removeCoreSetElements(
        '[data-cy="child-kebab-menu"]',
        '[aria-label="Delete for CCS"]'
      );
    } else if ($tbody.find('[data-cy="child-kebab-menu"]').length > 1) {
      removeCoreSetElements(
        '[data-cy="child-kebab-menu"]',
        '[aria-label="Delete for CCSC"]'
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
        '[aria-label="Delete for HHCS_24-0024"]'
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
  cy.get('[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]').click();
  cy.get('[data-cy="DateRange.startDate-month"]').type("1");
  cy.get('[data-cy="DateRange.startDate-year"]').type("2024");
  cy.get('[data-cy="DateRange.endDate-month"]').type("12");
  cy.get('[data-cy="DateRange.endDate-year"]').type("2024");
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
    //possible fix, cypress sometimes says the add button is disabled, and that usually happens when 5 ss has been added.
    cy.get('[data-cy="add-ssm-button"]').then(($btn) => {
      //if button turns out to be disable, try deleting a SS before proceeding
      if ($btn.is(":disabled")) {
        cy.get('tr [data-cy="undefined-kebab-menu"]').last().click();
        cy.get('[data-cy="Delete"]').last().click();
        cy.get('[data-cy="delete-table-item-input"]').type("DELETE{enter}");
      }
    });
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
  cy.get('[data-cy="Data Collection Method"]').should("be.visible");
  cy.get('[data-cy="Date Range"]').should("be.visible");
  cy.get('[data-cy="Definition of Population Included in the Measure"]').should(
    "be.visible"
  );
  cy.get('[data-cy="Performance Measure"]').should("be.visible");
  cy.get(
    '[data-cy="Additional Notes/Comments on the measure (optional)"]'
  ).should("be.visible");
});
