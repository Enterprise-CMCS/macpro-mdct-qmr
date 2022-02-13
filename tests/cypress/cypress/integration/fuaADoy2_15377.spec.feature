Feature: Verify and fill out FUA-AD measurement with other option under Measurement Specification
      Scenario: User logins to QMR and verifies fill out the FUA-AD with other option under Measurement Specification and verify it under OMS
        Given user visits QMR home page
        When  login as state user two
        And   user click on link Adult Core Set Measures
        And   user click on link FUA-AD
        And   user can click on Yes option for Are you reporting on this measure at first
        And   user can click on Other option in Measurement Specifications 
        And   user can enter Describe the Rate under Other Proformane Measure section
        And   user can verify the exact text entered in Describe the Rate shows up in Optional Measure Stratification section
