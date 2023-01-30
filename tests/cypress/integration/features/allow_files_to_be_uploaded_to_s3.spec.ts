const browseBtn = "//u[contains(text(),'browse')]";

describe.skip("File upload Functionality", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.goToAdultMeasures();
    cy.goToMeasure("CDF-AD");
  });

  it("Can upload a file", () => {
    cy.xpath(browseBtn).attachFile("/files/adobe.pdf", {
      subjectType: "drag-n-drop",
    });
  });

  it("Can upload multiple files", () => {
    cy.xpath(browseBtn).attachFile("/files/adobe.pdf", {
      subjectType: "drag-n-drop",
    });
    cy.wait(3000);
    cy.xpath(browseBtn).attachFile("/files/test3.docx", {
      subjectType: "drag-n-drop",
    });
    cy.wait(3000);
    cy.xpath(browseBtn).attachFile("/files/picture.jpg", {
      subjectType: "drag-n-drop",
    });
  });
});
