# IdeaNebulae

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

You can find IdeaNebulae at [www.tbd.com](http://www.tbd.com).

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

| Command           | Purpose                           |
|:------------------|:----------------------------------|
| yarn start        | Start                             |
| yarn build        | Build application                 |
| yarn build:client | Build client                      |
| yarn build:server | Build server                      |
| yarn dev          | Start development client & server |
| yarn dev:server   | Start development client          |
| yarn dev:client   | Start development server          |
| yarn analyzesize  | Analyze bundle sizes              |
| yarn test         | Initiate tests and validations    |

Note that before starting the server the following environment variables should be
defined:

| Variable Name  | Description                          |
|:---------------|:-------------------------------------|
| DBUSERID       | The user id of the MongoDB instance containing the application data |
| DBPASSWD       | The associated password for the database user id |

For example:
```
   export DBUSERID=userid
   export DBPASSWD=password
```

### Configuration

The IdeaNebulae project folder is organized in the following manner:

| Location         | Purpose                               |
|:-----------------|:--------------------------------------|
| `/build`         | Build files including Webpack files   |
| `/config`        | Application configuration             |
| `/src`           | Application source files              |
| `../assets`      |   App graphics - svg, png, etc.       |
| `../components`  |   App components (Vue)                |
| `../router`      |   App routes (Vue-router)             |
| `../store`       |   App store (Vuex)                    |
| `/static`        | Static files                          |
| `/test`          | Test scripts                          |
| `directory root` | License, readme, index, and package files |



## Runtime


## Authors

- [Andres Perez](https://github.com/Oxyrus)
- [Jim Medlock](https://github.com/jdmedlock)
- [Parminder Singh](https://github.com/Trion129)
- [Sarah Schneider](https://github.com/rifkegribenes)

## License

[MIT](https://tldrlegal.com/license/mit-license)

[ideanebulae-url]: https://github.com/Chingu-cohorts/Voyage2-bears-27
