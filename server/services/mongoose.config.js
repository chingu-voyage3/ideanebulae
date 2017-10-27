import dotenv from 'dotenv';

dotenv.config();

let config = {};
config.db = {};

config.db.host = `${process.env.DBUSERID}:${process.env.DBPASSWD}@ds011732.mlab.com:11732`;
config.db.name = 'ideanebulae';
config.db.mongoURI = `mongodb://${config.db.host}/${config.db.name}`;

console.log(`mongoURI: ${config.db.mongoURI}`);

export default config;
