# IdeaNebulae
[![Waffle.io - Columns and their card count](https://badge.waffle.io/chingu-coders/Voyage2-Bears-27.svg?columns=all)](https://waffle.io/chingu-coders/Voyage2-Bears-27)

IdeaNebulae makes it easy for Web Devs to propose ideas and  get feedback from
their peers. In the modern world of Web Development many team members work
remotely, often spread across many different geographic locations and
timezones. Not working in the same locations as their peers makes communication
hard and can foster a sense of isolation. 

Although tools such as instant messaging, email, and teleconferencing address
everyday interactions within a team they are not always the best tool for
sharing and reviewing ideas. Instant messaging and email are to fragmented 
and discussions on a given topic are interspersed between other discussions
making it difficult to follow a topic over time. Furthermore, neither provide
adequate security to keep commercial idea secure from prying eyes. Teleconferencing
is useful for discussion, but not every idea warrants using the team's time
for yet-another-meeting.

IdeaNebulae seeks to address these gaps by provided Web Devs with the ability
to propose ideas, designate an appropriate level of security and
confidentiality, and to get critical feedback and suggestions on thier ideas
from their peers. Furthermore, IdeaNebulae supports flexible searching so that
over time it is a suitable starting point to determine whether an idea has
already been proposed. 

You can find IdeaNebulae at [ideanebulae.herokuapp.com](http://ideanebulae.herokuapp.com).

[Features](#features) | [Development](#development) | [Runtime](#runtime) | [Authors](#authors) |
[License](#license) | [Release Notes](releasenotes.md)


## Features

 - TBD
 
## Development

### Built With

The main libraries used in the development of IdeaNebulae are shown in the
following table. For a complete list of libraries consult the `package.json`
file.

| Library                                        | Purpose                      | 
|:-----------------------------------------------|:-----------------------------|
| [Airbnb](https://github.com/airbnb/javascript) | Javascript dev. standards    |
| [Karma](https://karma-runner.github.io )       | Test Runner                  |
| [Mocha](https://mochajs.org)                   | Test Framework               |
| [Nightwatch](https://nightwatchjs.org)         | Browser Testing Framework    |
| [Mongo](https://mongodb.com )                  | Server DBMS                  |
| [Stylus](https://stylus-lang.com )             | CSS preprocessor             |
| [Vue](https://vuejs.org)                       | Frontend framework           |
| [Vue-Router](https://router.vuejs.org)         | Renderer                     |
| [Vuex](https://vuex.vuejs.org)                 | State mgt. pattern + library |

### Git Branches

- master: Only updated from PR's from the development branch for release. This
branch always reflects the current production release.
- development: Reflects the candidate code for the next release. Developers
work in developer branches, which are then pulled into this branch. All code
pulled into this branch must be tested and undergo peer review as part of the
PR process.
- developer branches: Are individual branches created by each developer when
they are working on changes and bug fixes. There are 4 basic types of branches: 
bug, feature, refactor and style, after the type comes the name, it should 
specify on top of the branch type. For example feature/course-review. Consult
the wiki for more details and examples.

### Usage

| Command                       | Purpose                           |
|:------------------------------|:----------------------------------|
| `npm run-script start`        | Start                             |
| `npm run-script build`        | Build application                 |
| `npm run-script build:client` | Build client                      |
| `npm run-script build:server` | Build server                      |
| `npm run-script dev`          | Start development client & server |
| `npm run-script dev:server`   | Start development client          |
| `npm run-script dev:client`   | Start development server          |
| `npm run-script analyzesize`  | Analyze bundle sizes              |
| `npm run-script test`         | Initiate tests and validations    |

### Configuration

The IdeaNebulae project folder is organized in the following manner:

| Location           | Purpose                                   |
|:-------------------|:------------------------------------------|
| `directory root`   | License, readme, index, and package files |
| `/client`          | Client Services component                 |
| `../build`         | Build files including Webpack files       |
| `../config`        | Application configuration                 |
| `../src`           | Application source files                  |
| `../../api`        | App API interface to API Server (axios)   |
| `../../assets`     | App graphics - svg, png, etc.             |
| `../../auth`       | App authentication (Auth0)                |
| `../../components` | App components (Vue)                      |
| `../../router`     | App routes (Vue-router)                   |
| `../../store`      | App store (Vuex)                          |
| `../../utils`      | App utility functions                     |
| `../../static`     | Static files                              |
| `../../test`       | Test scripts                              |
| `/server`          | API Server component                      |
| `../documentation` | Documentation files including images      |
| `../models`        | DB schemas and manipulation functions (Mongoose/Mongo) |
| `../router`        | API route definitions                     |
| `../utils`         | Utility functions                         |

## Development Environment

Before starting the server in your local development environment the following
environment variables should be defined:

| Variable Name  | Description                          |
|:---------------|:-------------------------------------|
| `DBUSERID`       | User id of the MongoDB instance containing the application data |
| `DBPASSWD`       | Associated password for the database user id |

This is accomplished by including the following in the `.env` files located in
the root of the server directory. The `.env` file must never be
uploaded to GitHub since it contains application sensitive information such
as user id's and passwords for service accounts.

The `/server/.env` file must contain the following: 
```
# MongoDB Authentication 
DBUSERID=userid
DBPASSWD=password
```

## Runtime

![IdeaNebulae Runtime Architecture](https://github.com/chingu-coders/Voyage2-Bears-27/blob/refactor/server-deploy/server/documentation/IdeaNebulae%20Runtime%20Architecture.jpg)

### Heroku Deployment

Since the application consists of a single git repo, but two runtime
servers `git subtree push` is used to push one part of the repo to the Client
Services app (ideanebulae) on Heroku and a second part of the repo to the API
Server app (ideanebulaeas) also on Heroku. Doing this requires setting up two
separate git remote names for these two destinations and using the `--prefix`
option of the `git subtree push` command to identify specifically which two
parts of the repo are to be pushed.

#### Initial Setup

These steps are to be executed once for each computer the app will be 
deployed from.

| Command                             | Comments                              |
|:------------------------------------|:--------------------------------------|
| `cd local-repo-root-directory`   | Navigate to your apps root directory, where your local git repo resides, on your PC |
| `heroku login` | Remotely login to Heroku |
| `heroku git:remote -a ideanebulae` | Set up git repo in Heroku for the Client Services component |
| `git remote add ideanebulae https://git.heroku.com/ideanebulae.git` | Define a name in the local repo for the Client Services repo on Heroku |
| `heroku git:remote -a ideanebulaeas` | Set up git repo in Heroku for the API Server component |
| `git remote add ideanebulaeas https://git.heroku.com/ideanebulaeas.git` | Define a name in the local repo for the API Server repo on Heroku |
| `git remote -v` | Verify the remote names have been established |
| `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs -a ideanebulae` | Define the Client Services component as a NodeJS app |
| `heroku buildpacks --app ideanebulae | Verify ideanebulae is a NodeJS app` |
| `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs -a ideanebulaeas`| Define the API Server component as a NodeJS app |
| `heroku buildpacks --app ideanebulaeas` | Verify ideanebulaeas is a NodeJS app |
| | |
| `heroku config:set AUDIENCE=https://ideanebulae.auth0.com/api/v2/ --app ideanebulae` | Setup Heroku configuration variables for the Client Services component |
| `heroku config:set CLIENT_DOMAIN=ideanebulae.auth0.com --app ideanebulae` | |
| `heroku config:set CLIENT_ID=xxxxxxxxxxxxxxxxxxxx --app ideanebulae` | |
| `heroku config:set NODE_ENV=production --app ideanebulae` | |
| `heroku config:set NPM_CONFIG_PRODUCTION=true --app ideanebulae` | |
| `heroku config:set REDIRECT=https://ideanebulae.herokuapp.com/callback --app ideanebulae` | |
| `heroku config:set SCOPE=openid --app ideanebulae` | |
| `heroku config:set API_HOST=http://ideanebulaeas.herokuapp.com/api --app ideanebulae` | |
| `heroku config --app ideanebulae` | Verify the config variables have been set |
| | |
| `heroku config:set DBPASSWD=xxxxxxxxxxxxxxxxxxxx --app ideanebulaeas` | Setup Heroku configuration variables for the API Server component |
| `heroku config:set DBUSERID=xxxxxxxx --app ideanebulaeas` | |
| `heroku config:set NODE_ENV=production --app ideanebulaeas` | |
| `heroku config:set NPM_CONFIG_PRODUCTION=true --app ideanebulaeas` | |
| `heroku config --app ideanebulaeas` | Verify the config variables have been set |

#### Deployment Steps

Follow these steps each time you wish to deploy a new release of the application
to Heroku. It is assumed that you will be deploying from your `development`
branch in Github. If this is not the case then some modification will be
required to the steps below.

| Objective       | Command            | Comments                    |
|:----------------|:-------------------|:----------------------------|
| Prepare the Client Services | `cd client` | Build the Client Services app component | 
| | `npm run-script build` |
| Prepare the API Server | `cd server` | Build the API Server app component |
| | `npm run-script build` |
| Commit changes to your local repo | `cd local-repo-root-directory` | Ensure that you have the current app source for the branch you wish to deploy |
| | `git checkout development` | Add any changes you have made and commit to your local branch |
| | `git pull origin development` | |
| | `git add .` | |
| | `git commit -m "Deploy to Heroku"` | |
| Deploy to Heroku | `heroku login` | Login to establish a connection between your PC and your apps on Heroku |
| | `git subtree push --prefix=client ideanebulae master` | Push the client and server portions of the app to the corresponding Heroku app |
|| `git subtree push --prefix=server ideanebulaeas master` | |

## Authors

- [Andres Perez](https://github.com/Oxyrus)
- [Jim Medlock](https://github.com/jdmedlock)
- [Parminder Singh](https://github.com/Trion129)
- [Sarah Schneider](https://github.com/rifkegribenes)

## License

[MIT](https://tldrlegal.com/license/mit-license)

[ideanebulae-url]: https://github.com/Chingu-cohorts/Voyage2-bears-27
