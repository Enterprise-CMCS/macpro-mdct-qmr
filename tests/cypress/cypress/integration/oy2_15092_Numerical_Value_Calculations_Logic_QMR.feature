Feature: OY2 15672 Numerical Value/Calculations Logic QMR
    Scenario: Verify Numerical Value/Calculations with Administrative Data option
        Given user visits QMR home page
        When login as state user
        Then verify Core Set Measures is displayed
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        Then Click on FUA-AD
        Then verify url contains FUA-AD
        And Click on National Committee for Quality Assurance Radio Button
        # Then Click on Administrative Data
        Then Click on Medicaid Management Information System
        And clear numerator input box
        And clear Denominator input box
        And type numerator 321111
        And type Denominator 111111
        And verify error message is displayed
        And clear numerator input box
        And clear Denominator input box
        And type numerator 321111
        And type Denominator 411111
        And verify that only one number after decimal can populate for auto calculated rate exists
        And clear numerator input box
        And clear Denominator input box
        And type 8 digits numerator
        And type 8 digits Denominator
        # And verify error message is not displayed
        And clear numerator input box
        And clear Denominator input box
        And type letters numerator
        And type letters Denominator
        # And verify there is no value in rate box
        And clear numerator input box
        And clear Denominator input box
        And type numerator 321111
        And type Denominator 411111
        And input text in rate box
    # And verify user cannot manually override enter rate exists
    Scenario: Verify Numerical Value/Calculations with Administrative Data and Other Data Source options
        Given user visits QMR home page
        When login as state user
        Then verify Core Set Measures is displayed
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        Then Click on FUA-AD
        Then verify url contains FUA-AD
        And Click on National Committee for Quality Assurance Radio Button
        # Then Click on Administrative Data
        Then Click on Medicaid Management Information System
        Then Click on Other Data Source Radio Button
        And clear numerator input box
        And clear Denominator input box
        And type numerator 321111
        And type Denominator 111111
        And verify error message is displayed
        And clear numerator input box
        And clear Denominator input box
        And type numerator 321111
        And type Denominator 411111
        And verify that only one number after decimal can populate for auto calculated rate exists
        And clear numerator input box
        And clear Denominator input box
        And type 8 digits numerator
        And type 8 digits Denominator
        # And verify error message is not displayed
        And clear numerator input box
        And clear Denominator input box
        And type letters numerator
        And type letters Denominator
        # And verify there is no value in rate box
        And clear numerator input box
        And clear Denominator input box
        And type numerator 321111
        And type Denominator 411111
# And verify user can manually override enter rate exists