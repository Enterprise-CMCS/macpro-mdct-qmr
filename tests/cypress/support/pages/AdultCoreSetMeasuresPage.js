// measurements
const nciddsAD = "//p[contains(text(),'NCIDDS-AD')]";
const pdentCH = "(//p[@class='chakra-text css-hispwy'])[5]";
const lbwCH = "(//p[@class='chakra-text css-hispwy'])[7]";
const lrcdCH = "(//p[@class='chakra-text css-hispwy'])[9]";
const fuaAD = "//p[contains(text(),'FUA-AD')]";
//oy2-15212 QMR MDCT Medicaid Logo
const qualityMeasureReportingLogo = "//img[@alt='QMR Logo']";
const mdctLogo = "//img[@alt='Mdct logo']";
const medicaidLogoBottom = "//img[@alt='Medicaid.gov logo']";


export class AdultCoreSetMeasuresPage {
  clickNCIDDSadLink() {
    cy.xpath(nciddsAD).should("be.visible");
    cy.xpath(nciddsAD).click({ force: true });
  }

  verifyQMRMDCTMedicaidLogoAtAdultCoreSetMeasurePage(){
    cy.xpath(qualityMeasureReportingLogo).should("be.visible");
    cy.xpath(mdctLogo).should("be.visible");
    cy.xpath(medicaidLogoBottom).should("be.visible");
  }

  clickFUAadLink() {
    // cy.xpath(fuaAD).should("be.visible");
    // cy.xpath(fuaAD).click({force:true});

    // "//p[text()='FUA-AD']"
    cy.xpath("//p[text()='FUA-AD']").scrollIntoView();
    cy.xpath("//p[text()='FUA-AD']").should("be.visible");
    cy.xpath("//p[text()='FUA-AD']").click({ force: true });
  }

  clickPDENTchLink() {
    cy.xpath(pdentCH).should("be.visible");
    cy.xpath(pdentCH).click({ force: true });
  }

  clickLBWchLink() {
    cy.xpath(lbwCH).should("be.visible");
    cy.xpath(lbwCH).click({ force: true });
  }

  clickLRCDchLink() {
    cy.xpath(lrcdCH).should("be.visible");
    cy.xpath(lrcdCH).click({ force: true });
  }

  verifyURLContainsACS() {
    cy.url().should("include", "ACS");
  }
}
export default AdultCoreSetMeasuresPage;
