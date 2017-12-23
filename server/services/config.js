const dotenv = require('dotenv');

dotenv.config();

let config = {};
config.app = {};
config.db = {};

config.app.debuglog = `${process.env.DEBUGLOG}`;

config.db.dbuserid = `${process.env.DBUSERID}`;
config.db.dbpasswd = `${process.env.DBPASSWD}`;
config.db.dbdomain = `${process.env.DBDOMAIN}`;
config.db.dbhost = `${process.env.DBHOST}`;
config.db.dbport = `${process.env.DBPORT}`;
config.db.dbname = `${process.env.DBNAME}`;
config.db.dburl = `${process.env.DBURL}`;

if (config.app.debuglog.toUpperCase() === 'TRUE') {
  console.log(`config.app.debuglog = ${process.env.DEBUGLOG}`);
  console.log(`config.db.dbuserid = ${process.env.DBUSERID}`);
  console.log(`config.db.dbpasswd = ${process.env.DBPASSWD}`);
  console.log(`config.db.dbdomain = ${process.env.DBDOMAIN}`);
  console.log(`config.db.dbhost = ${process.env.DBHOST}`);
  console.log(`config.db.dbport = ${process.env.DBPORT}`);
  console.log(`config.db.dbname = ${process.env.DBNAME}`);
  console.log(`config.db.dburl = ${process.env.DBURL}`);
}

module.exports = config;
