Feature: OY2 14767 AAllow files to be uploaded to s3

    Scenario: Allow upload with pdf
        Given user visits QMR home page
        When login as state user
        Then verify Core Set Measures is displayed
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        Then Click on FUA-AD
        Then verify url contains FUA-AD
        And verify browse exists
        And upload attachment pdf
        And verify pdf is uploaded

    Scenario: Allow upload with multiple files
        Given user visits QMR home page
        When login as state user
        Then verify Core Set Measures is displayed
        Then Click on Adult Core Set Measures
        Then verify url contains ACS
        Then Click on FUA-AD
        Then verify url contains FUA-AD
        And verify browse exists
        And upload attachment pdf
        And upload attachment text file
        And upload attachment picture
        And verify pdf is uploaded
        And verify text file is uploaded
        And verify picture is uploaded

