
const all_check_box = "//span[ contains(@class, 'check')]/p";
const reporting_yes = "(//span[ contains(@class, 'radio')]/p)[1]";
const reporting_no = "(//span[ contains(@class, 'radio')]/p)[2]";
const sample_text = "This is a test from the QA !";

// -- SECTION: What you are not reporting on this measure? 
const check_service_not_covered = "(//span[ contains(@class, 'check')]/p)[1]";
const check_population_not_covered = "(//span[ contains(@class, 'check')]/p)[2]";
const radio_partial_popu_not_covered = "(//span[ contains(@class, 'radio')]/p)[4]";
const text_explain_partial_popu = "(//textarea)[1]";

const check_data_not_available = "(//span[ contains(@class, 'check')]/p)[3]";
const check_data_inconsistencies = "(//span[ contains(@class, 'check')]/p)[6]";
const text_explain_inconsistencies = "(//textarea)[2]";

const check_source_not_accessible = "(//span[ contains(@class, 'check')]/p)[7]";
const check_source_not_accessible_other = "(//span[ contains(@class, 'check')]/p)[10]";
const text_source_not_accessible_other_explain = "(//textarea)[3]";

const check_info_not_collected = "(//span[ contains(@class, 'check')]/p)[11]";
const check_info_not_collected_by_provider = "(//span[ contains(@class, 'check')]/p)[12]";

const check_limitation_with_data = "(//span[ contains(@class, 'check')]/p)[15]";
const text_describe_limitation = "(//textarea)[4]";

const check_small_sample_size = "(//span[ contains(@class, 'check')]/p)[16]";
const num_sample_size = "//input[contains(@data-testid, 'number')]";

// ------- 
const check_all_options = "//span[ contains(@class, 'check')]/p";
const radio_all_options = "//span[ contains(@class, 'radio')]/p";

export class FUAadpage {

    verifyReportingOnMeasureYes() {
        cy.reload();
        cy.wait(500);
        cy.xpath(reporting_yes).click();

        // Initial Checkbox clicks
        cy.xpath(check_all_options).each((item, index, list) => {
            cy.wrap(item).scrollIntoView();
            cy.wrap(item).click({force:true});
            cy.wait(500);
        });

        // Expanded checkbox clicks 
        const unched_checkbox = "//span[ contains(@class, 'check') and not(@data-checked)]";
        cy.xpath(unched_checkbox).each((item, index, list) => {
            cy.wrap(item).scrollIntoView();
            cy.wrap(item).click({force:true});
            cy.wait(500);
        });

        cy.scrollTo('top');
        cy.wait(5000);
        const radi_all_options_besides_reporting_measures = "(//span[contains(@class, 'radio')]/p)[contains(text(), 'Yes,')]";
        cy.xpath(radi_all_options_besides_reporting_measures).each((item, index, list) => {
            cy.wrap(item).scrollIntoView();
            cy.wrap(item).click({force:true});
            cy.wait(500);
        });

        // Input to the text area 
        const displayed_text_areas = "//textarea";
        cy.scrollTo('top');
        cy.wait(5000);
        cy.xpath(displayed_text_areas).each((item, index, list) => {
            cy.wrap(item).scrollIntoView();
            cy.wrap(item).clear();
            cy.wait(500);
            cy.wrap(item).type(sample_text);
            cy.wait(500);
        });

        // Input the percentage 
        const all_number_input = "//input[ contains(@data-testid, 'number') ]";
        cy.scrollTo('top');
        cy.wait(5000);
        cy.xpath(all_number_input).each((item, index, list) => {
            cy.wrap(item).scrollIntoView();
            cy.wrap(item).clear();
            cy.wait(500);
            cy.wrap(item).type(20);
            cy.wait(500);
        });

        cy.wait(1000);
        const describe_rate = "//input[@type='text' and contains(@name, 'Rates')]";
        cy.xpath(describe_rate).scrollIntoView();
        cy.xpath(describe_rate).clear();
        cy.xpath(describe_rate).type("This is a QA testing for the Rate");
        cy.wait(500);

        // forms 
        cy.get("input#field-50").scrollIntoView();
        cy.get("input#field-50").clear();
        cy.get("input#field-50").type("10");

        cy.get("input#field-51").clear();
        cy.get("input#field-51").type("20")


        cy.get("input#field-52").invoke('attr', 'value').should('eq', '0.5000');
    }

    VerifyReportingOnMeasureNo() {
        cy.reload();
        cy.wait(500);
        cy.xpath(reporting_no).click();
        cy.xpath(check_service_not_covered).click();
        cy.xpath(check_population_not_covered).click();
        cy.xpath(radio_partial_popu_not_covered).click();
        cy.xpath(text_explain_partial_popu).type(sample_text);

        cy.xpath(check_data_not_available).click();
        cy.xpath(check_data_inconsistencies).click();
        cy.xpath(text_explain_inconsistencies).type(sample_text);

        cy.xpath(check_source_not_accessible).click();
        cy.xpath(check_source_not_accessible_other).click();
        cy.xpath(text_source_not_accessible_other_explain).type(sample_text);

        cy.xpath(check_info_not_collected).click();
        cy.xpath(check_info_not_collected_by_provider).click();

        cy.xpath(check_limitation_with_data).click();
        cy.xpath(text_describe_limitation).type(sample_text);

        cy.xpath(check_small_sample_size).click();
        cy.xpath(num_sample_size).type(22);
    }

    // verifyStatusOfDataReport() {

    // }

    // verifyMeasurementSpec() {

    // }

    // verifyDataSource() {

    // }

    // verifyDateRange() {

    // }

    // verifyDefinitionOfDenominator() {

    // }

    // verifyDeliverySystem() {

    // }

    // verifyPerformanceMeasure() {

    // }

    // verifyAges() {

    // }

    // verifyDeviationsFromMeasureSpec() {

    // }

    // verifyCombinedRates() {

    // }

    // verifyOptionalMeasureStratification() {

    // }

    // verifyAddtionalNotes() {

    // }
}
export default FUAadpage;