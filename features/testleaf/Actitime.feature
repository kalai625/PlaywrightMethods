@Validate_Actitime_Pop_Up
Feature: User Handles Actitime Report Popup

  # RegSuite 1 tc120RLZ32851

  @Validate_Actitime_Pop_Up
  Scenario Outline:  User Handles Actitime Report Popup
    Given User navigates to Actitime LoginPage
    Then User enters  Actitime "<ActitimeUserName>" and "<ActitimePassword>" and Login 
   # Then Checks for Reports and New Report and Select Billing Summary
    Examples:
    | ActitimeUserName         | ActitimePassword           |
    | Actitime_UserNamee         |  Actitime_Password          |
