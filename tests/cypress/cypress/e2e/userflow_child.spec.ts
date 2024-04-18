import { measureAbbrList2024, testingYear } from "../../support/constants";
const filePath = "fixtures/files/";

// workflow to test: user goes through basic expected functionality for child core set
describe(`Child Core Sets Should be able to be deleted and created for ${testingYear}`, () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
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
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );

  // upload a file
  it("Can upload a file", () => {
    cy.get('[data-testid="upload-stack"]').scrollIntoView();
    cy.get('[data-testid="upload-component"]')
      .invoke("show")
      .selectFile(`${filePath}adobe.pdf`);
    cy.get('[data-cy="file-upload-adobe.pdf"]').should("be.visible");
  });
});

describe.only("submit coreset", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.get('[data-cy="child-kebab-menu"]').click();
    cy.get('[aria-label="Reset All Measures for CCS"]').click();
    cy.wait(1000);
    // confirm reset
    cy.get('[data-cy="Status-WY2024CCS"]').should(
      "contain.text",
      "in progress3 of 27 complete"
    );
  });
  it("submit and confirm submission", () => {
    // complete core set
    cy.get('[data-cy="child-kebab-menu"]').click();
    cy.get('[aria-label="Complete All Measures for CCS"]').click();
    cy.wait(4000);
    cy.get('[data-cy="Status-WY2024CCS"]').should(
      "contain.text",
      "complete27 of 27 complete"
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
    cy.get('[data-cy="Status-WY2024CCS"]').should(
      "contain.text",
      "submitted27 of 27 complete"
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
    cy.get('[data-cy="add-childbutton"]').then(($button) => {
      if (!$button.prop("disabled")) {
        cy.wrap($button).click(); // Perform the action only if the button is enabled
        cy.get("#ChildCoreSet-ReportType-separate").click(); //selecting combined core set
        cy.get('[data-cy="Create"]').click(); //clicking create
      }
    });

    cy.contains("tr", "Child").within(() => {
      cy.get('[data-cy="child-kebab-menu"]').click();
      cy.get('[aria-label="Export for CCS"]').click();
    });

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2024.CHILD) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
  });
});
