Feature: Verify and fill out OUD-AD measurement

    Scenario: User logins to QMR and verifies fill out the OUD-AD measurement page for No option
        Given user visits QMR home page
        When  login as state user two
        And   user click on link Adult Core Set Measures
        And   user click on link OUD-AD
        And   user can click on No option for reporting on this measure


    Scenario: User logins to QMR and verifies fill out the OUD-AD measurement page for Yes option
        Given user visits QMR home page
        When  login as state user two
        And   user click on link Adult Core Set Measures
        And   user click on link OUD-AD
        And   upload attachment pdf
        And   upload attachment text file
        And   upload attachment picture
        And   user enters inputs to the Rate field and verify the correct Rate output
        And   button on the page is clickable

    Scenario: Verify Numerical Value/Calculations with Administrative Data option
        Given user visits QMR home page
        When login as state user
        Then verify Core Set Measures is displayed
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        And  user click on link OUD-AD
        And Click on Centers for Medicare & Medicaid Services Radio Button
        Then Click on Administrative Data
        Then Click on Medicaid Management Information System
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type total rate numerator 321111
        And type total rate Denominator 111111
        And verify error message is displayed
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type total rate numerator 321111
        And type total rate Denominator 411111
        And verify that only one number after decimal can populate for auto calculated total rate exists
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type 8 digits total rate numerator
        And type 8 digits total rate Denominator
        # And verify error message is not displayed
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type letters total rate numerator
        And type letters total rate Denominator
        # And verify there is no value in rate box
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type total rate numerator 321111
        And type total rate Denominator 411111
        And input text in total rate box
    # And verify user cannot manually override enter rate exists
    Scenario: Verify Numerical Value/Calculations with Administrative Data and Other Data Source options
        Given user visits QMR home page
        When login as state user
        Then verify Core Set Measures is displayed
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        And   user click on link OUD-AD
        And Click on Centers for Medicare & Medicaid Services Radio Button
        Then Click on Administrative Data
        Then Click on Medicaid Management Information System
        Then Click on OUDAD Other Data Source Radio Button
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type total rate numerator 321111
        And type total rate Denominator 111111
        And verify error message is displayed
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type total rate numerator 321111
        And type total rate Denominator 411111
        And verify that only one number after decimal can populate for auto calculated total rate exists
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type 8 digits total rate numerator
        And type 8 digits total rate Denominator
        # And verify error message is not displayed
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type letters total rate numerator
        And type letters total rate Denominator
        # And verify there is no value in rate box
        And clear total rate numerator input box
        And clear total rate Denominator input box
        And type total rate numerator 321111
        And type total rate Denominator 411111
# And verify user can manually override enter total rate exists