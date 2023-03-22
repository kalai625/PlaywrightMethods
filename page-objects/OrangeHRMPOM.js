const playwright = require('playwright')
class OrangeHRMPage
{
    async ORANGE_HRM_LOGIN_URL() {
        return await page.goto(global.ORANGE_HRM_URL);
      }
      async OrangeHrmEnterUserName(OrangeHrmUserName)
      {
        return await page.locator("//input[@name='username']").fill(OrangeHrmUserName);
      }

      async OrangeHrmEnterPassword(OrangeHrmPassword)
      {
        return await page.locator("//input[@name='password']").fill(OrangeHrmPassword);
      }

      async OrangeHrmClickLogin()
      {
        return await page.locator("//button[contains(@class,'orangehrm-login-button')]").click();
      }
      async OrangeHrmEnterSystemUser(OrangeHrmSystemUser)
      {
        return await page.locator("(//input[@class='oxd-input oxd-input--active'])[2]").fill(OrangeHrmSystemUser);
      }

      async OrangeHrmEnterEmployeeName(OrangeHrmEmployeName)
      {
        return await page.locator("//input[@placeholder='Type for hints...']").fill(OrangeHrmEmployeName);
      }

}
module.exports = { OrangeHRMPage }