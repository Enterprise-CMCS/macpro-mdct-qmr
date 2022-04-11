describe("FAQ Page State View", () => {
  beforeEach(() => {
    cy.login();
  });
  it("Verify FAQ Page Exists", () => {
    // lets find a better way to get to the faq page
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.css-4ma18r:nth-child(1) div.css-1gy6ge8 div.chakra-container.css-1vsk1kk div.css-1ibkps6 > a:nth-child(4)"
    ).click();
    cy.get(".chakra-heading").should("have.text", "FAQ");
  });
});
