const { Given, When, Then, defineStep } = require('@cucumber/cucumber')
const { SaavasPage } = require('../page-objects/tc120RLZ32851_page')
const { parseGherkinMessageStream } = require("@cucumber/cucumber");
const { setDefaultTimeout } = require('@cucumber/cucumber')
const timeoutData = require('../config/data.json');
const Encryptions = require('../config/encryptions');
const data = require('../config/data.json');
const playwright = require('playwright');
const ExcelJS = require('exceljs');
const { writeFile } = require('fs');
const CryptoJS = require('crypto-js');

//var XLSX=require('@xlsx');
const timeout = timeoutData.waitTime;
setDefaultTimeout(timeout);

const saavaspage = new SaavasPage()
const encryptions = new Encryptions()

Given('User navigates to Google.co.in', async () => {
  await saavaspage.GoogleBaseUrl();
  console.log('URL is navigated to Google.co.in');
});
Then('Handles SVG Elements', async () => {
  const svgElements = await page.$$('svg'); // Select all SVG elements in the page
  const numSvgElements = svgElements.length; // Get the number of SVG elements
  
  console.log(`Number of SVG elements: ${numSvgElements}`);

  const QuickSettings=await page.$("#tsf > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.dRYYxd > div.XDyW0e > svg");

  await QuickSettings.click();

  // // Get the viewBox attribute of an SVG element
  // const viewBox = await svgElement.getAttribute('viewBox');
  // console.log('The viewBox attribute is:', viewBox);
  //   // Take a screenshot of an SVG element
  //   await svgElement.screenshot({ path: 'config/google.png' });
});
Given('User navigates to Chromuim Bugs', async () => {
  await saavaspage.SHADOW_DOM_BUGS_CHROMIUM();
  console.log('URL is navigated to Chromium Bugs page');
});

Then('User Handles DropDown inside a ShadowDom', async () => {
  const SelectIssues = await page.$('#can');//select option with classname
  // // Click on the dropdown to open it
  await SelectIssues.click();//click the dropdown 1st
  await SelectIssues.selectOption({ label: 'Issues to verify' });
});


Then('User Enters Text in the TextBox inside a ShadowDom', async () => {
  await page.locator('#searchq').fill("annular");
});
Then('User Encrypts a Text and then he Decrypts the Same Text', async () => {
 // Encrypt a string using CryptoJS
const plaintext = 'Hello, world!';
const ciphertext = CryptoJS.AES.encrypt(plaintext, 'my-secret-key').toString();

// Print the ciphertext
console.log(`Ciphertext: ${ciphertext}`);

// Decrypt the ciphertext using CryptoJS
const decryptedText = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key').toString(CryptoJS.enc.Utf8);

// Print the decrypted text
console.log(`Decrypted text: ${decryptedText}`);
});
Then('User Prints All Values Of Table Through Pagination', async () => {
  const signin = await page.$("//a[@aria-label='Next Page']");
  expect(signin).to.exist;
  await signin.scrollIntoViewIfNeeded();

  // Set the number of rows per page and initialize the current page to 1
  const rowsPerPage = 10;
  let currentPage = 1;

  while (true) {
    // Get the values from the table on the current page
    const values = await page.$$eval(" #productsTable_data > tr", rows => rows.map(row => {
      const cells = Array.from(row.querySelectorAll(" #productsTable_data > tr > td"));
      return cells.map(cell => cell.textContent.trim());
    }));

    // Print the values
    console.log(values);

    // Check if there are more pages to process
    const nextPageButton = await page.$("#productsTable_paginator_bottom > a.ui-paginator-next.ui-state-default.ui-corner-all.ui-state-hover");
    if (!nextPageButton) {
      break;
    }

    // Click the next page button and wait for the page to load
    await nextPageButton.click();
    await page.waitForSelector(`button.page-number[value="${currentPage + 1}"]`);
    currentPage++;
  }

  

});
Given('User navigates to Amazon HomePage', async () => {
  await saavaspage.Amazon_BaseUrl();
  console.log('URL is navigated to Amazon HomePage');
});

Then('Searches for Apple Phone', async () => {
  //  const session = await context.newCDPSession(page);
  //    const { windowId } = await session.send('Browser.getWindowForTarget');
  //    await session.send('Browser.setWindowBounds', { windowId: windowId, bounds: { windowState: 'maximized' } });
  //    await session.detach();

  await saavaspage.Maximize_Window();
  await saavaspage.Amazon_Click_All();
  await saavaspage.Amazon_Mobile();
  await saavaspage.Amazon_All_Mobile();
  await saavaspage.Amazon_Select_Apple();
  await saavaspage.Amazon_iphone_13_Midnight();

  const [newWindow] = await Promise.all([
    context.waitForEvent("page"),
    await page.click("//span[text()='Apple iPhone 13 (128GB) - Midnight']")
  ])
  await newWindow.waitForLoadState();
  const PagesOpened = newWindow.context().pages();
  console.log("No of tabs Opened are " + PagesOpened.length);

  const BuyNow = await newWindow.locator("//input[@id='buy-now-button']");
  expect(BuyNow).to.exist;
  await BuyNow.scrollIntoViewIfNeeded();
  BuyNow.click();



  //await newWindow.close();//closes table tab
  // await page.bringToFront();///bring homepage to front






});

Given('User navigates to Flipkart Watch Page', async () => {
  await saavaspage.Flipkart_BaseUrl();
  console.log('URL is navigated to Flipkart Watch Page');
});
Then('sets Price Range From 5000 to 20000+', async () => {
  const Minimum_range = await page.$("(//select[@class='_2YxCDZ'])[1]");//select option with classname
  // // Click on the dropdown to open it
  await Minimum_range.click();//click the dropdown 1st
  await Minimum_range.selectOption({ label: '₹5000' });

  const Maximum_range = await page.$("(//select[@class='_2YxCDZ'])[2]");//select option with classname
  // // Click on the dropdown to open it
  await Maximum_range.click();//click the dropdown 1st
  await Maximum_range.selectOption({ index: 2 });

});

