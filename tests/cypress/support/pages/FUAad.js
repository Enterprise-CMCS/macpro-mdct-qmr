const fuaADtitle = "(//h2)[3]";
const saveButton = "(//button[@type='submit'])[1]";
const completeMeasureBttn = "(//button[@type='submit'])[2]";
const sentenceBelowTitle = "(//p[@class='chakra-text css-itvw0n'])[1]";
//Element in "Are you reporting on this measure?" section
const yesReporting = "(//span[@class='chakra-radio__control css-gzpnyx'])[1]";
const noReporting = "(//span[@class='chakra-radio__control css-gzpnyx'])[2]";
//----Checkbox when click on Not reporting-----//
const serviceNotCovered = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[1]";
const populationNotCovered = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[2]";
//====Radio options when click on Population not covered=====//
const entirePopulationNotCover = "(//span[@class='chakra-radio__control css-gzpnyx'])[3]";
const partialPopulationNotCover = "(//span[@class='chakra-radio__control css-gzpnyx'])[4]";
const explainPartialNotCover = "//textarea[@id='field-247']";
const dataNotAvailable = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[3]";
//====Checkbox when click on Data not available====//
const budgetConstrains = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[4]";
const staffConstraints = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[5]";
const dataInconsistencies = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[6]";
const explainDataInconsistency = "//textarea[@id='field-249']";
const dataSourceNotEasy = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[7]";
const requiresMedicalRecordReview = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[8]";
const requiresDataLinkage = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[9]";
const otherDataSource = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[10]";
const explainOtherDataSource = "//textarea[@id='field-254']";
const informationNotCollected = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[8]";
const otherNotAvailable = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[9]";



const limitationPandemic = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[4]";
const smallSample = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[5]";
const otherOption = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[6]";

//Element in "Status of Data Reported" section
//Element in "Measurement Specification" section
//Element in "Data source" section
//Element in "Data Range" section
//Element in "Definition of Population included in the Measure" section
//Element in "Which delivery systems are represented in the denominator" section
//Element in "Deviations from measure specifications" section
//Element in "Other Performance Measure" section
//Element in "Combined Rate(s) from Multiple Reporting Units" section
//Element in "Optional Measure Stratification" section
//Element in "Additional Notes/Comments on the measure (optional)" section
//Element in "Complete the Measure" section
const completeMeasureBttnBottom = "(//button[@type='submit'])[3]";


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



// ---- hints -----------
//  cy.get(submitBTN).click();                                       -- clicking 
//  cy.xpath(respondToRAI).click();                                  -- clicking xpath
//  cy.get(AdditionalInformationBox).type('This is just a test');    -- typing
//  cy.get(errorMessageForWaiverNumber).should('be.visible');        -- visible
//  cy.xpath(submissionList).should('be.visible')                    -- visible xpath
//  cy.get(errorMessageForWaiverNumber).should('not.exist');         -- assert not visible
//  cy.get(waiverNumberInputBox).clear();                            -- clear text
//  cy.get(successMessage).contains('Submission Completed');         -- text assertion 
//  cy.xpath(location).contains('word');                             -- text assertion xpath
//  cy.wait(5000);                                                   -- waiting