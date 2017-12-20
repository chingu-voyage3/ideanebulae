'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("ideas", [
      {
        id: 4,
        profile_id: "github|1287072",
        title: "Interstellar Empanadas",
        type: "private",
        description: "It is time to share the beauty of the empanada with other extraterrestrial cultures by launching empanadas randomly into space.",
        created_ts: "2017-11-29 19:00:02.291",
        tags: ["empanada        ", "interstellar    ", "extraterrestrial"]
      }, {
        id: 9,
        profile_id: "github|1287072",
        title: "Cold Fusion Powered Empanadas",
        type: "private",
        description: "In order to boost the already awesome power of the empanada an even more powerful energy source is required. Hence, the joining of the empanada with the cold fusion reactor powered in turn by the home version of the Large Hadron Collider.",
        created_ts: "2017-11-15 15:49:29.296",
        tags: ["empanada        ", "cold fusion     ", "high power      "]
      }, {
        id: 2,
        profile_id: "github|8445249",
        title: "Empanadas",
        type: "public",
        description: "Empanadas",
        created_ts: "2017-10-15 00:00:00",
        tags: ["empanada        "]
      }, {
        id: 6,
        profile_id: "github|8445249",
        title: "Evolution Strategies",
        type: "public",
        description: "It would be awesome if bots can learn to dance",
        created_ts: "2017-11-18 10:46:42.484",
        tags: ["lol             ", "haha            ", "funny           ", "ha              "]
      }, {
        id: 7,
        profile_id: "github|1287072",
        title: "Turducken Empanada",
        type: "public",
        description: "What could be better than an empanada stuffed with a duck, stuffed inside another empanada that is stuffed with a turkey?",
        created_ts: "2017-11-22 15:06:57.504",
        tags: ["turducken       ","empanada        "]
      }, {
        id: 10,
        profile_id: "github|8445249",
        title: "Gas Operated Empanadas",
        type: "private",
        description: "Produce gas operated empanadas so the empanadas come to you rather than you having to go to the empanadas.",
        created_ts: "2017-11-03 00:00:00",
        tags: ["gas             ","empanada        "]
      }, {
        id: 8,
        profile_id: "github|1287072",
        title: "Pumpkin Ale Empanadas",
        type: "private",
        description: "Produce pumpkin ale flavored empanadas in two varieties - 1) a non-alcoholic version and 2) a version with between 5% and 6% ABV. Dietary information will be imprinted on the golden brown covering of each and every empanada.",
        created_ts: "2017-11-03 00:00:00",
        tags: ["pumpkin         ","empanada        "]
      }, {
        id: 1,
        profile_id: "github|11398826",
        title: "Empanadas 4 ever",
        type: "public",
        description: "Empanadas will conquer the world",
        created_ts: "2017-10-15 00:00:00",
        tags: ["domination      ","empanada        ","eternal         "]
      }, {
        id: 5,
        profile_id: "github|1287072",
        title: "Fortune Empanadas",
        type: "private",
        description: "They say that imitation is the height of flattery. Chinese Fortune Cookies are such a good idea (and tasty too I might add) so why not Fortune Empanadas",
        created_ts: "2017-12-06 01:17:02.978",
        tags: ["empanada        ","fortune         "]
      }, {
        id: 3,
        profile_id: "github|11398826",
        title: "Dachshund Powered Empanada Factory",
        type: "private",
        description: "In order to keep the cost of empanadas low so they can be enjoyed by everyone, regardless of their economic means its important to keep production costs low. To achieve this it is proposed to convert our empanada factory to operate on electricity generated via a dachsund-powered treadmill instead of electricity purchased from a public utility.",
        created_ts: '2017-11-19 16:39:56.195',
        tags: ["empanada        ","factory         ","dachshund       "]
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ideas', null, {});
  }
};