Then('User navigates to Amazon Home Page', async () => {
  await saavaspage.Amazon_BaseUrl();
  console.log('URL is navigated to Amazon HomePage');
});
Then('User Hovers Over amazon.in icon and asserts whether border line is present or not', async () => {
  const elemHandle = await page.waitForSelector("//div[@id='nav-logo']");
  const style = await elemHandle.evaluate((elem) => {
    return window.getComputedStyle(elem).getPropertyValue('border');
  });
  if (style !== 'none') {
    console.log('Border present!');
  } else {
    console.log('No border present.');
  }
});
Then('Select Video Games in DropDown', async () => {
  const All = await page.$("//div[@class='nav-search-scope nav-sprite']");//select option with classname
  await All.click();

  const SelectAll = await page.$("//select[@id='searchDropdownBox']");
  await SelectAll.selectOption({ label: 'Video Games' });

  //   const Electronics=await page.locator("(//select[@id='searchDropdownBox']/option)[17]");
  // await Electronics.click();
  //   for(const DropDownElement of All)
  // {
  // console.log(await DropDownElement.textContent());
  // }


  // // Click on the dropdown to open it
  // await All.click();//click the dropdown 1st
  // await All.selectOption({ label: 'Video Games' });
});

Then('User Enters {string} and selects Sandles For Men', async (ShoeBrandName) => {
  const ShoeBrand = data[ShoeBrandName];
  await saavaspage.Enter_Shoe_Brand(ShoeBrand);
  await saavaspage.Sandal_For_Men();
  const Bata_Shoes = await page.$$("//span[text()='BATA']");
  console.log(`Number of Bata Shoes: ${Bata_Shoes.length}`);
  const Discount_Shoes = await page.$$("//span[contains(text(),'% ')]");
  console.log(`Number of Shoes with discount are : ${Discount_Shoes.length}`);
});
Then('User Searches for MENSHERK TR E Slipper UK and Print the price', async () => {


  // Loop through all the pages
  while (true) {
    // Search for the element on the current page
    const element = await page.$("//span[contains(text(),' Ripley Sandal Brown_4 7 Kids UK (8614413)')]");
    if (element) {
      // If found, get its value and print it
      const value = await element.textContent();
      console.log(`Found the element with value: ${value}`);
      //     const Price=await page.$("(//span[text()='MenSHREK TR E Slipper UK 9 Color Black (8716538)']/following::div[3]/div/a/span/span/span)[1]");
      // const tt=Price.textContent();
      //   console.log(tt);
      break; // Stop the loop
    }

    // If not found, check if there is a next page
    const nextButton = await page.$("//a[text()='Next']");
    if (!nextButton) {
      console.log('Element not found');
      break; // Stop the loop
    }

    // If there is a next page, click the next button and wait for the page to load
    await Promise.all([
      page.waitForNavigation(),
      nextButton.click(),
    ]);
  }








  // let currentPageNum = 1;

  // while (true) {

  //   const allValues = await page.$$eval("//span[@class='a-size-base-plus a-color-base a-text-normal']", values => values.map(value => value.textContent));

  //  for(const value of allValues)
  //  {
  //   console.log("the current Page Values  are "+value);

  //  }
  //  console.log("The Next Page Values ");
  //   // Check if there is a "Next" button
  //   const nextButton = await page.$("//a[text()='Next']");
  //   if (!nextButton) {

  //     break; // Exit the loop if there is no "Next" button
  //   }

  //   // Click the "Next" button and wait for navigation
  //   await Promise.all([
  //     page.waitForNavigation(),
  //     nextButton.click(),
  //   ]);

  //   currentPageNum++; // Increment the current page number
  // }








  // const Page1=await page.$$eval("//span[@class='a-size-base-plus a-color-base a-text-normal']",elements => elements.map(el => el.textContent));
  // // Total_Shoes=All_Shoes_Name.length;
  // console.log('Values in page 2:', Page1);
  // const NextButton=await page.locator("//a[text()='Next']");

  //     await NextButton.scrollIntoViewIfNeeded(); 
  //     console.log("NextButton Visible");
  //     await page.waitForTimeout(5000);
  //    await NextButton.click();
  //    await page.waitForSelector("//span[@class='a-size-base-plus a-color-base a-text-normal']");
  // const Page2=await page.$$eval("//span[@class='a-size-base-plus a-color-base a-text-normal']",elements => elements.map(el => el.textContent));
  // console.log('Values in page 2:', Page2);

  // for(const shoes  of All_Shoes_Name)
  // {
  //  //const shoeLength= shoes.length; 
  //  while(Total_Shoes===66)
  //  {
  //   console.log(shoes.textContent());
  //  }
  //  const NextButton=await page.locator("//a[text()='Next']");

  //     await NextButton.scrollIntoViewIfNeeded(); 
  //     console.log("NextButton Visible");
  //     await page.waitForTimeout(5000);
  //    await NextButton.click();

  // }
  //const shooee=await page.locator("(//span[@class='a-size-base-plus a-color-base a-text-normal'])[1]").textContent();
  //const shooe=await page.$("//span[text()='MenSHREK TR E Slipper UK 9 Color Black (8716538)']");
  // const vis=await shooe.isVisible();
  // expect(vis).to.be.true;
  // const shooee=await shooe.textContent();
  // console.log("The shoe we r searching for is "+shooee)
  // for(const Shoe_Name of All_Shoes_Name)
  // {
  // const No_Of_Shoes=Shoe_Name.length;
  // while(No_Of_Shoes===69)
  // {
  //   const shoe=await Shoe_Name.textContent();

  // console.log("Shoes Present in the page are "+shoe);
  // }


  // const shoe=await Shoe_Name.textContent();

  // console.log("Shoes Present in the page are "+shoe);

  // const NextButton=await page.locator("//a[text()='Next']");

  //     await NextButton.scrollIntoViewIfNeeded(); 
  //     console.log("NextButton Visible");
  //     await page.waitForTimeout(5000);
  //    await NextButton.click();
  //    console.log("Next Button Clicked");
  //}



  // for(const Shoe_Name of All_Shoes_Name)
  // {
  //   await Shoe_Name.scrollIntoViewIfNeeded();

  // // const vis=await shooe.isVisible();
  // // expect(vis).to.be.true;

  // //const names=await Shoe_Name.textContent();
  // // const Noofshoes=names.length();
  // // console.log(Noofshoes);
  //  //console.log(names);
  // const NextButton=await page.locator("//a[text()='Next']");

  //     await NextButton.scrollIntoViewIfNeeded(); 
  //    await NextButton.click();

  // //const shooe=await page.locator("//span[text()='MenSHREK TR E Slipper UK 9 Color Black (8716538)']");

  // //const shooe=await page.locator("//*[contains(text(),'s Draco Weave')]");
  // //const shooee=await shooe.textContent();

  // //   if(names===shooee)
  // //   {
  // //     console.log(names)
  // //     console.log(shooee)
  // // //const Price=await page.locator("(//span[@class='a-size-base-plus a-color-base a-text-normal'])[1]/following::div[3]/div/a/span/span[1]").textContent();
  // //    // const Price=await page.locator("//span[text()='mens NEW THAR Brown Sandal - 6 UK (8614142)']/following::div[3]/div/a/span/span[1]").textContent(); 
  // //   //*[contains(text(),'s Draco Weave')] 
  // //  //  console.log(Price);
  // //     await page.waitForTimeout(5000);
  // //     break;

  // //   }
  // //   else
  // //   {
  // //    // console.log(names)
  // //    // const NextButton=await page.locator("//a[text()='Next']");

  // //    // await NextButton.click();
  // //     // const CurrentPage=await page.locator("//span[@class='s-pagination-item s-pagination-selected']").textContent();
  // //     // console.log(CurrentPage);
  // //    // await page.waitForLoadState()
  // //    //  await page.waitForTimeout(5000);
  // //     console.log("else block")
  // //   }

  //}
  // const sshoe='MenSHREK TR E Slipper UK 9 Color Black (8716538)';
  // while(!shoes ==sshoe)
  // {
  //     const NextButton=await page.$("//a[text()='Next']");
  //   NextButton.click();
  // }
});

