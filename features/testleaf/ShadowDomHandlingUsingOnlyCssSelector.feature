@ShadowDom_Handling_Only_Using_Css_Selector
Feature: User Can Handle Shadow Dom Only By Using Css Selector not using xpath

  
  @ShadowDom_Handling_Only_Using_Css_Selector
  Scenario: User Handles ShadowDom
    Given User navigates to Chromuim Bugs
    Then User Handles DropDown inside a ShadowDom
    Then User Enters Text in the TextBox inside a ShadowDom