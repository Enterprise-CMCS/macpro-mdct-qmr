Feature: OY2 15672 HEDIS Dropdown Update
    Scenario: Verify HEDIS text and options to select
        Given user visits QMR home page
        When login as state user
        Then verify Core Set Measures is displayed
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        Then Click on FUA-AD
        Then verify url contains FUA-AD
        And Click on National Committee for Quality Assurance Radio Button
        And verify NCQA text exists
        And verify FFY2021 exists
        And verify FFY2020 exists
        And verify FFY2019 exists