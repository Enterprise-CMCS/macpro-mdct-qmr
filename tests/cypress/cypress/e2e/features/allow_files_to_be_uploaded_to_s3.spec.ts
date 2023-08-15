import { testingYear } from "../../../support/constants";

const filePath = "fixtures/files/";

describe("File upload Functionality", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CDF-AD");
    cy.get('[data-testid="upload-stack"]').scrollIntoView();
  });

  it("Can upload a file", () => {
    cy.get('[data-testid="upload-component"]')
      .invoke("show")
      .selectFile(`${filePath}adobe.pdf`);
    cy.get('[data-cy="file-upload-adobe.pdf"]').should("be.visible");
  });

  it("Can upload multiple files", () => {
    cy.get('[data-testid="upload-component"]')
      .invoke("show")
      .selectFile(`${filePath}adobe.pdf`);

    cy.wait(1200);
    cy.get('[data-testid="upload-component"]')
      .invoke("show")
      .selectFile(`${filePath}test3.docx`);

    cy.wait(1200);
    cy.get('[data-testid="upload-component"]')
      .invoke("show")
      .selectFile(`${filePath}picture.jpg`);

    cy.wait(1200);
    cy.get('[data-cy="file-upload-adobe.pdf"]').should("be.visible");
    cy.get('[data-cy="file-upload-test3.docx"]').should("be.visible");
    cy.get('[data-cy="file-upload-picture.jpg"]').should("be.visible");
  });
});
