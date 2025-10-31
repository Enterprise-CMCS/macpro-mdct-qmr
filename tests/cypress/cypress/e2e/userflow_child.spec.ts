import { measureAbbrList, testingYear } from "../../support/constants";

const filePath = "fixtures/files/";

// workflow to test: user goes through basic expected functionality for child core set

const abbr = "CCSC";

//for reporting year 2024 & onward, child coresets are loaded at start. to test the add / delete button, we will use 2023
describe(`Child Core Sets Should be able to be deleted and created for 2023`, () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2023");
  });
  // create a child core set
  it("Creates separate child core-set", () => {
    cy.deleteChildCoreSets();
    cy.get('[data-cy="add-childbutton"]').click(); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-separate").click(); //selecting combined core set
    cy.get('[data-cy="Create"]').click(); //clicking create
    cy.get('[data-cy="add-childbutton"]').should("be.disabled"); // check button diabled if created
  });

  // delete separate child core-set so we can create a combined core set for the rest of the tests
  it("Creates combined child core-set", () => {
    cy.deleteChildCoreSets();
    cy.get('[data-cy="add-childbutton"]').click(); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-combined").click(); //selecting combined core set
    cy.get('[data-cy="Create"]').click(); //clicking create
    cy.wait(500);
    cy.get('[data-cy="add-childbutton"]').should("be.disabled"); // check button diabled if created
  });
});

// fill out a measure for 2024
describe("Measure: CCW-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CCW-CH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting(abbr, testingYear);
    cy.displaysSectionsWhenUserIsReporting(abbr, testingYear);
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );
});

describe("submit coreset", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.get('[aria-label="Action Menu for ' + abbr + '"]').click();
    cy.get('[aria-label="Reset All Measures for ' + abbr + '"]').click({
      force: true,
      waitForAnimations: false,
    });
    cy.wait(1000);
    // confirm reset
    cy.get(`[data-cy="Status-AL${testingYear}"]`).should(
      "contain.text",
      "in progress2 of 29 complete"
    );
  });
  it("submit and confirm submission", () => {
    // complete core set
    cy.get('[aria-label="Action Menu for ' + abbr + '"]').click();
    cy.get('[aria-label="Complete All Measures for ' + abbr + '"]').click({
      force: true,
      waitForAnimations: false,
    });
    cy.wait(4000);
    cy.get(`[data-cy="Status-AL${testingYear}"]`).should(
      "contain.text",
      "complete29 of 29 complete"
    );

    // submit core set
    cy.goToChildCoreSetMeasures();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
    cy.get('[data-cy="SubmitCoreSetButtonWrapper"]').should(
      "contain.text",
      "Submitted"
    );

    // confirm submission
    cy.visit("/");
    cy.get(`[data-cy="Status-AL${testingYear}"]`).should(
      "contain.text",
      "submitted29 of 29 complete"
    );
  });
});

describe("Export All Measures", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        win.location.href = url;
      });
    });
  });

  it("Test Child Core Set", () => {
    cy.get('[aria-label="Action Menu for ' + abbr + '"]').click();
    cy.get('[aria-label="Export for ' + abbr + '"]').click();

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList.CHILD) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
  });
});

//some features have been removed from 2024 but we should still test for 2023
describe("Test uploading a file", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2023");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CCW-CH");
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
