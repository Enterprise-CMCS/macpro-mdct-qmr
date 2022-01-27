Feature: Verify and fill out FUA-AD measurement

      Scenario: User logins to QMR and verifies fill out the FUA-AD measurement page for No option
        Given user visits QMR home page
        When  login as state user two
        And   user click on link Adult Core Set Measures
        And   user click on link FUA-AD
        And   user can click on No option for reporting on this measure
       

    Scenario: User logins to QMR and verifies fill out the FUA-AD measurement page for Yes option
            Given user visits QMR home page
            When  login as state user two
            And   user click on link Adult Core Set Measures
            And   user click on link FUA-AD
            And   user can click on Yes option for Are you reporting on this measure