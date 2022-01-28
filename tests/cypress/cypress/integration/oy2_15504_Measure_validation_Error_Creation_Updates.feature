Feature: OY2 15504 Measure Validation Error Creation Updates

    Scenario: verify save button validate measure and complete measure button
        Given user visits QMR home page
        When login as state user two
        Then  user should see the QMR 2021 Core Set Measures Reporting home page
        And   user click on link Adult Core Set Measures
        Then  verify url contains ACS
        Then  Click on FUA-AD
        Then  verify url contains FUA-AD
        And   verify the button Save on the top and click on it to see Saved Moments Ago shows up
        And   user can click on Yes option for Are you reporting on this measure at first
        And   select NCQA HEDIS under Measurement Specification
        And   verify sentence under Complete the Measure
        And   click on button Validate Measure to verify it shows the error message
        And   click on button Complete Measure to verify it shows Validation Error popup box
        And   click on No option in the popup box
