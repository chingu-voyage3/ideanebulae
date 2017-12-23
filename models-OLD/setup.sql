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
