Contributing
============

To add a project to the registry, just fork this repository, append a definition for the project to the `data.json` file, and send a pull request to get it included. You'll need a GitHub account to do so.

Any software project related to game modding can be added: a project can be for any game, open or closed source, and in any state of completion. The registry is intended to help reduce the duplication of effort within the games' modding communities, so if it exists, it can be registered!

## Project Definition Format

Project definitions use a JSON structure very similar to those used by [Bower](http://bower.io/) and [NPM](https://www.npmjs.com/):

```
{
  "name": "",
  "keywords": [
    ""
  ],
  "description": "",
  "homepage": "",
  "repository": ""
}
```

The `name` and `keywords` keys are required, and the `keywords` array must contain at least one element. The other keys can be omitted if there is no content to set their values to.

### name

Type: `String`

The project's name. This is a searchable field.

### keywords

Type: `Array` of `String`

Keywords for the project. Keywords are searchable.

### description

Type: `String`

A brief description of the project. This is a searchable field.

### homepage

Type: `String`

The URL for the project's homepage. If the project doesn't have a website, this might be the page from which people can download releases. If the project is only available as source code, omit this field.

### repository

Type: `String`

The URL at which the project's source code can be found. If a version control repository is not available, this might be the page from which an archive containing the source code can be downloaded.
