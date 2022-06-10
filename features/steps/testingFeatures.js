const { When, Then, Given, Before, AfterAll } = require("@cucumber/cucumber")
const puppeteer = require("puppeteer")
var { setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require("chai");

setDefaultTimeout(60 * 1000);
let browser, page;
Before(async function () {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 10,
        devtools: false,
        args:
            [
                '--start-maximized',
                '--window-size=1920,1080'
            ]
    });
    page = await browser.newPage();
})
        
        Given('User get in the add to-do form', async function () {
            await page.goto("http://localhost:8080/")
         });
         When('User fill the form and select None Priority', async function () {
          let addButtonForm = ['.ant-btn-primary:not([disabled])'];
          await page.waitForSelector(addButtonForm);
          let  addButton = await page.$(addButtonForm);
          await addButton.click();

          let textSelectorForm  = ['[type=text]'];
          await page.waitForSelector(textSelectorForm);
          let input = await page.$(textSelectorForm);
          await input.type('Job');

          let selectPriority = ['.ant-slider-dot'];
          await page.waitForSelector(selectPriority);
          let  priorityButton = await page.$(selectPriority);
          await priorityButton.click();

         });

         Then('Default priority is Low', async function () {
           
          let doneButtonSelector = ['.ant-btn-primary:not(.ant-btn-icon-only)'];
    await page.waitForSelector(doneButtonSelector);
    let doneButton = await page.$(doneButtonSelector);
    await doneButton.click();
        
            let taskSelector = ['.ant-list-items'];
            await page.waitForSelector(taskSelector);
            let list = await page.$(taskSelector);
            let taskItemSelector = ['ul>div'];
            let taskItems = await list.$$(taskItemSelector);
            expect(taskItems.length).to.equal(1);
         });


         AfterAll(async () => {
            await page.waitForTimeout(4000);
            await browser.close();
        });