Feature: Verify and fill out FUA-AD measurement

      Scenario: User logins to QMR and verifies fill out the FUA-AD measurement page
        Given user visits QMR home page
        When  user enter username and password
        And   user click "Sign In" button
        # Then  user should see the QMR 2021 Core Set Measures Reporting home page
        And   user click on link Adult Core Set Measures
        And   user click on link FUA-AD
        # And   user can see the FUA-AD follow up after emergency department vist for alcohol and other drug abuse title
        # And   user can see the sentence below title
        And   user can click on No option for reporting on this measure
        # And   user can click on Yes option for Are you reporting on this measure
        # And   user can click on What is the status of the data being reported section
        # And   user can click on Other option in Measurement Specification 
        # And   user can click on National Committee for Quality Assurance HEDIS option in Measure Specification
        # And   user can click on Other Data Source option in Data Source section
        # And   user can click on Administrative Data option in Data Source section
        # And   user can click on enter start and end date on Date Range section
        # And   user can click on options in Definition of denominator section
        # And   user can click on options in Which delivery systems are represented in the denominator section
        # And   user can fill out Performance Measure section
        # And   user can fill out Follow-up within 30 days of ED visit section
        # And   user can click on options for Deviations from Measure Specifications section
        # And   user can click on options for Combined Rate(s) from Multiple Reporting Units section
        # And   user can click on options for Optional Measure Stratification section
        # And   user can enter Additional Notes section


