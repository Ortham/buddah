Contributing
============

To add a project to the registry, just fork this repository, append a definition for the project to the `data.json` file, and send a pull request to get it included. You'll need a GitHub account to do so.

Any software project related to game modding can be added: a project can be for any game, open or closed source, and in any state of completion. The registry is intended to help reduce the duplication of effort within the games' modding communities, so if it exists, it can be registered!

## Project Definition Format

Project definitions use a JSON structure very similar to those used by [Bower](https://bower.io/) and [NPM](https://www.npmjs.com/):

```
{
  "name": "",
  "keywords": [
    ""
  ],
  "description": "",
  "license": "",
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

Keywords for the project. Keywords are searchable. As a minimum, please supply keywords for the game the software is for, and (if it's not a plugin or extension of some sort) whether it provides a `cli`, `gui` and/or `api`.

### description

Type: `String`

A brief description of the project. This is a searchable field.

### license

Type: `String` or `Array` of `String`

[SPDX license identifier](https://spdx.org/licenses/) or, if the license used has no SPDX identifier, a URL to a license. If the software is licensed under multiple licenses, give them in an array. If no license is specified, omit this field.

### homepage

Type: `String`

The URL for the project's homepage. If the project doesn't have a website, this might be the page from which people can download releases. If the project is only available as source code, omit this field.

### repository

Type: `String`

The URL at which the project's source code can be found. If a version control repository is not available, this might be the page from which an archive containing the source code can be downloaded.
