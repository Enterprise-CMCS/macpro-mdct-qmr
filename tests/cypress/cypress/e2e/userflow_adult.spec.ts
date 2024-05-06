import { measureAbbrList2024, testingYear } from "../../support/constants";
const filePath = "fixtures/files/";

// workflow to test: user goes through basic expected functionality for adult core set

// fill out a measure for 2024
describe(`Adult Core Sets should be able to be created for ${testingYear}`, () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
  });

  // create an adult core set
  it("Creates or enters combined adult core-set", () => {
    cy.deleteAdultCoreSets();
    const isDisabled = cy
      .get('[data-cy="add-adultbutton"]')
      .should("be.disabled");
    if (!isDisabled) {
      cy.get('[data-cy="add-adultbutton"]').click(); // clicking on adding adult core set measures
      cy.get("#AdultCoreSet-ReportType-combined").click(); //selecting combined core set
      cy.get('[data-cy="Create"]').click(); //clicking create
      cy.wait(500);
      cy.get('[data-cy="Cancel"]').click(); //clicking create
      cy.wait(500);
      cy.get('[data-cy="add-adultbutton"]').should("be.disabled");
    }
    cy.get('[data-cy="ACS"]').should("contain.text", "Adult Core Set Measures");
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

describe("submit coreset", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[aria-label="Reset All Measures for ACS"]').click({ force: true });
    cy.wait(1000);
    // confirm reset
    cy.get('[data-cy="Status-WY2024ACS"]').should(
      "contain.text",
      "in progress3 of 33 complete"
    );
  });

  it("submit and confirm submission", () => {
    // complete core set
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[aria-label="Complete All Measures for ACS"]').click();
    cy.wait(4000);
    cy.get('[data-cy="Status-WY2024ACS"]').should(
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
    cy.get('[data-cy="Status-WY2024ACS"]').should(
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
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[aria-label="Export for ACS"]').click();

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2024.ADULT) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
  });
});
