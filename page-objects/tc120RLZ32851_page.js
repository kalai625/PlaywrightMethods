const playwright = require('playwright')
const checkDisabled="//input[@id='j_idt88:j_idt93']";
const ApppendCountry="//input[@id='j_idt88:j_idt91']";
const TestLeafUserName="//input[@id='j_idt88:name']";
const ClearTxtTestLeaf="//input[@id='j_idt88:j_idt95']";
const Naame1="//input[@id='j_idt106:auto-complete_input']";
const Naame2="//input[@id='j_idt106:auto-complete_input']";
const Naame3="//input[@id='j_idt106:auto-complete_input']";
const Slider_Value="//input[@id='j_idt106:slider']";
const Element="//i[@class='pi pi-server layout-menuitem-icon']";
const TextBox="(//i[@class='pi pi-fw pi-check-square layout-menuitem-icon'])[1]";
const HyperLinkIcon="//i[@class='pi pi-fw pi-link layout-menuitem-icon']";
const Actitime_UserName="//input[@id='username']";
const Actitime_Password="//input[@name='pwd']";
const Actitime_Login="//a[@id='loginButton']";
const AmazonSearchBox="//input[@id='twotabsearchtextbox']";
const Amazon_Sandal_for_Men_Select="//span[text()=' sandals for men']";
const Amazon_All="//span[@class='hm-icon-label']";
const Mobile="//div[@id='hmenu-content']/ul/li[16]/a/i";
const AllMobiles="//a[text()='All Mobile Phones']";
const AppleCheckBox="//span[text()='Apple']//parent::a/div/label/i";
const Apple_iphone13_Midnight="//span[text()='Apple iPhone 13 (128GB) - Midnight']";
const Amazon_Buy_Now="//span[text()=' Buy Now ']";


class SaavasPage {
  
async Maximize_Window()
{
  const session = await context.newCDPSession(page);
  const { windowId } = await session.send('Browser.getWindowForTarget');
  await session.send('Browser.setWindowBounds', { windowId: windowId, bounds: { windowState: 'maximized' } });
  return await session.detach();
}

async SHADOW_DOM_BUGS_CHROMIUM() {
  return await page.goto(global.SHADOW_DOM_BUGS_CHROMIUM);
}
  async LETS_CODE_MULTIWINDOW() {
    return await page.goto(global.LETS_CODE_WINDOW);
  }

  async Flipkart_BaseUrl() {
    return await page.goto(global.FLIPKART_URL);
  }
  async Amazon_BaseUrl() {
    return await page.goto(global.AMAZON_HOMEPAGE);
  }
 
  async Actitime_BaseUrl() {
    return await page.goto(global.ACTITIME_URL);
  }

  async Amazon_Click_All () {
    return await page.locator(Amazon_All).click();
  }
  async Amazon_Mobile() {
    return await page.locator(Mobile).click();
  }
  async Amazon_All_Mobile() {
    return await page.locator(AllMobiles).click();
  }
  async Amazon_Select_Apple() {
    return await page.locator(AppleCheckBox).click();
  }
  async Amazon_iphone_13_Midnight() {
    return await page.locator(Apple_iphone13_Midnight).click();
  }
  async Amazon_Buy_Now() {
    return await page.locator(Amazon_Buy_Now).click();
  }

  async Amazon_Enter_Ur_Pincode(Pincode) {
    return await page.locator(Amazon_Deleiver).fill(Pincode);
  }
  async Enter_Shoe_Brand(ShoeBrand)
{
  return await page.locator(AmazonSearchBox).fill(ShoeBrand);
}
async Sandal_For_Men () {
  return await page.locator(Amazon_Sandal_for_Men_Select).click();
}
  async Actitime_UserName(ActitimeUserName)
{
  return await page.locator("//input[@id='username']").fill(ActitimeUserName);
}
async Actitime_Password(ActitimePassoword)
{
  return await page.locator(Actitime_Password).fill(ActitimePassoword);
}
async Actitime_Login () {
  return await page.locator(Actitime_Login).click();
}
  async IRCTC_BaseUrl() {
    return await page.goto(global.IRCTC_URL);
  }

 async AuthBaseUrl() {
    return await page.goto(global.BASIC_AUTHEN_URL);
  }
  async LetsCodeBaseUrl() {
    return await page.goto(global.LETS_CODE_SELECTABLE);
  }
  async LetsCodeFormUrl() {
    return await page.goto(global.LETS_CODE_CALENDAR);
  }
  async saavasBaseUrl() {
    return await page.goto(global.BASE_URL);
  }
  async GoogleBaseUrl() {
    return await page.goto(global.GOOGLE_HOMEPAGE);
  }
async TestLeafEnterUserName(Username)
{
  return await page.locator(TestLeafUserName).fill(Username);
}
async TestLeafAppendCountryName(AppendCountry)
{
  const textbox = await page.$(ApppendCountry);

// Get the current value of the textbox
const currentValue = await textbox.inputValue();
console.log(currentValue);

// Append text to the current value
//const additionalText = '  India';
const newValue = currentValue + AppendCountry;

// Set the textbox's value to the new value
return await textbox.fill(currentValue + AppendCountry);
  //return await page.locator("//input[@id='j_idt88:name']").fill(AppendCountry);
}
async TestLeafElementIcon () {
  return await page.locator(Element).click();
}
async TestLeafTestBoxIcon() {
  return await page.locator(TextBox).click();
}

async TestLeafHyperLinkIcon() {
  return await page.locator(HyperLinkIcon).click();
}


async TestLeafHyperLinkIcon() {
  return await page.locator(HyperLinkIcon).click();
}
async TestLeafCheckDisabled()
{
  const btn=await page.$(checkDisabled);
  const btnn= await btn.isDisabled();
  return expect (btnn).to.be.true;
}
async TestLeafClearText()
{
  await page.locator(ClearTxtTestLeaf).clear();
}
async SliderValue(SliderValue)
{
return await page.locator(Slider_Value).fill(SliderValue);
}
  async EnterSaavaasUserName(UserName) {
    return await page.locator('[id="username"]').fill(UserName);
  }
  async EnterName1(Name1) {
    return await page.locator(Naame1).fill(Name1);
  }
  async EnterName2(Name2) {
    return await page.locator(Naame2).fill(Name2);
  }
  async EnterName3(Name3) {
    return await page.locator(Naame3).fill(Name3);
  }
  
