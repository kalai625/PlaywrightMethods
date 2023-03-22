@Validate_Duplicate_Values_In_DropDown
Feature: User Checks Whether he can handle Flipkart Dropdown or Not

  # RegSuite 1 tc120RLZ32851

  @Validate_Duplicate_Values_In_DropDown
  Scenario Outline: Scenario Outline name: User Checks Flipkart DropDown
    # Given User navigates to Flipkart Watch Page 
    # Then sets Price Range From 5000 to 20000+
    Then User navigates to Amazon Home Page
   
    #Then Select Video Games in DropDown
    Then User Enters "<BrandName>" and selects Sandles For Men
    Then User Searches for MENSHERK TR E Slipper UK and Print the price
    #Then User Enters Pincode 
   
    Examples:
        | BrandName | 
        | Shoe_Brand_Name  |