Then('User Enters Pincode', async () => {
  const SearchBox = await page.locator("//input[@id='twotabsearchtextbox']");
  SearchBox.fill("wa");
  // Get all the options from the dropdown


});
Given('User navigates to Actitime LoginPage', async () => {
  await saavaspage.Actitime_BaseUrl();
  console.log('URL is navigated to Actitime LoginPage');
});
Then('User enters  Actitime {string} and {string} and Login', async (ActitimeCredential1, ActitimeCredential2) => {

  const ActitimeUserName = data[ActitimeCredential1];
  await saavaspage.Actitime_UserName(ActitimeUserName);

  const ActitimePassword = data[ActitimeCredential2];
  await saavaspage.Actitime_Password(ActitimePassword);
  await saavaspage.Actitime_Login();

});
Then('Checks for Reports and New Report and Select Billing Summary', async () => {
  const Reports = await page.locator("//div[text()='Reports']").click();
  const NewReport = await page.locator("//span[text()='New Report']").click();
  const BillingSummary = await page.locator("(//div[text()='Billing Summary'])[2]").click();
  const BillingSummaryText = await page.locator("//div[@class='firstParagraph billingDescriptionColor']").textContent();
  console.log(BillingSummaryText);
  const close = await page.locator("//div[@class='reportDescription_closeButton']").click()
});

Given('User navigates to LetsCode WindowHandling Page', async () => {
  await saavaspage.LETS_CODE_MULTIWINDOW();
  console.log('URL is navigated');
});

Then('he performs action on multiwindow', async () => {
  const [newWindow] = await Promise.all([
    context.waitForEvent("page"),
    await page.click("//button[text()='Open Home Page']")
  ])
  await newWindow.waitForLoadState();
  const PagesOpened = newWindow.context().pages();
  console.log("No of tabs Opened are " + PagesOpened.length);
  const text = await newWindow.locator("//h1[text()=' Practice and become pro in test automation']").textContent();
  console.log(text);
  const Input = await newWindow.locator("//a[text()='Edit']").click();
  const Name = await newWindow.locator("//input[@id='fullName']").fill("annular");
  // await newWindow.close();//closes table tab
  await newWindow.goBack();//goes to button page
  const Button = await newWindow.locator("//a[text()='Click']").click();
  //await newWindow.goFront();
  //const GotoHome=await newWindow.locator("//button[text()='Goto Home']").click();

  const Insights = await newWindow.locator("//p[contains(text(),'Insights on software testing videos like Selenium, Protractor, Playwright, Cypress & WebDriver IO')]");
  expect(Insights).to.exist;
  //  const pratise=await newWindow.locator("//h1[contains(text(),'Practice and become pro')]");
  //  expect(pratise).to.exist;
  //const Multi_Select=await newWindow.locator("").click();

  //await newWindow.backButton.click();
  await page.bringToFront();//bring homepage to front
  const HomePageUrl = await newWindow.url();
  console.log(HomePageUrl);
  const MultipleWindow = await newWindow.locator("//button[text()='Muiltiple windows']").click();
  //await newWindow.waitForTimeout(3000);
});

Given('User navigates to IRCTC Page', async () => {
  await saavaspage.IRCTC_BaseUrl();
  console.log('URL is navigated');
});

