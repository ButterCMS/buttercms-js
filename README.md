# ButterCMS node.js client

[![npm version](https://img.shields.io/npm/v/buttercms.svg)](https://www.npmjs.org/package/buttercms)

## Installation

Requires node.js version 4 or greater.

```
npm install buttercms
```

## Overview

Every resource is accessed via your butter instance:

```js
var butter = require('buttercms')(' your butter API token ');
```

Every resource method returns a promise:

```js
butter.post.list({page: 1, page_size: 10})
  .then(function(response) {
    console.log(response)
  }).catch(function(response) {
    console.log(response)
  });


butter.post.retrieve("hello-world")
  .then(function(response) {
    console.log(response)
  }).catch(function(response) {
    console.log(response)
  });

// Try our new custom content feature
butter.content.retrieve(["homepage_html_title", "homepage_meta_description"])
  .then(function(response) {
    console.log(response)
  }).catch(function(response) {
    console.log(response)
  });
```

See our [node app](https://github.com/buttercms/node-example) for a full example.

## Available resources & methods

Where you see params it is a plain js object, e.g. `{page: 1}`

* post
  * `retrieve(slug[, params])`
  * `list([params])`
  * `search(query[, params])`
* category
  * `retrieve(slug[, params])`
  * `list([params])`
* author
  * `retrieve(slug[, params])`
  * `list([params])`
* feed
  * `retrieve(type[, params])`
* content
  * `retrieve(keys)`

## Documentation

Documentation is available at https://buttercms.com/docs/api/node
