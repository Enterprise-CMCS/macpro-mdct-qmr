import { measureAbbrList2021 } from "../../../support/commands/commands";

describe("Export All Measures", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        win.location.href = url;
      });
    });
  });

  it("Test Adult Core Set", () => {
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Export"]').click();

    // Check all measures present
    for (const measureAbbr of measureAbbrList2021.ADULT) {
      cy.get(`#${measureAbbr}`).should("be.visible");
    }
  });

  // it("Test Child Core Set", () => {
  //   cy.get('[data-cy="child-kebab-menu"]').first().click();
  //   cy.get('[data-cy="Export"]').click();

  //   // Check all measures present
  //   for (const measureAbbr of measureAbbrList2021.CHILD) {
  //     cy.get(`#${measureAbbr}`).should("be.visible")
  //   }
  // })

  // it("Test Health Home Core Set", () => {
  //   cy.get('[data-cy="adult-kebab-menu"]').click();
  //   cy.get('[data-cy="Export"]').click();

  //   // Check all measures present
  //   for (const measureAbbr of measureAbbrList2021.HEALTH_HOME) {
  //     cy.get(`#${measureAbbr}`).should("be.visible")
  //   }
  // })
});
