'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("profiles", [
      {
        user_id: "github|1287072",
        username: "jdmedlock",
        name: "Jim Medlock",
        avatar_url: "https://avatars3.githubusercontent.com/u/1287072?v=4",
        qualifications: "I love empanadas!",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        user_id: "github|8445249",
        username: "Parminder Singh",
        name: "null",
        avatar_url: "null",
        qualifications: "null",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        user_id: "github|11398826",
        username: "oxyrus",
        name: "Andrés Pérez",
        avatar_url: "TBD",
        qualifications: "TBD",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }, {
        user_id: "github|24995773",
        username: "rifkegribenes",
        name: "Sarah Schneider",
        avatar_url: "https://avatars2.githubusercontent.com/u/24995773?v=4",
        qualifications: "Designer extrordinaire",
        created_at: '2017-12-19 00:00:00',
        updated_at: '2017-12-19 00:00:00'
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('profiles', null, {});
  }
};
