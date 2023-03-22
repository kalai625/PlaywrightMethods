@Alert_Box_Handling
Feature: User Handles All Types Of Alerts

  RegSuite 1 tc120RLZ32851

  @Alert_Box_Handling
  Scenario: User Handles All Types Of Alerts
    Given User navigates to TestLeaf dashboard page

    Then User Handles Alert Simple Dialog
    Then User Handle Prompt Box
    Then User Handle Alert Confirm Dialog
    Then User Handle Sweet Alert