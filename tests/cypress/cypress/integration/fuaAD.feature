Feature: Verify and fill out FUA-AD measurement

      Scenario: User logins to QMR and verifies fill out the FUA-AD measurement page
        Given user visits QMR home page
        When  user enter username and password
        And   user click "Sign In" button
        Then  user should see the QMR 2021 Core Set Measures Reporting home page
        And   user click on link Adult Core Set Measures
        And   user click on link FUA-AD
        And   user can see the FUA-AD follow up after emergency department vist for alcohol and other drug abuse title
        And   user can see the sentence below title
        And   user can click on No option for Are you reporting on this measure
        And   user can click on Yes option for Are you reporting on this measure


