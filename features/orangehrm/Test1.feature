@UserLoginIntoOrangeHrm
Feature: User Login into OrangeHRM

    @UserLoginIntoOrangeHrm
    Scenario Outline: User Logins into OrangeHRM
        Given User navigates to OrangeHRM  Login page
        Then User Enters "<UserName>" and "<Password>" and click Login Button
        Then User Asserts Whether he being navigated to OrangeHrm DashBoard Or Not
        Then User goes to Admin Page,enters "<SystemUser>","<EmployeeName>"  and Searches
        Then Select a Skill,delete it
        Then Asserts whether that skill is deleted or not

        Examples:
            | UserName           | Password           | SystemUser           | EmployeeName           |
            | OrangeHRM_UserName | OrangeHRM_Password | OrangeHRM_SystemUser | OrangeHRM_EmployeeName |