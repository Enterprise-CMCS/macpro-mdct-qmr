Feature: Verify and fill out FUA-AD measurement Deviation from Measure Specifications and Optional Measure Stratification

  Scenario: User logins to QMR and verifies fill out the FUA-AD Deviation from Measure Specifications and Optional Measure Stratification
    Given user visits QMR home page
    When  login as state user two
    And   user click on link Adult Core Set Measures
    And   user click on link FUA-AD
    And   user can click on Yes option for Are you reporting on this measure at first
    And   user can click on NCQA HEDIS under Measurement Specifications
    And   user can enter numerator and denominator for age 18-64
    And   user can click on Yes option for Deviations from Measure Specifications
    And   user can click on Follow up within 30 days of ED visits
    And   user can click on ages 18-64
    And   user can click on numerator denominator other checkbox and enter text in explain textbox
    And   user can click Race Non Hispanic under Optional Measure Stratification
    And   user can click on White checkbox and ages 18 to 64
    And   user can enter numerator denominator to verify Rate