Then('Checks for Duplicate Values in ListBox', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const dropdownOption = await page.locator("//i[@class='pi pi-fw pi-chevron-down layout-menuitem-icon']").click();
  //  Locate the dropdown element
  //const FavouriteUITooldropdown = await page.$('select.ui-selectonemenu');

  // Find the listbox element and extract its values
  const listBoxValues = await page.$$eval('select.ui-selectonemenu', options => options.map(option => option.value));

  // Check for duplicates in the listbox values
  const hasDuplicates = new Set(listBoxValues).size !== listBoxValues.length;

  // Print the result
  if (hasDuplicates) {
    console.log('The listbox contains duplicate values.');
  } else {
    console.log('The listbox does not contain any duplicate values.');
  }
});
Given('User navigates to Basic Authentiation', async () => {
  await saavaspage.AuthBaseUrl();
  console.log('URL is navigated');
});
Given('User navigates to TestLeaf dashboard page', async () => {
  await saavaspage.saavasBaseUrl();
  console.log('URL is navigated');
});

Given('User navigates to LetsCode Selectable Page', async () => {
  await saavaspage.LetsCodeBaseUrl();
  console.log('URL is navigated to letsCode selectable page');
});

Given('User navigates to LetsCode Form Page', async () => {
  await saavaspage.LetsCodeFormUrl();
  console.log('URL is navigated to LetsCode FormPage');
});
Then('User Checks Basic Authentiation', async () => {
  const HomeButton = await page.locator("//i[@class='pi pi-home layout-menuitem-icon']").click();
  const auth = await page.locator("//i[@class='pi pi-fw pi-sign-in layout-menuitem-icon']").click();
  const BasicAuth = await page.locator("//span[@class='ui-button-text ui-c']").click();
  // Wait for the authentication dialog to appear
  await page.waitForSelector('dialog');

  // Enter the credentials into the authentication dialog
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'testleaf');
  await page.click('button[type="submit"]');

  // Wait for the page to reload after authentication
  await page.waitForNavigation();
});
Then('Selects the Elements one by one', async () => {
  //const selenium=await page.$("//h3[text()='Selenium']");
  //await selenium.click();

  await page.keyboard.press('Control');
  await page.locator("//h3[text()='Selenium']").click();
  await page.locator("//h3[text()='Protractor']").click();
  await page.locator("//h3[text()='Appium']").click();
  await page.keyboard.up('Control');

});

Then('User Checks Whether he able to write data in json file', async () => {

  // Create an object to write to the file
  const data = {
    CompanyName: 'Annular',
    No_of_Employes: 100,
    email: 'Annular.doe@example.com'
  };

  // Convert the object to a JSON string
  const jsonData = JSON.stringify(data, null, 2);//null->no additional options r specified,2->no of indentataion(white space or tabs)

  // Write the JSON data to a file
  writeFile('config/Test.json', jsonData, (error) => {
    //if (error) throw error;
    console.log('Data written to file!');
  });
});
Then('Test User Handles Pagination', async () => {
  const NextButton = await page.locator("//a[@aria-label='Next Page']");
  const NextButtonClassBefore = NextButton.getAttribute('class');
  console.log(NextButtonClassBefore);
  const clas = await page.locator("//a[@class='ui-paginator-next ui-state-default ui-corner-all ui-state-disabled']");
  console.log(clas);
  while (await NextButton.isEnabled()) {

    const rows = await page.$$("//table[@role='grid']//tr");
    for (const row of rows) {
      const cells = await row.$$('td');//we r taking the table data
      for (const cell of cells) {
        const value = await cell.innerText();//and printing the values in table data 
        console.log(value);
      }
    }
    //await page.waitForTimeout(9000);
    await NextButton.click();
    // await page.waitForTimeout(9000);
    console.log("clicking");

  }


});
Then('User Handles Alert Simple Dialog', async () => {
  const globe = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const alertButton = await page.locator("//i[@class='pi pi-fw pi-clone layout-menuitem-icon']").click();
  const btn = await page.waitForSelector("//button[@id='j_idt88:j_idt91']")
  btn.click();
  //await page.locator("//button[@id='prompt']").click();
  const alert = await page.waitForEvent('dialog');
  const message = alert.message();
  await alert.accept();
  console.log("Message Present in Alert Box Is " + message);

});

Then('User Handle Alert Confirm Dialog', async () => {

  const btn = await page.waitForSelector("//button[@id='j_idt88:j_idt93']")
  btn.click();
  //await page.locator("//button[@id='prompt']").click();
  const alert = await page.waitForEvent('dialog');
  const message = alert.message();
  await alert.accept();
  console.log("Message Present in Alert Box Is " + message);
  //const ReturnToDashboard=await page.locator("//div[@class='layout-topbar']/a[1]").click();

});

Then('User Handle Sweet Alert', async () => {
  //  const globe=await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  //  const alertButton=await page.locator("//i[@class='pi pi-fw pi-clone layout-menuitem-icon']").click();
  const btn = await page.waitForSelector("//button[@id='j_idt88:j_idt95']")
  btn.click();
  const text = await page.locator("//p[contains(text(),'You have clicked and open a dialog that can be inspectable')]").textContent();
  console.log("Text Present  In Sweet Alert Is " + text);
  const Dismiss = await page.locator("//span[text()='Dismiss']").click();
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
  // //await page.locator("//button[@id='prompt']").click();
  // const alert=await page.waitForEvent('dialog');
  // const message=alert.message();
  // await alert.accept();
  // console.log("Message Present in Alert Box Is "+message);
  //const ReturnToDashboard=await page.locator("//div[@class='layout-topbar']/a[1]").click();
  //p[contains(text(),'You have clicked and open a dialog that can be inspectable')]
});
Then('User Enters {string} in Name TextFeild', async (credential1) => {

  await saavaspage.TestLeafElementIcon();
  await saavaspage.TestLeafTestBoxIcon();


  //const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  //const TextBox = await page.locator("(//i[@class='pi pi-fw pi-check-square layout-menuitem-icon'])[1]").click();
  const Username = data[credential1];
  console.log(Username);
  await saavaspage.TestLeafEnterUserName(Username);
});

Then('User Appends {string} to City TextFeild', async (credential2) => {
  const AppendCountry = data[credential2];
  await saavaspage.TestLeafAppendCountryName(AppendCountry);
});

