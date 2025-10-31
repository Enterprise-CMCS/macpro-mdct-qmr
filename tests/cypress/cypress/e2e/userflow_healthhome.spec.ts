import { measureAbbrList, testingYear } from "../../support/constants";

const filePath = "fixtures/files/";

// workflow to test: user goes through basic expected functionality for healthhome core set
describe(`healthhome core set workflow test`, () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
  });

  it("create hh core set", () => {
    cy.deleteHealthHomeSets();
    // adds first available HH core set
    cy.get('[data-cy="add-hhbutton"]').click(); // clicking on adding hh core set measures
    cy.get('[data-cy="HealthHomeCoreSet-SPA"]').select(1); // select first available SPA
    cy.get('[data-cy="Create"]').click(); //clicking create
  });
});

// fill out a measure for 2026
describe("Measure: CBP-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("CBP-HH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting("HHCS", testingYear);
    cy.displaysSectionsWhenUserIsReporting("HHCS", testingYear);
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );
});

describe("Add custom measure", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
  });
  it("add state specific measure", () => {
    cy.get('[data-cy="add-ssm-button"]').click();
    cy.get('[data-cy="add-ssm.0.description"]').type("test measure name");
    cy.get('[data-cy="add-ssm.0.detailedDescription"]').type(
      "test measure description"
    );
    cy.get('[data-cy="Create"]').click();
    cy.get('[data-cy="New State Specific Measures created"]').should(
      "contain.text",
      "New State Specific Measures created"
    );
  });
});

// completion number is dynamic, we need to refactor to handle different amounts of state specific measures
describe.skip("submit coreset", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.get('[data-cy="health home-kebab-menu"]').click();
    cy.get('[aria-label="Reset All Measures for HHCS_15-014"]').click();
    cy.wait(1000);
    // confirm reset
    cy.get(`[data-cy="Status-CT${testingYear}HHCS_15-014"]`).should(
      "contain.text",
      "not started0 of 11 complete"
    );
  });
  it("submit and confirm submission", () => {
    // complete core set
    cy.get('[data-cy="health home-kebab-menu"]').click();
    cy.get('[aria-label="Complete All Measures for HHCS_15-014"]').click();
    cy.wait(4000);
    cy.get(`[data-cy="Status-CT${testingYear}HHCS_15-014"]`).should(
      "contain.text",
      "complete11 of 11 complete"
    );

    // submit core set
    cy.goToHealthHomeSetMeasures();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
    cy.get('[data-cy="SubmitCoreSetButtonWrapper"]').should(
      "contain.text",
      "Submitted"
    );

    // confirm submission
    cy.visit("/");
    cy.get(`[data-cy="Status-CT${testingYear}HHCS_15-014"]`).should(
      "contain.text",
      "submitted11 of 11 complete"
    );
  });
});

describe("Export All Measures", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        win.location.href = url;
      });
    });
  });

  it("Test Health Home Core Set", () => {
    cy.get('[data-cy="add-hhbutton"]').then(($button) => {
      if (!$button.prop("disabled")) {
        cy.wrap($button).click(); // Perform the action only if the button is enabled
        cy.get('[data-cy="HealthHomeCoreSet-SPA"]').select(1); // select first available SPA
        cy.get('[data-cy="Create"]').click(); //clicking create
      }
    });

    cy.contains("tr", "Health Home").within(() => {
      cy.get('[data-cy="health home-kebab-menu"]').click();
      cy.get('[aria-label="Export for HHCS_15-014"]').click();
    });

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList.HEALTH_HOME) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
  });
});

//some features have been removed from 2026 but we should still test for 2023
describe("Test uploading a file", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear("2023");
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("AMB-HH");
  });

  // upload a file
  it("Can upload a file", () => {
    cy.get('[data-testid="upload-stack"]').scrollIntoView();
    cy.get('[data-testid="upload-component"]')
      .invoke("show")
      .selectFile(`${filePath}adobe.pdf`);
    cy.get('[data-cy="file-upload-adobe.pdf"]').should("be.visible");
  });
});