  async Password(_password) {
    await page.locator('[id="password"]').fill(_password);
  }
  async clickSumbit() {
    await page.locator('[id="signInBtn"]').click();
  }
  async currentPageUrl() {
    return await page.url();
  }
  async HelpSymbol() {
    await page.getByRole('button', { name: 'help' }).locator('svg').click();
  }
  // async HelpSymbol() {
  //   await page.evaluateHandle(() => {
  //     const navbar = document.querySelector('body > app-root > app-home > app-header > shell-cel-navbar');
  //     if (navbar) {
  //       const iconButton = navbar.document.querySelector('div.right-container > div:nth-child(3) > div > shell-cel-icon-button');
  //       if (iconButton) {
  //         const helpicon = iconButton.document.querySelector('button');
  //         if (helpicon) {
  //           return helpicon
  //         }
  //       }
  //     }   
  //   });
  //   await helpicon.click();
  // }
  // // async HelpSymbol() {
  //   //await page.getByRole('button', { name: 'help' }).locator('svg').click();
  //   // const shadowRoot = await this.getShadowElement(selector);
  //   // const button = await shadowRoot.evaluateHandle((root) => root.querySelector('button'));
  //   // await button.click();
  //   const shadowRoot = await page.evaluateHandle((selector))
  //   const button = await shadowRoot.querySelector('button');
  //   await button.click();
  // }
  // async HelpSymbol() {
  //   const shadow2 = await page.evaluateHandle(async () => {
  //     document.querySelector('[class="right-container"]');
  //     const shadow1 = await shadow2.asElement().shadowRoot.querySelector('[class="icon-button center"]');
  //     const helpIconButton = shadow1.asElement().shadowRoot.querySelector('[class="icon-inner"]');
  //     await helpIconButton.click();
  // });


  // async HelpSymbol(selector) {
  //   const shadowRoot = await page.evaluateHandle(selector => {
  //     const element = document.querySelector(selector);
  //     return element.shadowRoot;
  //   }, selector);

  //   const button = await shadowRoot.$$('button');
  //   await button.click();
  // }
  //need to write shadowroot

  async userIDstatus() {
    return await page.locator('[id="usernameStatus"]').textContent();
  }
  async passwordStatus() {
    return await page.locator('[id="passwordStatus"]').textContent();
  }

  // async userIDstatus() {
  //   return await page.$eval('#usernameStatus', element => element.textContent);
  // }

  // async passwordStatus() {
  //   return await page.$eval('#passwordStatus', element => element.textContent);
  // }

  //**************************************** */
  async testleafUrl() {
    await page.goto('https://www.leafground.com/dashboard.xhtml');

  }
  async linkinedIn() {
    await page.goto('https://www.linkedin.com/');
  }

  async fillEmailadress() {
    await page.locator('[placeholder="E-mail Address"]').fill('kalai@annular.com');
  }

  async textmessageTeamAnnular() {
    await page.locator('textarea[role="textbox"]').fill('Team Annular');
  }

  async msgClicksumbit() {
    await page.locator('button[role="button"]:has-text("Send")').click();
  }

  async pause() {
    // Wait for 10 seconds

  }
  async take_screenshot() {
    // const ref1 = await global.page.screenshot({ path: `reports/vianame/${e.pickle}.png`, fullPage: true });//
    const ref = await global.page.screenshot({ path: `reports/TestScenario.png`, fullPage: true });

  }

  //******************* */
  async navigateToLoginScreen() {
    await page.goto('https://www.google.com/');
    //await page.locator('[aria-label="Search"]').click()
  }

  async enterTextSearchBox() {
    await page.locator('[aria-label="Search"]').click();
    await page.locator('[aria-label="Search"]').fill('linkedin');
    await page.waitForTimeout(3000)
  }

  async errormethod() {
    await page.wait('[dssfsd"Sesddarch"]').fill('linkedin')
  }

  async submitLoginForm() {
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')
  }

  async submitLoginWithParameters(username, password) {
    await page.fill('#user-name', username)
    await page.fill('#password', password)
    await page.click('#login-button')
  }

  async assertUserIsLoggedIn() {
    await page.waitForSelector('.inventory_list')
  }

}

module.exports = { SaavasPage }
