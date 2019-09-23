# ButterCMS JS client

[![npm version](https://img.shields.io/npm/v/buttercms.svg)](https://www.npmjs.org/package/buttercms)

## Documentation

For a comprehensive list of examples, check out the [API documentation](https://buttercms.com/docs/api/).

## Installation

Requires node.js version 4 or greater.

```
npm install buttercms --save
```

Butter can also be included directly in HTML:

```html
<script src="https://cdnjs.buttercms.com/buttercms-1.1.4.min.js"></script>
```

## Overview

Every resource is accessed via your butter instance:

```js
var butter = require('buttercms')('api_token_567abe');
```

Using ES6:

```js
import Butter from 'buttercms';
const butter = Butter('api_token_567abe');
```

Using TypeScript:

```js
import Butter = require('buttercms');
const butter = Butter('api_token_567abe');
```

Using CDN:

```html
<script>
  var butter = Butter('api_token_567abe');
</script>
```

Every resource method returns a promise:

```js
// Get blog posts
butter.post.list({page: 1, page_size: 10}).then(function(response) {
  console.log(response)
})
```

## Pages

Where you see params it is a plain js object, e.g. `{page: 1}`. For a list of params see the [API documentation](https://buttercms.com/docs/api/?javascript)

* page
  * `retrieve(page_type, page_slug[, params])`
  * `list(page_type[, params])`
  
 ```js
// Get page
butter.page.retrieve('casestudy', 'acme-co').then(function(resp) {
  console.log(resp)
});
```

## Collections

* content
  * `retrieve(collection[, params])`
  
```js
// Get FAQ
butter.content.retrieve(["faq"], {locale: 'es'}).then(function(resp) {
  console.log(resp)
});
```

### Preview mode

Preview mode can be used to setup a staging website for previewing content fields or for testing content during local development. To fetch content from preview mode add an additional argument, `true`, to the package initialization:

```js
var butter = require('buttercms')('your butter API token', true);
```

Or use an environment variable:

```js
var butter = require('buttercms')('your butter API token', process.env.BUTTER_PREVIEW_MODE);
```

## Blog Engine

* post
  * `retrieve(slug[, params])`
  * `list([params])`
  * `search(query[, params])`
* category
  * `retrieve(slug[, params])`
  * `list([params])`
* tag
  * `retrieve(slug[, params])`
  * `list([params])`
* author
  * `retrieve(slug[, params])`
  * `list([params])`
* feed
  * `retrieve(type[, params])`
  
See our [node app](https://github.com/buttercms/nodejs-cms-express-blog) for a full example.


## Timeouts

The default timeout threshold is 3000ms but you can change it:

```js
var butter = require('buttercms')('your butter API token', false, 5000);
```

## Axios hook

If you need to custom headers, caching, automatic retry or any other specific functionality on the transport layer, you can hook up into the [Axios](https://github.com/axios/axios) instance creation process. Supply the `axiosHook` callback parameter and Butter will call you when Axios is being created:

```js
function axiosHook(axios) {
  axios.interceptors.request.use(function requestLogger(config) {
    console.warn("Axios requested", config.url, config.params)

    return config;
  })
}

var butter = require('buttercms')('your butter API token', false, 5000, axiosHook);
```

## Documentation

Documentation is available at https://buttercms.com/docs/api/node

### Other

View NodeJS [Blog engine](https://buttercms.com/nodejs-blog-engine/) and [Full CMS](https://buttercms.com/nodejs-cms/) for other examples of using ButterCMS with NodeJS.
