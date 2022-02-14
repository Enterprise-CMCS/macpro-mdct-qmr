Feature: OY2 15212 QMR and MDCT Logo to all pages

    Scenario: verify the QMR and MDCT logo show up in each page
        Given user visits QMR home page
        When login as state user two
        And   user should see the QMR logo at top and MDCT Medicaid logo at the bottom of the home page
        And   user click on Adult Core Set Measure link
        And   user should see the QMR logo at top and MDCT Medicaid logo at the bottom of the Adult core set measure page
        Then  click on FUA-AD 
        And   user should see the QMR logo at top and MDCT Medicaid logo at the bottom of the FUA-AD page