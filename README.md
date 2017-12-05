# hypermedia UI
This is an experimental UI to generically process Siren speaking Https servers.

#Todo List
Clean up all the code todos :)

## UI

- use rel of hypermedia links to name breadcrums buttons -> add to ApiPath
- fold action form by default to save screen space
- breadcrums:  for query pagination use a drop down button containing all with same url but different query string to save space

## BUGS
- always send siren accept header 

## Features
- Detect if link leads to a html site. Open this page in a new tab e.g. example.com navigation in carshack
- Config Dialog:
  - default api on main page
  - developer configs: show empty sections, show classes, show raw tab

- Read selflink and place a refresh button on entities, this could be the first link to extract from default rendering
- Add copy self link button "coyp entity ref" so if action needs are reference it is easy to copy. Also for embedded entities
- Add copy button to arbitary links
- Add warning are where messages can be shown, maybe console like
- Read default siren action with parameters (form encoded): option: generate schema and feed it to the form generator
- Authorization/Authentification support

## Code
- Refactor breadcrum into own control
- Update to Angular 5.0
- self host material icon font so it is off line enabled (demos!!)

## Class based Controlls
- research: loadable form remote on runtime
