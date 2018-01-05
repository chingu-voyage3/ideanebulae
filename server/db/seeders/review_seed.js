'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("reviews", [
      {
        idea_id: "6",
        reviewer_id: 1,
        comments: "Woot woot",
        created_at: "2017-11-20 15:36:45.373",
        updated_at: "2017-11-21 17:03:27.119",
      }, {
        idea_id: "2",
        reviewer_id: 3,
        comments: "This idea has merit, but more details are needed to fully understand the associated benefits and costs.",
        created_at: "2017-11-06 10:30:00",
        updated_at: "2017-11-06 18:00:00",
      }, {
        idea_id: "8",
        reviewer_id: 2,
        comments: "This is an awesome idea, but there may be issues with the time necessary to acquire a liquor license.",
        created_at: "2017-11-06 10:30:00",
        updated_at: "2017-11-06 18:00:00",
      }, {
        idea_id: "2",
        reviewer_id: 1,
        comments: "Have you considered rainbow colored empanadas? If not you really should. \n\nWhat is the frequency Kenneth? 42 or 43?",
        created_at: "2017-11-06 10:30:00",
        updated_at: "2017-11-22 14:41:33.385",
      }, {
        idea_id: "1",
        reviewer_id: 1,
        comments: "Can an empanada be stringified?",
        created_at: "2017-11-21 16:50:23.279",
        updated_at: "2017-11-21 16:50:23.279",
      }, {
        idea_id: "9",
        reviewer_id: 4,
        comments: "What about after effects of longterm exposure to gamma ray irradiated empanadas?",
        created_at: "2017-12-05 04:26:56.665",
        updated_at: "2017-12-05 04:26:56.665",
      }, {
        idea_id: "6",
        reviewer_id: 4,
        comments: "Here is another review, will this add???",
        created_at: "2017-12-10 22:42:25.356",
        updated_at: "2017-12-10 22:50:56.247",
      }, {
        idea_id: "10",
        reviewer_id: 3,
        comments: "Will you use a 2-cycle or 4-cycle engine?",
        created_at: "2017-11-06 10:30:00",
        updated_at: "2017-11-06 18:00:00",
      }, {
        idea_id: "6",
        reviewer_id: 4,
        comments: "Test review",
        created_at: "2017-12-10 22:42:30.468",
        updated_at: "2017-12-10 22:42:30.468",
      }, {
        idea_id: "1",
        reviewer_id: 2,
        comments: "How are you going to preserve an empanada forever?",
        created_at: "2017-11-06 10:30:00",
        updated_at: "2017-11-06 18:00:00",
      }, {
        idea_id: "3",
        reviewer_id: 4,
        comments: "It needs more dachshunds",
        created_at: "2017-12-04 02:38:09.023",
        updated_at: "2017-12-04 02:38:09.023",
      }, {
        idea_id: "2",
        reviewer_id: 4,
        comments: "Will this work if i submit a new review???",
        created_at: "2017-12-10 23:31:11.392",
        updated_at: "2017-12-10 23:32:14.873",
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};
