# IdeaBox

IdeaBox makes it easy for Web Devs to propose ideas and  get feedback from their peers. In the modern world of
Web Development many team members work remotely, often spread across many different geographic locations and
timezones. Not working in the same locations as their peers makes communication hard and can foster a sense of 
isolation. 

Although tools such as instant messaging, email, and teleconferencing address everyday interactions within a team
they are not always the best tool for sharing and reviewing ideas. Instant messaging and email are to fragmented 
and discussions on a given topic are interspersed between other discussions making it difficult to follow a topic 
over time. Furthermore, neither provide adequate security to keep commercial idea secure from prying eyes. 
Teleconferencing is useful for discussion, but not every idea warrants using the team's time for
yet-another-meeting.

IdeaBox seeks to address these gaps by provided Web Devs with the ability to propose ideas, designate an appropriate 
level of security and confidentiality, and to get critical feedback and suggestions on thier ideas from their peers.
Furthermore, IdeaBox supports flexible searching so that over time it is a suitable starting point to determine
whether an idea has already been proposed. 

You can find IdeaBox at [www.tbd.com](http://www.tbd.com).

[Features](#features) | [Development](#development) | [Runtime](#runtime) | [Authors](#authors) |
[License](#license) | [Release Notes](releasenotes.md)


## Features

 - TBD
 
## Development

### Built With

The main libraries used in the development of IdeaBox are Vue, Postgress, and Stylus. For a complete list 
of libraries consult the `package.json` file.

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

### Configuration

The devGaido project folder is organized in the following manner:

```
/ideabox - Application root folder containing global configuration
            and settings files.
  /src - Application source files
    /client - Frontend application source
      /actions - Redux global app action handlers
      /assets - Client asset files
      /pages - One subdirectory for each page containing .jsx files
      /reducers - Redux global app reducer handlers
      /style - Style sheet files
    /server - Backend application source
      /models - Data model files
      /services - Microservices
    /test - Mocha tests and validations of JSON files
      /testdata - Data files designed to exercise the tests and validations
```


## Runtime


## Authors

- [Andres Perez](https://github.com/Oxyrus)
- [Jim Medlock](https://github.com/jdmedlock)
- [Parminder Singh](https://github.com/Trion129)

## License

[MIT](https://tldrlegal.com/license/mit-license)

[ideabox-url]: https://github.com/Chingu-cohorts/Voyage2-bears-27

