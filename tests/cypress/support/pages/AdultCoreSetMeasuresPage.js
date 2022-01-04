// measurements
const nciddsAD = "(//p[@class='chakra-text css-hispwy'])[3]";
const pdentCH = "(//p[@class='chakra-text css-hispwy'])[5]";
const lbwCH = "(//p[@class='chakra-text css-hispwy'])[7]";
const lrcdCH = "(//p[@class='chakra-text css-hispwy'])[9]";

export class AdultCoreSetMeasuresPage {
    clickNCIDDSadLink(){
        cy.xpath(nciddsAD).should("be.visible");
        cy.xpath(nciddsAD).click({force:true});
    }

    clickPDENTchLink(){
        cy.xpath(pdentCH).should("be.visible");
        cy.xpath(pdentCH).click({force:true});
    }

    clickLBWchLink(){
        cy.xpath(lbwCH).should("be.visible");
        cy.xpath(lbwCH).click({force:true});
    }

    clickLRCDchLink(){
        cy.xpath(lrcdCH).should("be.visible");
        cy.xpath(lrcdCH).click({force:true});
    }

}
export default AdultCoreSetMeasuresPage;