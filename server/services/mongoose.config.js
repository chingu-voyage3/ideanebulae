let config = {};
config.db = {};

config.db.host = `${process.env.DBUSERID}:${process.env.DBPASSWD}.mlab.com:11732`;
config.db.name = 'ideanebulae';
config.db.mongoURI = `mongodb://${config.db.host}/${config.db.name}`;

export default config;