Then('User Checks Whether CheckBox Is Disabled Or Not', async () => {
  await saavaspage.TestLeafCheckDisabled();
});

Then('User Clears The Text in the TextBox', async () => {
  await saavaspage.TestLeafClearText();
});



Then('User Reterives The Text In The TextBox', async () => {

  const TypedText = await page.$("//input[@id='j_idt88:j_idt97']");
  const TypedTextValue = await TypedText.getAttribute('value');
  console.log("Text Present in the TextBox is " + TypedTextValue)
});

Then('User Enters {string} and Check Slider Moves Accordingly Or not', async (credential3) => {
  const SliderValue = data[credential3];
  await saavaspage.SliderValue(SliderValue);
  const SliderEnteredValue = await page.locator("(//span[@tabindex=0])[87]");
  const SliderEnteredValueAttribute = await SliderEnteredValue.getAttribute('style');
  console.log("Style Value is " + SliderEnteredValueAttribute)
  if (SliderEnteredValueAttribute.includes(50)) {
    console.log("Slider Has Moved");
  }
  else {
    console.log("Slider Has Not  Moved");
  }
});

Then('User Enters Paragragh in Custom ToolBar and Converts Text into Bold', async () => {
  const textbox = await page.locator("(//div[@class='ql-editor ql-blank'])[2]").fill("fere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ");
  await page.keyboard.press('Control+a');
  const Bold = await page.locator("(//button[@class='ql-bold'])[2]");
  await Bold.click();
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Enters {string},{string},{string} and select 5,6,7th option and delete it', async (Favourite1, Favourite2, Favourite3) => {
  await saavaspage.TestLeafElementIcon();
  await saavaspage.TestLeafTestBoxIcon();
  const Name1 = data[Favourite1];
  await saavaspage.EnterName1(Name1);
  const dropdown = await page.locator("//span[@class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s']").click();
  const select5thOption = await page.locator("//span[@id='j_idt106:auto-complete_panel']/ul/li[6]").click();
  const Name2 = data[Favourite2];
  await saavaspage.EnterName2(Name2);
  const dropdown1 = await page.locator("//span[@class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s']").click();
  const select6thOption = await page.locator("//span[@id='j_idt106:auto-complete_panel']/ul/li[7]").click();
  const Name3 = data[Favourite3];
  await saavaspage.EnterName3(Name3);
  const dropdown2 = await page.locator("//span[@class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s']").click();
  const select7thOption = await page.locator("//span[@id='j_idt106:auto-complete_panel']/ul/li[8]").click();
  const Delete7thOption = await page.locator("(//span[@class='ui-autocomplete-token-icon ui-icon ui-icon-close'])[3]").click();

  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();

});

Then('User Gets Tooltip Text', async () => {
  const signin = await page.$("//label[text()='2022 - All Rights Reserved']");
  expect(signin).to.exist;
  await signin.scrollIntoViewIfNeeded();
  const Home=await page.$("//i[@class='pi pi-home']");
  await Home.scrollIntoViewIfNeeded();





//await page.goto('chrome://downloads/');





 //await page.locator("#searchInput").fill("Annular");


  // //Hover over the element to show the tooltip
  // const elementHandle = await page.$("(//a[@href='#'])[10]");
  // await elementHandle.hover();

  // // Get the tooltip text and print it to the console
  // const tooltipText = await elementHandle.getAttribute('title');
  // console.log(`Tooltip text: ${tooltipText}`);





  // // Hover over the element that triggers the tooltip
  // await page.hover("//i[@class='pi pi-globe']");

  // // Wait for the tooltip to appear
  // const tooltipSelector = "//a[@data-tooltip='Notifications']";
  // //await page.waitForSelector(tooltipSelector);

  // // Get the tooltip text

  // const tooltipText = await page.textContent(tooltipSelector);

  // // Print the tooltip text to the console
  // console.log(`Tooltip text: ${tooltipText}`);

});

Then('User Checks Whether Link Is Broken Or Not', async () => {
  await saavaspage.TestLeafElementIcon();
  await saavaspage.TestLeafHyperLinkIcon();

  const link = await page.$("//a[text()='Broken?']");
  const href = await link.getAttribute('href');

  const response = await page.goto(href);
  const status = response.status();

  if (status !== 200) {
    console.log(`The link ${href} is broken`);
  } else {
    console.log(`The link ${href} is working`);
  }
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});


