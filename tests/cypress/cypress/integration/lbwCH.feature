Feature: Verify LBW-CH page

      Scenario: User logins to QMR and verifies the LBW-CH page
        Given user visits QMR home page
        When  user enter username and password
        And   user click "Sign In" button
        Then  user should see the QMR 2021 Core Set Measures Reporting home page
        And   user click on link Adult Core Set Measures
        And   user click on link LBW-CH
        And   user can see the LBW-CH Live Births Weighting Less Than 2500 Grams title
        And   user can see the Print button and sentence below title
        And   user can see the Measure Title Date Completed and Reporting on Measures 
        And   user can see the Performance Measure 
        And   user can see the button Back to Core Set Measures


