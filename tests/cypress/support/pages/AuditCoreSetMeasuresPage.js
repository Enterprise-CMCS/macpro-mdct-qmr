// element is xpath, please use cy.xapth() instead of cy.get();
const FUAADLink = "//p[contains(text(),'FUA-AD')]";

export class AuditCoreSetMeasuresPage {
  verifyURLContainsACS() {
    cy.url().should("include", "ACS");
  }

  clickFUAADLink() {
    cy.xpath(FUAADLink).click();
  }
}
export default AuditCoreSetMeasuresPage;
