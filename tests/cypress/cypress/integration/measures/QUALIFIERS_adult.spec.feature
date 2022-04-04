Feature: OY2 10018 Adult Measure Qualifer: AD

    Scenario: Adult Core Set Questions Screen Enhancements
        Given user visits QMR home page
        When login as state user
        Then verify Core Set Measures is displayed
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        Then Click on Adult Core Set Questions
        And verify Adult Core Set Questions is displayed
        And verify Adult Core Set Questions content is displayed
        And verify Delivery System is displayed
        And verify Delivery System content is displayed
        And verify AGES 21 TO 64 is displayed
        And verify AGE 65 AND OLDER is displayed
        And verify Fee-for-Service is displayed
        And verify PCCM is displayed
        And verify Managed Care is displayed
        And verify Integrated Care Model ICM is displayed
        And verify add Another box is displayed
        And verify Total all ages is displayed
        And verify AGES 21 TO 64 total value is displayed
        And verify AGE 65 AND OLDER total value is displayed
        And verify Audit or Validation of Measures
        And verify Audit or Validation of Measures content is displayed
        And verify yes option on section 2 is displayed
        And verify no option on section 2 is displayed
        And click yes option on section 2
        And verify add another button is displayed
        And verify External Contractor is displayed
        And verify External Contractor content is displayed
        And verify yes option is displayed
        And verify no option is displayed
        And click on yes option
        And verify External Quality Review Organization EQRO is displayed
        And verify MMIS Contractor is displayed
        And verify Data Analytics Contractor is displayed
        And verify other under external contractor is displayed
        And verify Complete all Adult Core Set and Child Core Set Measures to submit to CMS is displayed
        And verify Complete all Adult Core Set and Child Core Set Measures to submit to CMS content is displayed
        And verify complete core set questions button is enabled
        And verify Do you have questions or need support is displayed
