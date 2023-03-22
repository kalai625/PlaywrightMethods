@UserHandleTextBox
Feature: User Handles TextBox

  RegSuite 1 tc120RLZ32851
  
  @UserHandleTextBox
  Scenario Outline: User Handles TextBox
    Given User navigates to TestLeaf dashboard page
      Then User Enters "<UserName>" in Name TextFeild 
      Then User Appends "<Country>" to City TextFeild
      Then User Checks Whether CheckBox Is Disabled Or Not
     Then User Clears The Text in the TextBox
    Then User Reterives The Text In The TextBox
     Then User Enters "<SliderValue>" and Check Slider Moves Accordingly Or not
     Then User Enters Paragragh in Custom ToolBar and Converts Text into Bold
     Then User Enters "<Name1>","<Name2>","<Name3>" and select 5,6,7th option and delete it



    
     Examples:
     | UserName | Country | SliderValue | Name1 | Name2 | Name3 |
     | UserName  | Country | SliderValue | Name1 | Name2 | Name3 | 