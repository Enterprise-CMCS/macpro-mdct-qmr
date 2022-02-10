before(() => {
  cy.visit("/", { timeout: 60000 * 5 });
});
import "cypress-file-upload";

Cypress.Commands.add("deleteChildCoreSets", () => {
  cy.get("tbody").then(($tbody) => {
    if ($tbody.find('[data-cy="child-kebab-menu"]').length > 0) {
      cy.get(
        ':nth-child(2) > :nth-child(5) > .css-xi606m > [data-cy="child-kebab-menu"]'
      ).click({ force: true });
      cy.xpath(
        "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/table[1]/tbody[1]/tr[2]/td[5]/div[1]/div[1]/div[1]/button[2]"
      ).click({ force: true });
      cy.wait(1000);
      cy.get('[data-cy="delete-table-item-input"]').type("delete{enter}");
    } else {
      console.log("do something else");
    }
  });
});
