# ButterCMS node.js client

[![npm version](https://img.shields.io/npm/v/buttercms.svg)](https://www.npmjs.org/package/buttercms)

## Installation

```
npm install buttercms
```

## Overview

Every resource is accessed via your butter instance:

```js
var butter = require('buttercms')(' your stripe API key ');
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
```

For an example use case see the [example Express.js app](https://github.com/buttercms/express-example).

## Available resources & methods

Where you see params it is a plain js object, e.g. `{page: 1}`

* post
  * `retrieve(slug[, params])`
  * `list([params])`
* category
  * `retrieve(slug[, params])`
  * `list([params])`
* author
  * `retrieve(slug[, params])`
  * `list([params])`
* feed
  * `retrieve(type[, params])`

## Documentation

Documentation is available at https://buttercms.com/docs/api/node
