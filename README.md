# Hypermedia UI
This is an *experimental* UI to generically process Siren speaking http servers.
Note that it is developed to access Siren APIs which format Actions using a accessable class link which delivers a JsonSchema.

This Client is (for now) designed to work with the [WebApiHypermediaExtensions project](https://github.com/bluehands/WebApiHypermediaExtensions).
Use the demoserver "CarShack" from this project to have a quick compliant backend.

There will be bugs and it is not very fault tollerant. Be nice to the UI :)

There is a demo deployment for testing:
[demo](https://mathiasreichardt.github.io/HypermediaUiDemo/)

# Todo List
Clean up all the code todos :)

- move to newest angular and rx version

## UI
- Use rel of hypermedia links to name breadcrums buttons -> add to ApiPath
- Breadcrums:  for query pagination in ApiPath use a drop down button containing all with same url but different query string to save space

## BUGS
- angular2-json-schema-form: 0.7.0-alpha.1 leaves schema version in schema object when translating from schema 4 to 6.
  Until fixed the schema version is removed before passing on.

## Features
- Support standard Siren actions (at the moment only WebapiHypermediaExtensions style Actions) with parameters (form encoded): option: generate schema and feed it to the form generator
- Detect if link leads to a html site. Open this page in a new tab e.g. example.com navigation in carshack
- Config Dialog:
  - default api on main page
  - developer configs: show empty sections, show classes, show raw tab
  - store user config in a cookie

- Read selflink and place a refresh button on entities, this could be the first link to extract from default rendering
- Add copy button to arbitary links
- Add warning are where messages can be shown, maybe console like

- Authorization/Authentification support
  - basic authentification
  - JSON Web Tokens (+ OAuth?)

- Add option to add custom headers using the config

- make more pretty look for nested objects and lists

## Code
- Refactor breadcrum into own control
- Self host material icon font so it is off line enabled (demos!)

## Class based Controlls
- Research: loadable components from remotes at runtime
