@User_Uploads_File_And_Validates_File_Uploaded_Or_Not
Feature: User Checks Whether he can Upload File Or Not

 # RegSuite 1 tc120RLZ32851
  
  @User_Uploads_File_And_Validates_File_Uploaded_Or_Not
  Scenario: User Checks Whether he can Upload File Or Not
    Given User navigates to TestLeaf dashboard page
   Then User Uploads File into the page
   Then User Checks Whether the File is Uploaded Or Not