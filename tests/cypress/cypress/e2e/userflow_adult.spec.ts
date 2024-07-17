import { measureAbbrList2024, testingYear } from "../../support/constants";
const filePath = "fixtures/files/";

// workflow to test: user goes through basic expected functionality for adult core set

// fill out a measure for 2024
const abbr = "ACSC";

describe(`Adult Core Sets should be able to be created for ${testingYear}`, () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.wait(500);
  });

  // create an adult core set
  it("Creates or enters combined adult core-set", () => {
    cy.get('[data-cy="tableBody"]').then(($tbody) => {
      //check to see if adult coreset has been added to the table
      if ($tbody.find('[data-cy^="' + abbr + '"]').length === 0) {
        cy.get('[data-cy="add-adultbutton"]').then(($btn) => {
          //if the add adult coreset button is not disable
          if (!$btn.is(":disabled")) {
            //click the add adult core set button
            cy.get('[data-cy="add-adultbutton"]').click(); // clicking on adding adult core set measures
            cy.wait(500);
            cy.get("#AdultCoreSet-ReportType-combined").click(); //selecting combined core set
            cy.get('[data-cy="Create"]').click(); //clicking create
            cy.wait(500);
          }
        });
      }
    });
    cy.get('[data-cy="' + abbr + '"]').should(
      "contain.text",
      "Adult Core Set Measures: Separate CHIP"
    );
  });
});

describe("Measure: CDF-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CDF-AD");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting(abbr);
    cy.displaysSectionsWhenUserIsReporting(abbr);
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
    cy.get('[data-cy="Status-AL2024' + abbr + '"]').should(
      "contain.text",
      "in progress1 of 33 complete"
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
    cy.get('[data-cy="Status-AL2024' + abbr + '"]').should(
      "contain.text",
      "complete33 of 33 complete"
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
    cy.get('[data-cy="Status-AL2024' + abbr + '"]').should(
      "contain.text",
      "submitted33 of 33 complete"
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

  it("Test Adult Core Set", () => {
    cy.get('[aria-label="Action Menu for ' + abbr + '"]').click();
    cy.get('[aria-label="Export for ' + abbr + '"]').click();

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2024.ADULT) {
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
    cy.goToAdultMeasures();
    cy.goToMeasure("CDF-AD");
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
