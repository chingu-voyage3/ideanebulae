// Constants required by virtual typeCode field getter and setter
//
// Due to they way the app is deployed to Heroku this file is a duplicate
// of the one located at /server/db/misc/ideaConstants.js. This is because the
// client and server parts of the application are deployed to different Heroku
// Dynos and there is no shared file system.
//
// TODO: Find a way to single source these constants across both the client and
// server components of the application.
const PUBLIC_IDEA = 0;
const PRIVATE_IDEA = 1;
const COMMERCIAL_IDEA = 2;
const IDEA_TYPES = [
  { type: PUBLIC_IDEA, name: 'public' },
  { type: PRIVATE_IDEA, name: 'private' },
  { type: COMMERCIAL_IDEA, name: 'commercial' },
];

export { PUBLIC_IDEA, PRIVATE_IDEA, COMMERCIAL_IDEA, IDEA_TYPES };
