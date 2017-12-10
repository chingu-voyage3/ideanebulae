import dotenv from 'dotenv';

dotenv.config();

let config = {};
config.db = {};

config.db.dbuserid = `${process.env.DBUSERID}`;
config.db.dbpasswd = `${process.env.DBPASSWD}`;
config.db.dbdomain = `${process.env.DBDOMAIN}`;
config.db.port = `${process.env.DBPORT}`;
config.db.dbname = `${process.env.DBNAME}`;

export default config;