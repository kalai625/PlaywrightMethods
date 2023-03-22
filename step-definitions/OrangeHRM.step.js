const { Given, When, Then, defineStep } = require('@cucumber/cucumber')
const { OrangeHRMPage } = require('../page-objects/OrangeHRMPOM')
const { parseGherkinMessageStream } = require("@cucumber/cucumber");
const { setDefaultTimeout } = require('@cucumber/cucumber')
const timeoutData = require('../config/data.json');

const OrangeHrmdata = require('../config/OrangeHrmData.json');
const playwright = require('playwright');
const ExcelJS = require('exceljs');
const { writeFile } = require('fs');
//var XLSX=require('@xlsx');
const timeout = timeoutData.waitTime;
setDefaultTimeout(timeout);

const Orangehrmpage = new OrangeHRMPage()

Given('User navigates to OrangeHRM  Login page', async () => {
  await Orangehrmpage.ORANGE_HRM_LOGIN_URL();
  console.log('URL is navigated to OrangeHrm Login Page');
});

Then('User Enters {string} and {string} and click Login Button', async (OrangeHrmCredenial1, OrangeHrmCredenial2) => {
  const OrangeHrmUserName = OrangeHrmdata[OrangeHrmCredenial1];
  await Orangehrmpage.OrangeHrmEnterUserName(OrangeHrmUserName);

  const OrangeHrmPassword = OrangeHrmdata[OrangeHrmCredenial2];
  await Orangehrmpage.OrangeHrmEnterPassword(OrangeHrmPassword);
  await Orangehrmpage.OrangeHrmClickLogin();


});

Then('User Asserts Whether he being navigated to OrangeHrm DashBoard Or Not', async () => {
  const DashBoardUrl = await page.url();//gets dashboard URl
  console.log(DashBoardUrl);

  expect(DashBoardUrl).contain("dashboard");//check url has dashboard word in it

});

Then('User goes to Admin Page,enters {string},{string}  and Searches', async (OrangeHRMCredential3, OrangeHRMCredential4) => {
  const AdminBtn = await page.locator("//ul[@class='oxd-main-menu']/li[1]").click();
  const OrangeHrmSystemUser = OrangeHrmdata[OrangeHRMCredential3];
  await Orangehrmpage.OrangeHrmEnterSystemUser(OrangeHrmSystemUser);

  const OrangeHrmEmployeName = OrangeHrmdata[OrangeHRMCredential4];
  await Orangehrmpage.OrangeHrmEnterEmployeeName(OrangeHrmEmployeName);
  await page.locator("//button[text()=' Search ']").click();
  const checkboxes = await page.$$("//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']");
  for (const checkbox of checkboxes) {
    await checkbox.click();
  }

});


Then('Select a Skill,delete it', async () => {
  const Qualification = await page.locator("//div[@class='oxd-topbar-body']/nav/ul/li[4]").click();
  const Skills = await page.locator("//div[@class='oxd-topbar-body']/nav/ul/li[4]/ul/li/a[text()='Skills']").click();
  const GetInitialNoOfRecords = await page.locator("//span[@class='oxd-text oxd-text--span']").textContent();
  console.log("Inital No Of Records Present are" + GetInitialNoOfRecords);
  const WireFraming = await page.locator("(//i[@class='oxd-icon bi-check oxd-checkbox-input-icon'])[1]").click();
  const deletebutton = await page.locator("//button[contains(@class,'oxd-button--label-danger')]").click();
  const ConfirmDelete = await page.locator("//i[contains(@class,'bi-trash oxd-button-icon')]").click();
});

Then('Asserts whether that skill is deleted or not', async () => {
  const RecordsAfterDeleteOperation = await page.locator("//span[@class='oxd-text oxd-text--span']").textContent();

  expect(RecordsAfterDeleteOperation).contain("No Records Found");
});