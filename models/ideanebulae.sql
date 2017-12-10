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
  agreement_id    integer,
  tags            char(16)[],
  primary key (idea_id)
);

create index idea_naturalkey on idea (creator, title, type);
create index idea_agreement on idea (agreement_id);
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


insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|11398826',
    'Empanadas 4 ever',
    'public',
    'Empanadas will conquer the world',
    '2017-10-15 00:00:00',
    null,
    '{"domination", "empanada", "eternal"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|8445249', 
    'Empanadas',
    'public',
    'Empanadas',
    '2017-10-15 00:00:00',
    null,
    '{"empanada"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|11398826',
    'Dachshund Powered Empanada Factory',
    'private',
    'In order to keep the cost of empanadas low so they can be enjoyed by everyone, regardless of their economic means its important to keep production costs low. To achieve this it is proposed to convert our empanada factory to operate on electricity generated via a dachsund-powered treadmill instead of electricity purchased from a public utility.',
    '2017-11-19 16:39:56.195',
    null,
    '{"empanada", "factory", "dachshund"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|1287072',
    'Interstellar Empanadas',
    'private',
    'It is time to share the beauty of the empanada with other extraterrestrial cultures by launching empanadas randomly into space.',
    '2017-11-29 19:00:02.291',
    null,
    '{"empanada", "interstellar", "extraterrestrial"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|1287072',
    'Fortune Empanadas',
    'private',
    'They say that imitation is the height of flattery. Chinese Fortune Cookies are such a good idea (and tasty too I might add) so why not Fortune Empanadas',
    '2017-12-06T01:17:02.978',
    null,
    '{"empanada", "fortune"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|8445249',
    'Evolution Strategies',
    'public',
    'It would be awesome if bots can learn to dance',
    '2017-11-18T10:46:42.484',
    null,
    '{"lol", "haha", "funny", "ha"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|1287072',
    'Turducken Empanada',
    'public',
    'What could be better than an empanada stuffed with a duck, stuffed inside another empanada that is stuffed with a turkey?',
    '2017-11-22T15:06:57.504',
    null,
    '{"turducken", "empanada"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|1287072',
    'Pumpkin Ale Empanadas',
    'private',
    'Produce pumpkin ale flavored empanadas in two varieties - 1) a non-alcoholic version and 2) a version with between 5% and 6% ABV. Dietary information will be imprinted on the golden brown covering of each and every empanada.',
    '2017-11-03 00:00:00',
    null,
    '{"pumpkin", "empanada"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|1287072',
    'Cold Fusion Powered Empanadas',
    'private',
    'In order to boost the already awesome power of the empanada an even more powerful energy source is required. Hence, the joining of the empanada with the cold fusion reactor powered in turn by the home version of the Large Hadron Collider.',
    '2017-11-15 15:49:29.296',
    null,
    '{"empanada", "cold fusion", "high power"}'
  );
insert into idea (creator, title, type, description, created_ts, agreement_id, tags)
  values ('github|8445249',
    'Gas Operated Empanadas',
    'private',
    'Produce gas operated empanadas so the empanadas come to you rather than you having to go to the empanadas.',
    '2017-11-03 00:00:00',
    null,
    '{"gas", "empanada"}'
  );