Then('Scroll Upto a Particular Element', async () => {
  // Check if the page has a vertical scrollbar
  const hasVerticalScrollbar = await page.evaluate(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    return scrollHeight > clientHeight;
  });

  // Assert whether a vertical scrollbar is present or not
  expect(hasVerticalScrollbar).to.be.true; // or false




  //   const signin = await page.$("//span[text()='Data Table']");
  //   expect(signin).to.exist;
  //   const scroll=await signin.scrollIntoViewIfNeeded();
  //  console.log(scroll);
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});
Then('Click and Drag Element To Left', async () => {
  //const elementHandle = await page.$("//div[@id='form:conpnl']");
  //await elementHandle.click();

  //Move the element to the right using the right arrow key
  const Browser = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const frame = await page.locator("(//i[@class='pi pi-fw pi-calendar layout-menuitem-icon'])[1]").click();


  const elementHandle = await page.$("//div[@id='form:conpnl']");
  await elementHandle.evaluate((el) => {
    const style = window.getComputedStyle(el);
    const left = parseInt(style.left) || 0;
    el.style.left = `${left + 700}px`;
  })
});
Then('User Handles Slider Operation', async () => {


  // Click on the element to select it
  const Browser = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const Drag = await page.locator("(//i[@class='pi pi-fw pi-calendar layout-menuitem-icon'])[1]").click();
  







  //const elementHandle = await page.locator("(//span[@tabindex=0])[1]").click();
  //const result=expect(elementHandle).to.exist();

  // const elementHandle = await page.$("(//span[@tabindex='0'])[1]");
  // await elementHandle.evaluate((el) => {
  //   const style = window.getComputedStyle(el);
  //   const right = parseInt(style.right) || 0;
  //   el.style.left = `${right + 200}px`;
  // })
  //   await page.setViewportSize({ width:300, height: 300 });
  //   // Find the slider element
  // const slider = await page.$("(//span[@tabindex='0'])[1]");

  // // Get the slider's dimensions
  // const sliderBoundingBox = await slider.boundingBox();

  // // Calculate the center of the slider element
  // const sliderCenter = {
  //   x: sliderBoundingBox.x + sliderBoundingBox.width / 2,
  //   y: sliderBoundingBox.y + sliderBoundingBox.height / 2
  // };

  // // Click on the slider element to activate it
  // await slider.click();

  // // Move the slider to the right by a certain amount
  // const slideDistance = 100; // Change this value to slide more or less
  // await page.mouse.move(sliderCenter.x, sliderCenter.y);
  // await page.mouse.down();
  // await page.mouse.move(sliderCenter.x + slideDistance, sliderCenter.y, { steps: 50 });
  // await page.mouse.up();

  const text = await page.locator("(//div[@class='card'])[9]/table/tbody/tr/td/span").textContent();
  console.log(text);
  await page.setViewportSize({ width: 1280, height: 720 });


  // const slider1 = page.locator("//h5[text()='Draggable Rows']/following::table[@role='grid']/tbody/tr/td[text()='Bamboo Watch']");
  // const targetLocator = page.locator("//h5[text()='Draggable Rows']/following::table[@role='grid']/tbody/tr/td[text()='Gaming Set']");
  // const slider1BoundingBox = await slider1.boundingBox();//gets x,y co-ordinates and width and height 
  // const targetBoundingBox = await targetLocator.boundingBox();
  // const sourceX = slider1BoundingBox.x + slider1BoundingBox.width / 2;//gets x-coordinate and width/2 means it moves to center 
  // const sourceY = slider1BoundingBox.y + slider1BoundingBox.height / 2;//gets y-coordinate and height/2 means it moves to center
  // const targetX = targetBoundingBox.x + targetBoundingBox.width / 2;//gets x-coordinate and width/2 means it moves to center
  // const targetY = targetBoundingBox.y + targetBoundingBox.height / 2;
  // await page.mouse.move(sourceX, sourceY);//from->moving src 
  // await page.mouse.down();
  // await page.mouse.move(targetX, targetY);//to target->
  // await page.mouse.up();





  //Move the element to the right using the right arrow key
  // const keyboard = await page.keyboard;
  // await keyboard.press('ArrowRight');
  // await keyboard.press('ArrowRight');
  // await keyboard.press('ArrowRight');
  // await keyboard.press('ArrowRight');


  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('Click button wait for 10s and assert whether button text has changed', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const wait = await page.locator("//i[@class='pi pi-fw pi-clock layout-menuitem-icon']").click();
  const iamabouttohide = await page.locator("//span[text()='I am about to hide']");
  expect(iamabouttohide).to.exist;
  const button = await page.locator("//button[@id='j_idt87:j_idt92']").click();
  await page.waitForTimeout(10000);
  //expect (iamabouttohide).to.not.exist;
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();

});

Then('Checks whether the button is round or not', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const ButtonIcon = await page.locator("//i[@class='pi pi-fw pi-mobile layout-menuitem-icon']").click();
  const button = await page.$("//button[@id='j_idt88:j_idt108']"); // Select the button element

  const isButtonRound = await button.evaluate(button => {
    const borderRadius = getComputedStyle(button).getPropertyValue('border-radius'); // Get the value of the border-radius CSS property
    return borderRadius.endsWith('50%') || borderRadius.endsWith('999em'); // Check if the value ends with '50%' or '999em', which indicates a round button
  });

  if (isButtonRound) {
    console.log('Button is round');
  } else {
    console.log('Button is not round');
  }
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Finds Height and Width Of The Button', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const ButtonIcon = await page.locator("//i[@class='pi pi-fw pi-mobile layout-menuitem-icon']").click();
  const button = await page.locator("(//span[@class='ui-button-text ui-c'])[5]");
  const buttonsrc = await button.boundingBox();
  console.log(buttonsrc.x);
  console.log(buttonsrc.y);
  console.log(buttonsrc.width);
  console.log(buttonsrc.height);
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Gets the color of the button', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const ButtonIcon = await page.locator("//i[@class='pi pi-fw pi-mobile layout-menuitem-icon']").click();
  const button = await page.$("(//span[text()='Success'])[1]"); // Select the button element

  const buttonBgColorBeforeHover = await button.evaluate(button => getComputedStyle(button).getPropertyValue('background-color')); // Get the background-color property before hover

  await button.hover(); // Hover over the button using the built-in hover function

  const buttonBgColorAfterHover = await button.evaluate(button => getComputedStyle(button).getPropertyValue('background-color')); // Get the background-color property after hover

  console.log(`Button background color before hover: ${buttonBgColorBeforeHover}`);
  console.log(`Button background color after hover: ${buttonBgColorAfterHover}`);
  if (`Button background color before hover: ${buttonBgColorBeforeHover}` == `Button background color after hover: ${buttonBgColorAfterHover}`) {
    console.log("Color not changed")
  }
  else {
    console.log("Color  changed")
  }
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();

});


Then('Assert whether checkbox is selected or not', async () => {
  const checkbox = await page.$("(//input[@type='checkbox'])[1]").isChecked();
  expect(checkbox).to.be.true;
  // const button = await page.$('#noEdit');

  // // Check if the element is enabled or not
  // const isEnabled = await button.isEnabled();

  // // Assert that the element is enabled
  // expect(isEnabled).to.be.false;

  // const textbox = await page.$('#dontwrite');

  // // Check if the element is enabled or not
  // const isEditable = await textbox.isEditable();

  // // Assert that the element is enabled
  // expect(isEditable).to.be.false;

  //const checkbox=await page.locator("//*[text()='Notification']/following::div[3]/div[2]").click();
  //const isChecked = await checkbox.getProperty('checked').jsonValue();
  //const afterchecked=await page.locator("//div[@class='ui-chkbox-box ui-widget ui-corner-all ui-state-default ui-state-active ui-state-hover']")
  // Assert that the checkbox is selected
  //expect(isChecked).to.equal(true);
  //const isChecked = await page.locator("//div[@class='ui-chkbox-box ui-widget ui-corner-all ui-state-default ui-state-active ui-state-hover']").isChecked().toBeTruthy();
  //expect(isChecked).to.be.true;
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});




