# json-timeline

## Overview

Generate Interactive Timelines stored in JSON Advents with Tags.

## Usage

To install the command-line application:

```shell
npm install json-timeline
```

To use the command-line application:

```shell
json-timeline path/to/advents/ path/to/output/ [vf]
```

### Process

Advents are loaded from the `path/to/advents` directory to generate a HTML/CSS/JS template (`index.html`, `index.css`, `index.js`, `renderAdvents.js`, `advents.js`) in the `path/to/output` directory. Existing files that clash names with the generated files will not be overwritten by default except for `advents.js`.

### Arguments

Argument           | Description
-------------------|--------------------------------------------
`path/to/advents/` | Path to Advents Directory
`path/to/output/`  | Path to Output Directory
`[vf]`             | `v`: verbose logging, `f`: force overwrites

## Advents

Advents represent events in the timeline that each include a mandatory start date, title, content, and tags. An optional end date can also be supplied to change the date range in the rendered Advent DOM.

Advents are stored as JSON objects in `*.advent.json` files or default exports of `*.advent.js` files in a directory specified in `path/to/advents/`.

The Advent Schema can be found in [`schemas.js`](./src/schema/schemas.js):

```javascript
// AdventSchema
{
  "start": DateSchema,
  "end?": DateSchema,
  "title": String,
  "content": String,
  "tags": Array.of(String)
}
// DateSchema
{
  "month": Number,
  "day": Number,
  "year": Number
}
```

Examples of Advents can be found in [`tst/example/`](./tst/example/).

## Customization

By default, json-timeline generates a basic template that can be deployed as a static site (such as on GitHub pages). The template files can be edited safely after they have been generated once since running json-timeline again will not overwrite the edited files by default.

- `index.html` provides a minimal HTML file
- `index.css` provides styling for the rendered HTML
- `index.js` is the entry point of the javascript
- `renderedAdvents.js` dynamically generates HTML
- `advents.js` provides the Advents and Tags and should NOT be edited

As reference for writing custom HTML/CSS/JS extending the template, minimal HTML are listed below.

### Timeline

```html
<body>
  <!-- Timeline Title -->
  <p class="timeline mono-text">Timeline</p>
  <!-- Tag Toggles -->
  <nav></nav>
  <!-- Advent Groups -->
  <main></main>
</body>
```

### Tag Toggles DOM

```html
<nav>
  <!-- Tag Toggles Label and Visibility Toggler -->
  <p class="toggle-container-title mono-text">Tags [▼]</p>
  <!-- Tag Toggles Container -->
  <div class="toggles-container hidden"></div>
</nav>
```

### Tag Toggle DOM

```html
<div class="toggles-container hidden">
  <!-- Tag Toggle Container -->
  <div class="toggle-container">
    <!-- Tag Toggle Checkbox -->
    <input type="checkbox" checked="true" class="tag-toggle">
    <!-- Tag Toggle Label -->
    <label class="tag-toggle-label mono-text">Tag Name</label>
  </div>
</div>
```

### Advent Group DOM

```html
<main>
  <!-- Advent Group -->
  <div class="group">
    <!-- Advent Group Date and Visibility Toggler -->
    <p class="group-date mono-text">1/1/1970 [▼]</p>
    <!-- Advent Group Container -->
    <div class="advents hidden"></div>
  </div>
</main>
```

### Advent DOM

```html
<div class="advents hidden">
  <!-- Advent -->
  <div class="advent">
    <!-- Advent Title -->
    <p class="title mono-text">Advent Title</p>
    <!-- Advent Date Range -->
    <p class="date mono-text">1/1/1970</p>
    <!-- Advent Tags -->
    <p class="tags mono-text">Tags:Tag1,Tag2</p>
    <!-- Advent Content -->
    <p class="content read-text">Output content here.</p>
  </div>
</div>
```
