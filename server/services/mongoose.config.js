let config = {};
config.db = {};

config.db.host = `IdeaNebulae:Columbia*India1@ds011732.mlab.com:11732`;
config.db.name = 'ideanebulae';
config.db.mongoURI = `mongodb://${config.db.host}/${config.db.name}`;

export default config;
