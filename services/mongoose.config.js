let config = {};
config.db = {};

config.db.host = `${process.env.DBUSERID}:${process.env.DBPASSWD}@ds011732.mlab.com:11732`;
config.db.name = 'ideanebulae';
config.db.mongoURI = `mongodb://${config.db.host}/${config.db.name}`;

module.exports = config;