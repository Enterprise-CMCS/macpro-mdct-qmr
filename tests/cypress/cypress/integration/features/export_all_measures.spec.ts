import { measureAbbrList2021 } from "../../../support/commands/commands";

describe.skip("Export All Measures", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear("2021");
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        win.location.href = url;
      });
    });
  });

  it("Test Adult Core Set", () => {
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Export"]').click();

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2021.ADULT) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
  });

  it("Test Child Core Set", () => {
    cy.contains("tr", "Child").within(() => {
      cy.get('[data-cy="child-kebab-menu"]').click();
      // currently, Child coreset uses "Export All" – this may change
      cy.contains("Export").click();
    });

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2021.CHILD) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
  });

  it("Test Health Home Core Set", () => {
    cy.contains("tr", "Health Home").within(() => {
      cy.get('[data-cy="health home-kebab-menu"]').click();
      // currently, Health Home coreset uses "Export All" – this may change
      cy.contains("Export").click();
    });

    // Check all measures + CSQ present
    for (const measureAbbr of measureAbbrList2021.HEALTH_HOME) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
    cy.get("#CSQ").should("be.visible");
  });
});
