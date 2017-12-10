create user ideanebulae with password 'Columbia*India1';

create schema ideanebulae;

create database ideanebulae
  owner ideanebulae;

create type idea_type as ENUM ('public', 'private', 'commercial');

create table profile (
  user_id         char(16)    not null,
  username        char(30)    not null,
  name            char(30),
  avatar_url      text,
  qualifications  text,
  primary key (user_id)
);

create table idea (
  idea_id         serial      not null,
  creator         char(16)    not null,
  title           char(40)    not null,
  type            idea_type   not null,
  description     text,
  created_ts      timestamp,
  tags            char(16)[],
  primary key (idea_id)
);

create index idea_naturalkey on idea (creator, title, type);
create index idea_tag on idea using gin (tags);

create table agreement (
  agreement_id    serial      not null,
  idea_id         integer     not null,
  agreement_version smallserial,
  creator         char(16)    not null,
  title           char(40)    not null,
  type            idea_type   not null,
  agreement       text        not null,
  primary key (agreement_id, agreement_version)
);

create index agreement_idea on agreement (idea_id);
create index agreement_naturalkey on agreement (creator, title, type);

create table review (
  review_id       serial      not null,
  idea_id         integer     not null,
  creator         char(16)    not null,
  title           char(40)    not null,
  type            idea_type   not null,
  primary key (review_id)
);

create index review_idea on review (idea_id);
create index review_naturalkey on review (creator, title, type);

create table document (
  document_id     serial      not null,
  idea_id         integer     not null,
  creator         char(16)    not null,
  title           char(40)    not null,
  type            idea_type   not null,
  url             text        not null,
  description     text,
  primary key (document_id)
);

create index document_idea on document (idea_id);
create index document_naturalkey on document (creator, title, type);

-- Populate user profile test data
insert into profile ( user_id, username, name, avatar_url, qualifications)
  values ('github|11398826', 'oxyrus', 'Andrés Pérez', 'TBD', 'TBD');
insert into profile ( user_id, username, name, avatar_url, qualifications)
  values ('github|1287072', 'jdmedlock', 'Jim Medlock',
    'https://avatars3.githubusercontent.com/u/1287072?v=4',
    'I love empanadas!');
insert into profile ( user_id, username, name, avatar_url, qualifications)
  values ('github|24995773', 'rifkegribenes', 'Sarah Schneider',
    'https://avatars2.githubusercontent.com/u/24995773?v=4',
    'Designer extrordinaire');
insert into profile ( user_id, username, name, avatar_url, qualifications)
  values ('github|8445249', 'Parminder Singh', null, null, null);

-- Populate idea test data
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|11398826',
    'Empanadas 4 ever',
    'public',
    'Empanadas will conquer the world',
    '2017-10-15 00:00:00',
    '{"domination", "empanada", "eternal"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|8445249', 
    'Empanadas',
    'public',
    'Empanadas',
    '2017-10-15 00:00:00',
    '{"empanada"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|11398826',
    'Dachshund Powered Empanada Factory',
    'private',
    'In order to keep the cost of empanadas low so they can be enjoyed by everyone, regardless of their economic means its important to keep production costs low. To achieve this it is proposed to convert our empanada factory to operate on electricity generated via a dachsund-powered treadmill instead of electricity purchased from a public utility.',
    '2017-11-19 16:39:56.195',
    '{"empanada", "factory", "dachshund"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|1287072',
    'Interstellar Empanadas',
    'private',
    'It is time to share the beauty of the empanada with other extraterrestrial cultures by launching empanadas randomly into space.',
    '2017-11-29 19:00:02.291',
    '{"empanada", "interstellar", "extraterrestrial"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|1287072',
    'Fortune Empanadas',
    'private',
    'They say that imitation is the height of flattery. Chinese Fortune Cookies are such a good idea (and tasty too I might add) so why not Fortune Empanadas',
    '2017-12-06T01:17:02.978',
    '{"empanada", "fortune"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|8445249',
    'Evolution Strategies',
    'public',
    'It would be awesome if bots can learn to dance',
    '2017-11-18T10:46:42.484',
    '{"lol", "haha", "funny", "ha"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|1287072',
    'Turducken Empanada',
    'public',
    'What could be better than an empanada stuffed with a duck, stuffed inside another empanada that is stuffed with a turkey?',
    '2017-11-22T15:06:57.504',
    '{"turducken", "empanada"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|1287072',
    'Pumpkin Ale Empanadas',
    'private',
    'Produce pumpkin ale flavored empanadas in two varieties - 1) a non-alcoholic version and 2) a version with between 5% and 6% ABV. Dietary information will be imprinted on the golden brown covering of each and every empanada.',
    '2017-11-03 00:00:00',
    '{"pumpkin", "empanada"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|1287072',
    'Cold Fusion Powered Empanadas',
    'private',
    'In order to boost the already awesome power of the empanada an even more powerful energy source is required. Hence, the joining of the empanada with the cold fusion reactor powered in turn by the home version of the Large Hadron Collider.',
    '2017-11-15 15:49:29.296',
    '{"empanada", "cold fusion", "high power"}'
  );
insert into idea (creator, title, type, description, created_ts, tags)
  values ('github|8445249',
    'Gas Operated Empanadas',
    'private',
    'Produce gas operated empanadas so the empanadas come to you rather than you having to go to the empanadas.',
    '2017-11-03 00:00:00',
    '{"gas", "empanada"}'
  );

-- Populate agreement test data
insert into agreement (idea_id, creator, title, type, agreement)
  values (8,
    'github|1287072',
    'Pumpkin Ale Empanadas',
    'private',
    'You agree to 1) Eat more empanadas, 2) Refrain from eating, touching, or looking at any other batter coated food product, 3) Spread the good word about the beauty, quiet dignity, and general awesomeness of empanadas to your fellow Earthlings.'
  );
insert into agreement (idea_id, creator, title, type, agreement)
  values (2,
    'github|8445249',
    'Empanadas',
    'public',
    'Agree or else!'
    );
insert into agreement (idea_id, creator, title, type, agreement)
  values (1,
    'github|11398826',
    'Empanadas 4 ever',
    'public',
    'Agree or it will be no empanadas for you!'
  );
insert into agreement (idea_id, creator, title, type, agreement)
  values (10,
    'github|8445249',
    'Gas Operated Empanadas',
    'private',
    'Acceptance of this agreement certifies that you acknowledge Trion as the Supreme Overlord AI and you promise to hold empanadas created by him in reverence for all perpetuity.'  );
insert into agreement (idea_id, creator, title, type, agreement)
  values (9,
    'github|1287072'
    'Cold Fusion Powered Empanadas',
    'private',
    'This agreement binds you to Promise to worship Trion'
  );
insert into agreement (idea_id, creator, title, type, agreement)
  values (4,
    'github|1287072',
    'Interstellar Empanadas',
    'private',
    'This is my own little agreement. Please honor it or there will be no empanadas for you!'
  );
insert into agreement (idea_id, creator, title, type, agreement)
  values (  );