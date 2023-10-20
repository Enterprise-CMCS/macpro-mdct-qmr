import { measureAbbrList2023, testingYear } from "../../../support/constants";

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

  it("Test Adult Core Set", () => {
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Export"]').first().click();

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2023.ADULT) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
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
      // currently, Child coreset uses "Export All" – this may change
      cy.contains("Export").click();
    });

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2023.CHILD) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
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
      // currently, Health Home coreset uses "Export All" – this may change
      cy.contains("Export").click();
    });

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2023.HEALTH_HOME) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
  });
});
