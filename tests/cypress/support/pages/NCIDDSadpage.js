const nciddsADtitle = "(//h2)[3]";
const sentenceBelowTitle = "(//p[@class='chakra-text css-itvw0n'])[1]";
const printButton = "//button[@class='chakra-button css-3kal6a']";
const measureTitle = "(//p[@class='chakra-text css-0'])[1]";
const dateCompleted = "(//p[@class='chakra-text css-0'])[2]";
const reportingOnMeasure = "(//p[@class='chakra-text css-0'])[3]";
const performanceMeasureOne = "(//p[@class='chakra-text css-0'])[4]";
const performanceMeasureTwo = "(//p[@class='chakra-text css-0'])[5]";
const backToCoreSetButton = "//button[@class='chakra-button css-bym7u4']";


export class NCIDDSadpage {
    verifyNCIDDSadTitle(){
        cy.xpath(nciddsADtitle).should("be.visible");
        cy.xpath(nciddsADtitle).contains('NCIDDS-AD - National Core Indicators Survey');
    }

    verifyPrintButtonAndSentence(){
        cy.xpath(sentenceBelowTitle).should("be.visible");
        cy.xpath(printButton).should("be.visible");
    }

    verifyMeasureTitleDateAndReporting(){
        cy.xpath(measureTitle).should("be.visible");
        cy.xpath(dateCompleted).should("be.visible");
        cy.xpath(reportingOnMeasure).should("be.visible");
    }

    verifyPerformanceMeasure(){
        cy.xpath(performanceMeasureOne).should("be.visible");
        cy.xpath(performanceMeasureTwo).should("be.visible");
    }

    verifyBackToCoreSetMeasureButton(){
        cy.xpath(backToCoreSetButton).should("be.visible");
    }

}
export default NCIDDSadpage;