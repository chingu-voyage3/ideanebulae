import dotenv from 'dotenv';

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

console.log('Configuration Variables:');
console.log(`config.db.dbuserid: ${config.db.dbuserid}`);
console.log(`config.db.dbpasswd: ${config.db.dbpasswd}`);
console.log(`config.db.dbdomain: ${config.db.dbdomain}`);
console.log(`config.db.dbhost: ${config.db.dbhost}`);
console.log(`config.db.dbport: ${config.db.dbport}`);
console.log(`config.db.dbname: ${config.db.dbname}`);
console.log(`config.db.dburl: ${config.db.dburl}`);

export default config;