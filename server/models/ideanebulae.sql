create user ideanebulae with password 'Columbia*India1';

create schema ideanebulae;

create database ideanebulae
  owner ideanebulae;

create type idea_type as ENUM ('public', 'private', 'commercial');

create table profile ( 
  user_id         char(64)       not null,
  username        varchar(30)    not null,
  name            varchar(30),
  avatar_url      text,
  qualifications  text,
  primary key (user_id)
);

grant all on table profile to ideanebulae;

create table idea (
  idea_slug       serial      not null,
  creator         char(64)    not null,
  title           char(40)    not null,
  type            idea_type   not null,
  description     text,
  created_ts      timestamp,
  tags            char(40)[],
  primary key (idea_slug)
);

create index idea_naturalkey on idea (creator, title, type);
create index idea_tag on idea using gin (tags);
grant all on table idea to ideanebulae;

create table agreement (
  agreement_slug  serial      not null,
  idea_slug       integer     not null,
  agreement_version smallserial,
  creator         char(64) not null,
  title           char(40) not null,
  type            idea_type   not null,
  agreement       text        not null,
  primary key (agreement_slug, agreement_version)
);

create index agreement_idea on agreement (idea_slug);
create index agreement_naturalkey on agreement (creator, title, type);
grant all on table agreement to ideanebulae;

create table review (
  review_slug     serial      not null,
  idea_slug       integer     not null,
  creator         char(64)    not null,
  title           char(40)    not null,
  type            idea_type   not null,
  reviewer        char(64)    not null,
  assigned_ts     timestamp   not null,
  updated_ts      timestamp   not null,
  comments        text        not null,        
  primary key (review_slug)
);

create index review_idea on review (idea_slug);
create index review_reviewer on review (reviewer_slug);
create index review_naturalkey on review (creator, title, type);
grant all on table review to ideanebulae;

create table document (
  document_slug   serial      not null,
  idea_slug       integer     not null,
  creator         char(64)    not null,
  title           char(40)    not null,
  type            idea_type   not null,
  url             text        not null,
  description     text,
  primary key (document_slug)
);

create index document_idea on document (idea_slug);
create index document_naturalkey on document (creator, title, type);
grant all on table document to ideanebulae;

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
insert into agreement (idea_slug, creator, title, type, agreement)
  values (8,
    'github|1287072',
    'Pumpkin Ale Empanadas',
    'private',
    'You agree to 1) Eat more empanadas, 2) Refrain from eating, touching, or looking at any other batter coated food product, 3) Spread the good word about the beauty, quiet dignity, and general awesomeness of empanadas to your fellow Earthlings.'
  );
insert into agreement (idea_slug, creator, title, type, agreement)
  values (2,
    'github|8445249',
    'Empanadas',
    'public',
    'Agree or else!'
    );
insert into agreement (idea_slug, creator, title, type, agreement)
  values (1,
    'github|11398826',
    'Empanadas 4 ever',
    'public',
    'Agree or it will be no empanadas for you!'
  );
insert into agreement (idea_slug, creator, title, type, agreement)
  values (10,
    'github|8445249',
    'Gas Operated Empanadas',
    'private',
    'Acceptance of this agreement certifies that you acknowledge Trion as the Supreme Overlord AI and you promise to hold empanadas created by him in reverence for all perpetuity.'
  );
insert into agreement (idea_slug, creator, title, type, agreement)
  values (9,
    'github|1287072',
    'Cold Fusion Powered Empanadas',
    'private',
    'This agreement binds you to Promise to worship Trion'
  );
insert into agreement (idea_slug, creator, title, type, agreement)
  values (4,
    'github|1287072',
    'Interstellar Empanadas',
    'private',
    'This is my own little agreement. Please honor it or there will be no empanadas for you!'
  );

-- Populate url document test data 
insert into document (idea_slug, creator, title, type, url, description)
  values (1,
    'github|11398826',
    'Empanadas 4 ever',
    'public',
    'https://google.com',
    'The search engine of the web'
  );
insert into document (idea_slug, creator, title, type, url, description)
  values (2,
    'github|8445249',
    'Empanadas',
    'public',
    'https://google.com',
    'The search engine of the web'
  );
insert into document (idea_slug, creator, title, type, url, description)
  values (6,
    'github|8445249',
    'Evolution Strategies',
    'public',
    'lol.com',
    'https://lol.com'
  );
