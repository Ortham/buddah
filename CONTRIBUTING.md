Contributing
============

To add a project to the registry, just fork this repository, append a definition for the project to the `data.json` file, and send a pull request to get it included.

Any software project related to game modding can be added: a project can be for any game, open or closed source, and in any state of completion. The registry is intended to help reduce the duplication of effort within the games' modding communities, so if it exists, it can be registered!

## Project Definition Format

Project definitions use the following JSON structure:

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

The `name` key takes a string that is the project's name. This is a searchable field.

### keywords

The `keywords` key takes an array of strings that are searchable keywords for the project.

For example, if the sections for a project are `plugin parsing` and `save file parsing`, the project will be listed if either of those keywords are included in a search.

### description

The `description` key takes a string describing the project, that will be displayed below its name in the list.

### homepage

The `homepage` key takes a string that is the URL for the project's homepage, for example its website or Nexus Mods file entry.

If there is no `repository` value is set, the `homepage` URL will be used as the project's link.

### repository

The `repository` key takes a string that is the URL at which the project's source code can be found. This does not need to be a version control repository: for example, it could be where an archive containing the source code is hosted.

If the `repository` value is set, its value will be used as project's link.
