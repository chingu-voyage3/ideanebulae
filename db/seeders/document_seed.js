'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("documents", [
      {
        idea_id: 7,
        url: "https://google.com",
        description: "https://google.com",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 9,
        url: "https://youtu.be/hjJOAFAriHQ",
        description: "https://youtu.be/hjJOAFAriHQ",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 8,
        url: "https://google.com",
        description: "The search engine of the web",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 6,
        url: "haha.com",
        description: "https://haha.com",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 2,
        url: "https://google.com",
        description: "The search engine of the web",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 6,
        url: "lol.com",
        description: "https://lol.com",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 10,
        url: "https://google.com",
        description: "The search engine of the web",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 6,
        url: "goooogle.com",
        description: "https://goooogle.com",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 1,
        url: "https://google.com",
        description: "The search engine of the web",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('documents', null, {});
  }
};
