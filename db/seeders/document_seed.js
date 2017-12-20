'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("documents", [
      {
        idea_id: 7,
        profile_id: 1,
        title: "Turducken Empanada",
        idea_type: "public",
        url: "https://google.com",
        description: "https://google.com",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 9,
        profile_id: 1,
        title: "Cold Fusion Powered Empanadas",
        idea_type: "private",
        url: "https://youtu.be/hjJOAFAriHQ",
        description: "https://youtu.be/hjJOAFAriHQ",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 8,
        profile_id: 1,
        title: "Pumpkin Ale Empanadas",
        idea_type: "private",
        url: "https://google.com",
        description: "The search engine of the web",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 6,
        profile_id: 2,
        title: "Evolution Strategies",
        idea_type: "public",
        url: "haha.com",
        description: "https://haha.com",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 2,
        profile_id: 2,
        title: "Empanadas",
        idea_type: "public",
        url: "https://google.com",
        description: "The search engine of the web",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 6,
        profile_id: 2,
        title: "Evolution Strategies",
        idea_type: "public",
        url: "lol.com",
        description: "https://lol.com",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 10,
        profile_id: 2,
        title: "Gas Operated Empanadas",
        idea_type: "private",
        url: "https://google.com",
        description: "The search engine of the web",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 6,
        profile_id: 2,
        title: "Evolution Strategies",
        idea_type: "public",
        url: "goooogle.com",
        description: "https://goooogle.com",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        idea_id: 1,
        profile_id: 3,
        title: "Empanadas 4 ever",
        idea_type: "public",
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