Then('User Read Values From Excel', async () => {


  // Load the Excel workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('config/datasheet.xlsx');//give the location of excel sheet
  const worksheet = workbook.getWorksheet(1);

  // Loop through the rows in the worksheet
  for (let i = 1; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    // Get the values from the current row
    const values = row.values;

    for (const value of values) {
      console.log(value);
    }
  }
});
Then('User Write Values In Excel File', async () => {

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet2');
  worksheet.addRow([1, 'Annular', 'MANAGING DIRECTOR']);
  worksheet.addRow([2, 'Annular', 'SelvaKugan']);
  worksheet.addRow([3, 'Annular', 'sellamuthu']);
  worksheet.addRow([4, 'Annular', 'Ajith']);
  worksheet.addRow([5, 'Annular', 'Krishna']);
  worksheet.addRow([6, 'Annular', 'Francis']);
  worksheet.addRow([7, 'Annular', 'Kalai']);
  worksheet.addRow([8, 'Annular', 'Kanishka']);
  await workbook.xlsx.writeFile('config/datasheet.xlsx');
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});


// Then('Select Eletronics,ComputerPeriphals and Currency detectors', async () => {
//   await page.locator("//button[text()='✕']").click();
//   await page.locator("//div[text()='Electronics']").hover();
//   await page.locator("//a[text()='Computer Peripherals']").hover();
//   await page.locator("//a[text()='Currency Detectors']").click();

// });
// Then('Change Language to Tamil and Assert it', async () => {
//   await page.locator("(//span[@class='nav-line-2'])[1]").hover();
//   await page.locator("(//span[contains(text(),'தமிழ்')])[1]").click();
//   const tamiltext = await page.locator("//span[contains(text(),' உங்கள் முகவரியைத் தேர்ந்தெடுக்கவும்')]");
//   expect(tamiltext).to.exist;


// });


// Then('Hover Allow Signin and select your seller Account', async () => {
//   await page.locator("//div[@id='nav-tools']/a[2]").hover();
//   const YourAccount = await page.$$("//div[@id='nav-al-your-account']");
//   for (const Account of YourAccount) {
//     console.log("Your Account Has " + await Account.textContent());

//   }
//   // await page.locator("//span[text()='Your Seller Account']").click();

// });
Then('User Selects All CheckBoxes 1 by1', async () => {

  const CheckBoxes = await page.$$("//div[@class='ui-chkbox-box ui-widget ui-corner-all ui-state-default']");

  for (let i = 0; i < CheckBoxes.length; i += 2) { // iterate over every other checkbox
    await CheckBoxes[i].click(); // click the checkbox
  }
  // for (const CheckBox of CheckBoxes) {
  //   console.log(await CheckBox.click());
  // }
});

Then('Handle DropDown', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const dropdownOption = await page.locator("//i[@class='pi pi-fw pi-chevron-down layout-menuitem-icon']").click();
  //  Locate the dropdown element
  const FavouriteUITooldropdown = await page.$('select.ui-selectonemenu');//select option with classname
  // // Click on the dropdown to open it
  await FavouriteUITooldropdown.click();//click the dropdown 1st
  await FavouriteUITooldropdown.selectOption({ label: 'Playwright' });//select the option using label

  //code for selecting Preferred Country
  const SelectCountrydropdown = await page.$("//label[@id='j_idt87:country_label']");//select option with classname
  expect(SelectCountrydropdown).to.exist;
  await SelectCountrydropdown.click();//click the dropdown 1st
  const country = await page.locator("//div[@class='ui-selectonemenu-items-wrapper']/ul/li[4]").click();


  const ChooseCourse = await page.$("//span[@class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s']");
  await ChooseCourse.click();
  const MyFavouriteCourse = await page.locator("//ul[@class='ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset']/li[4]").click();

  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});
Then('User Opens Multiple Window and Print Table', async () => {

  const globe = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const window = await page.locator("//i[@class='pi pi-fw pi-window-maximize layout-menuitem-icon']").click();

  const [newWindow] = await Promise.all([
    context.waitForEvent("page"),
    await page.click("//span[text()='Open Multiple']")
  ])
  await newWindow.waitForLoadState();
  const PagesOpened = newWindow.context().pages();
  console.log("No of tabs Opened are " + PagesOpened.length)
  expect(newWindow.url()).contain("table");



  const rows = await newWindow.$$("//table[@role='grid']//tr");

  for (let i = 0; i < rows.length; i += 2) {
    const rowText = await rows[i].innerText();
    console.log(rowText);
  }
  // for (const row of rows) {
  //   const cells = await row.$$('td');//we r taking the table data
  //   for (const cell of cells) {
  //     const value = await cell.innerText();//and printing the values in table data 
  //     console.log(value);
  //   }

  // }
  await newWindow.close();//closes table tab
  await page.bringToFront();//bring homepage to front



  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});
Then('User Uploads File into the page', async () => {
  const Misc = await page.locator("//i[@class='pi pi-circle-off layout-menuitem-icon']").click();
  const file = await page.locator("//li[@id='menuform:m_file']").click();

  await page.locator("(//input[@type='file'])[1]").setInputFiles(["config/ppple.txt"]);
  //OR
  //await page.setInputFiles("(//input[@type='file'])[1]", ["Desktop/ppple.txt"])

  //
});

