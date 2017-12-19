const dotenv = require('dotenv');

dotenv.config();

let config = {};
config.db = {};

config.db.dbuserid = `${process.env.DBUSERID}`;
config.db.dbpasswd = `${process.env.DBPASSWD}`;
config.db.dbdomain = `${process.env.DBDOMAIN}`;
config.db.dbhost = `${process.env.DBHOST}`;
config.db.dbport = `${process.env.DBPORT}`;
config.db.dbname = `${process.env.DBNAME}`;
config.db.dburl = `${process.env.DBURL}`;

module.exports = config;
