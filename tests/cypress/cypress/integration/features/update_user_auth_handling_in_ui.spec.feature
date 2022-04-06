Feature: OY2-15013 Update user auth handling in ui

    Scenario: verify non state user is unable to have full access
        Given user visits QMR home page
        When login as approver
        Then click on go to state home
        Then verify add child core set is disabled
        Then verify add health homes core set is disabled
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        Then verify submit core set button is disabled
        Then Click on FUA-AD
        Then verify url contains FUA-AD
        And verify save button is disabled
        And verify validate measure button is disabled
        And verify complete measure button is disabled