Then('User Checks Whether the File is Uploaded Or Not', async () => {
  const UploadedFileName = await page.locator("//span[@class='ui-fileupload-filename']").textContent();
  console.log("Uploaded File Name is " + UploadedFileName);
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Downloads File from the page', async () => {
  const Misc = await page.locator("//i[@class='pi pi-circle-off layout-menuitem-icon']").click();
  const file = await page.locator("//li[@id='menuform:m_file']").click();
  await page.setViewportSize({ width: 300, height: 300 });
  const download = await Promise.all([
    page.waitForEvent("download"),
    page.click("//span[text()='Download']")//click the download button

  ])

  //this 2 lines used to download file inside playwright itself
  const path = await download[0].path();
  console.log(path);
  const fileName = download[0].suggestedFilename();
  //await download[0].saveAs(fileName);
  await download[0].saveAs('../reports/Downloads/TestLeafLogo.png');
  await page.setViewportSize({ width: 1280, height: 720 });
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();

});

Then('User Handling Nested Frame', async () => {
  const List = await page.locator("//i[@class='pi pi-align-left layout-menuitem-icon']").click();
  const ListMenu = await page.locator("//i[@class='pi pi-fw pi-list layout-menuitem-icon']").click();
  const Pick_Listt = await page.$("//h5[text()='Pick List']");

  const scroll = await Pick_Listt.scrollIntoViewIfNeeded();

  const PickList = await page.locator("//ul[contains(@class,'ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom ui-sortable')]");
  const hasVerticalScrollbar = await PickList.evaluate(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    return scrollHeight > clientHeight;
  })
  if (hasVerticalScrollbar) {
    console.log("ScrollBar is Present");
  }
  else {
    console.log("ScrollBar is not  Present");
  }




  //const Browser = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  //const FrameButton = await page.locator("//li[@id='menuform:m_frame']").click();
  //   const hasVerticalScrollbar = await page.evaluate(() => {
  //     const { scrollHeight, clientHeight } = document.documentElement;
  //     return scrollHeight > clientHeight;
  // })
  // if(!hasVerticalScrollbar)
  // {
  // console.log("ScrollBar is Present");
  // }
  // else
  // {
  //   console.log("ScrollBar is not  Present");
  // }
  //expect(hasVerticalScrollbar).to.be.true;
  // const AllFrames = page.frames();
  // console.log("No Of Frames are " + AllFrames.length);//return no of frames in page
  // const frame1 = await page.frameLocator("iframe[src='default.xhtml']")

  // // Click on the button inside the frame
  // await frame1.locator("(//button[@id='Click'])[1]").click();
  // console.log("button clicked");
  // // const frame2= await frame1.frameLocator("iframe[src='nested.xhtml']");
  // // console.log("Enterd into frame 2");
  // // const button=await frame2.locator("//button[text()='Count Frames']");

  // const frame3 = await page.frameLocator("iframe[src='page.xhtml']");
  // console.log("Enterd into frame 3");
  // const frame4 = await frame3.frameLocator("iframe[src='framebutton.xhtml']")
  // console.log("Enterd into frame 4");


  // await frame4.locator("#Click").click();


  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
  //  const frame = await page.frame({ name: 'firstFr' });//name of the frame
  //  const FirstName=await frame.$(".input ng-pristine ng-invalid ng-touched");
  //  await FirstName.type('Hello, World!');

});

Then('User Handles Drag and Drop', async () => {

  const Browser = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const Drag = await page.locator("(//i[@class='pi pi-fw pi-calendar layout-menuitem-icon'])[1]").click();
  //const btn=await page.waitForSelector("//button[@id='prompt']")
  const sourceLocator = page.locator("//div[@id='form:drag_content']");
  const targetLocator = page.locator("//span[text()='Droppable Target']");
  const sourceBoundingBox = await sourceLocator.boundingBox();//gets x,y co-ordinates and width and height 
  const targetBoundingBox = await targetLocator.boundingBox();
  const sourceX = sourceBoundingBox.x + sourceBoundingBox.width / 2;//gets x-coordinate and width/2 means it moves to center 
  const sourceY = sourceBoundingBox.y + sourceBoundingBox.height / 2;//gets y-coordinate and height/2 means it moves to center
  const targetX = targetBoundingBox.x + targetBoundingBox.width / 2;//gets x-coordinate and width/2 means it moves to center
  const targetY = targetBoundingBox.y + targetBoundingBox.height / 2;
  await page.mouse.move(sourceX, sourceY);//from->moving src 
  await page.mouse.down();
  await page.mouse.move(targetX, targetY);//to target->
  await page.mouse.up();

  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();

});



Then('User Handle Prompt Box', async () => {
  //   const globe=await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  //  const alertButton=await page.locator("//i[@class='pi pi-fw pi-clone layout-menuitem-icon']").click();
  const btn = await page.waitForSelector("//button[@id='j_idt88:j_idt104']")
  btn.click();
  //await page.locator("//button[@id='prompt']").click();
  const alert = await page.waitForEvent('dialog');
  const message = alert.message();
  await alert.accept("Annular");
  const result = await page.locator("//span[contains(text(),'User entered name as')]");
  const res = result.textContent();
  console.log("Result is " + res);













  //await page.click('#accept');
  //await page.locator("//button[text()='Simple Alert']").click();
  // 

  //console.log(` \ Alert Message is : ${message} `);


  // Select all the checkboxes on the page that have the "myCheckboxClass" class
  // const  = await page.$$("//div[@id='j_idt105_content']//div[contains(@class,'ui-chkbox-box ui-widget ui-corner-all ui-state')]");


  // for (const checkbox of checkboxes) {
  //   console.log(await checkbox.click());
  //  //expect(await checkbox.isChecked()).to.be.true;
  // }


  // // Loop through each checkbox and click it
  // await checkboxes.forEach(async (checkbox) => {
  //   await checkbox.click();

  // // Assert that all checkboxes are checked
  // await checkboxes.forEach(async (checkbox) => {
  //   expect(await checkbox.isChecked()).to.be.true;
  // });

  // });

});





