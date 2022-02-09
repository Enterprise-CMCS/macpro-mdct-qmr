Feature: Verify and fill out CPA-AD measurement

    Scenario: User logins to QMR and verifies fill out the CPA-AD measurement page for No option
        Given user visits QMR home page
        When  login as state user two
        And   user click on link Adult Core Set Measures
        And   user click on link CPA-AD
        And   user can click on No option for reporting on this measure
       

    Scenario: User logins to QMR and verifies fill out the CPA-AD measurement page for Yes option
        Given user visits QMR home page
        When  login as state user two
        And   user click on link Adult Core Set Measures
        And   user click on link CPA-AD
        And   user can verify the title 
        And   user can verify the sentence below the title
        And   user can click on Yes option for Did you collect this measure?
        And   user can click on AHRQ option for How did you report this measure?
        And   user can click on AHRQ option for Measurement Specification
        And   user can click CAHPS for Data Source
        And   user can click on No supplemental Item Sets were included for Which Supplemental Item Sets were included in the Survey
        And   user can click AHRQ administrative protocol 
        And   user can click on Survey sample Medicaid population 
        And   user can verify Performance Measure text
        And   user can verify that validate and complete measure buttons are enabled and clickable
        


  
