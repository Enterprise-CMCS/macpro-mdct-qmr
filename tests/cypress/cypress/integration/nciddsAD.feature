Feature: Verify NCIDDS-AD page

      Scenario: User logins to QMR and verifies the NCIDDS-AD page
        Given user visits QMR home page
        When  user enter email and password for Cognito login
        And   user click on Login with Cognito button
        Then  user should see the QMR 2021 Core Set Measures Reporting home page
        And   user click on link Adult Core Set Measures
        And   user click on link NCIDDS-AD
        And   user can see the NCIDDS-AD National Core Indicators Survey title
        And   user can see the Print button and sentence below title
        And   user can see the Measure Title Date Completed and Reporting on Measures 
        And   user can see the Performance Measure 
        And   user can see the button Back to Core Set Measures


