Feature: User login 

    Scenario: User enters invalid login credentials
        Given user is on  login page 
        When user logins with invalid credentials 
        Then user can see error message 