insert into document (idea_slug, creator, title, type, url, description)
  values (6,
    'github|8445249',
    'Evolution Strategies',
    'public',
    'haha.com',
    'https://haha.com'
  );
insert into document (idea_slug, creator, title, type, url, description)
  values (6,
    'github|8445249',
    'Evolution Strategies',
    'public',
    'goooogle.com',
    'https://goooogle.com'
  );
insert into document (idea_slug, creator, title, type, url, description)
  values (7,
    'github|1287072',
    'Turducken Empanada',
    'public',
    'https://google.com',
    'https://google.com'
  );
insert into document (idea_slug, creator, title, type, url, description)
  values (8,
    'github|1287072',
    'Pumpkin Ale Empanadas',
    'private',
    'https://google.com',
    'The search engine of the web'
  );
insert into document (idea_slug, creator, title, type, url, description)
  values (9,
    'github|1287072',
    'Cold Fusion Powered Empanadas',
    'private',
    'https://youtu.be/hjJOAFAriHQ',
    'https://youtu.be/hjJOAFAriHQ'
  );
insert into document (idea_slug, creator, title, type, url, description)
  values (10,
    'github|8445249',
    'Gas Operated Empanadas',
    'private',
    'https://google.com',
    'The search engine of the web'
  );

-- Populate review test data
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (1,
    'github|11398826',
    'Empanadas 4 ever',
    'public',
    'github|8445249',
    '2017-11-06 10:30:00',
    '2017-11-06 18:00:00',
    'How are you going to preserve an empanada forever?'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (1,
    'github|11398826',
    'Empanadas 4 ever',
    'public',
    'github|1287072',
    '2017-11-21 16:50:23.279',
    '2017-11-21 16:50:23.279',
    'Can an empanada be stringified?'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (2,
    'github|8445249',
    'Empanadas',
    'public',
    'github|11398826',
    '2017-11-06 10:30:00',
    '2017-11-06 18:00:00',
    'This idea has merit, but more details are needed to fully understand the associated benefits and costs.'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (2,
    'github|8445249',
    'Empanadas',
    'public',
    'github|1287072',
    '2017-11-06 10:30:00',
    '2017-11-22 14:41:33.385',
    'Have you considered rainbow colored empanadas? If not you really should. \n\nWhat is the frequency Kenneth? 42 or 43?'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (2,
    'github|8445249',
    'Empanadas',
    'public',
    'github|24995773',
    '2017-12-10 23:31:11.392',
    '2017-12-10 23:32:14.873',
    'Will this work if i submit a new review???'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (3,
    'github|11398826',
    'Dachshund Powered Empanada Factory',
    'private',
    'google-oauth2|104752550062603565419',
    '2017-12-04 02:38:09.023',
    '2017-12-04 02:38:09.023',
    'It needs more dachshunds'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (6,
    'github|8445249',
    'Evolution Strategies',
    'public',
    'github|1287072',
    '2017-11-20 15:36:45.373',
    '2017-11-21 17:03:27.119',
    'Woot woot'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (6,
    'github|8445249',
    'Evolution Strategies',
    'public',
    'github|24995773',
    '2017-12-10 22:42:25.356',
    '2017-12-10 22:50:56.247',
    'Here is another review, will this add???'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (6,
    'github|8445249',
    'Evolution Strategies',
    'public',
    'github|24995773',
    '2017-12-10 22:42:30.468',
    '2017-12-10 22:42:30.468',
    'Test review'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (8,
    'github|1287072',
    'Pumpkin Ale Empanadas',
    'private',
    'github|8445249',
    '2017-11-06T10:30:00',
    '2017-11-06T18:00:00',
    'This is an awesome idea, but there may be issues with the time necessary to acquire a liquor license.'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (9,
    'github|1287072',
    'Cold Fusion Powered Empanadas',
    'private',
    'github|20404311',
    '2017-12-05 04:26:56.665',
    '2017-12-05 04:26:56.665',
    'What about after effects of longterm exposure to gamma ray irradiated empanadas?'
  );
insert into review (idea_slug, creator, title, type, 
            reviewer_slug, assigned_ts, updated_ts, comments)
  values (10,
    'github|8445249',
    'Gas Operated Empanadas',
    'private',
    'github|11398826',
    '2017-11-06 10:30:00',
    '2017-11-06 18:00:00',
    'Will you use a 2-cycle or 4-cycle engine?'
  );
