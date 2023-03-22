const fs = require('fs');
const path = require('path');

const currentDate = new Date().toISOString().replace(/:/g, '-');
const dir = path.join('report_cucumber', currentDate);

// Create the parent directory recursively
fs.mkdirSync('report_cucumber', { recursive: true });

// Create the target directory
fs.mkdirSync(dir, { recursive: true });
console.log("Print Date js "+currentDate);

// Export the date variable for use in other modules
module.exports = {currentDate };



// const fs=require('fs');
// const date=new Date().toISOString().replace(/:/g, '-');
// const dir=`report_cucumber/${date}`;
// fs.mkdirSync(dir , { recursive:true });
// module.exports={date};