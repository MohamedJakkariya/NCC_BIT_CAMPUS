const dotenv = require('dotenv');

dotenv.config(); 

module.exports = {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dbname: process.env.DBNAME,
  dbport: process.env.DBPORT,
  port: process.env.PORT,
  key: process.env.KEY,
  loginTable: process.env.LOGINTABLE,
  registerTable: process.env.REGISTERTABLE
};