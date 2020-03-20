const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  dbport: process.env.DBPORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dbname: process.env.DBNAME,
  host: process.env.HOST,
  key: process.env.KEY,
  tableName: process.env.TABLENAME
};