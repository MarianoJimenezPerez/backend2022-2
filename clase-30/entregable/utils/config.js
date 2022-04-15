const dotenv = require('dotenv');
dotenv.config();
const MONGOURL = process.env.MONGOURL;
const fbAId = process.env.fbAId;
const fbAS = process.env.fbAS;


module.exports.MONGOURL = MONGOURL;
module.exports.fbAId = fbAId;
module.exports.fbAS = fbAS;