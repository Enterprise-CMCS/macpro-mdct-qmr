describe("Health Home Sets Should be able to be deleted and created", () => {
  beforeEach(() => {
    cy.loginHealthHome();
  });

  // recursivley makes as many HHCS as possible
  const addAllHHCoreSet = () => {
    addSingleHHCoreSet();
    cy.wait(1000);
    cy.get('[data-cy="add-hhbutton"]').then(($button) => {
      if (!$button.is(":disabled")) {
        addAllHHCoreSet();
      } else {
        cy.get('[data-cy="add-hhbutton"]').should("be.disabled");
      }
    });
  };

  // adds first available HH core set
  const addSingleHHCoreSet = () => {
    cy.get('[data-cy="add-hhbutton"]').click(); // clicking on adding child core set measures
    cy.get('[data-cy="HealthHomeCoreSet-SPA"').select(1); // select first available SPA
    cy.get('[data-cy="Create"]').click(); //clicking create
  };

  // NOTE: should recursively loop through all possible SPA creations
  it("Creates Multiple SPA sets", () => {
    cy.deleteHealthHomeSets();
    addAllHHCoreSet();
  });

  it("Creates Sinlge SPA set", () => {
    cy.deleteHealthHomeSets();
    addSingleHHCoreSet();
  });
});
