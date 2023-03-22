// const fs=require('fs');
// let date=new Date().toUTCString();
// const dir=`report_cucumber/${date}`;
// fs.mkdirSync(dir , { recursive:true });

const Date = require('./config/Date');
const Date1=Date.currentDate;
console.log("DDDD js is "+Date1);
const common = `
    --require setup/assertions.js
    --require setup/hooks.js
    --require step-definitions/**/*.step.js
    --require config
    --format summary  
    --require progress-bar
    --require package.json  
    --require playwright.config.js  
    --publish-quiet  
    --format @cucumber/pretty-formatter
    --format json:report_cucumber/${Date1}/cucumber-html-report.json
    --format html:report_cucumber/${Date1}/cucumber-html-report.html     
    `

module.exports = {
  //default: `${common} features/**/*.feature`,
  default: `${common} features/testleaf/PrintAllValuesInTableUsingPagination.feature`,
  }