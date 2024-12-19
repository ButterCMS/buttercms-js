# ButterCMS JS client

[![npm version](https://img.shields.io/npm/v/buttercms.svg)](https://www.npmjs.org/package/buttercms)

## Documentation

For a comprehensive list of examples, check out the [API documentation](https://buttercms.com/docs/api/).

ButterCMS-JS version 2 will be supported until May 2025, when Node v18 sunsets. 
ButterCMS-JS version 3 is our current version and will be supported until May 2026 when Node v20 sunsets
ButterCMS-JS version 4 slated for launch in December 2025 when Node v22 is moved to maintenance mode.

## Installation

Requires Node.js version 20 or greater.

```bash
npm install buttercms --save
```

Butter can also be included directly in HTML:

<!-- {x-release-please-start-version} -->
```html
<script src="https://cdn.jsdelivr.net/npm/buttercms@3.0.0/dist/butter.min.js"></script>
```
<!-- {x-release-please-end} -->

## Native Fetch

ButterCMS-JS version 2 will be using the native fetch API. This means that the fetch API will be used to make requests to the ButterCMS API. This is a breaking change for anyone using version 1 of the ButterCMS-JS package.

Native fetch is built into Node v18 as well as all modern browsers. This lessens the need for third-party fetch libraries and achieves consistency between Node and browser environments.

## Overview

Every resource is accessed via your butter instance:

Using ES6 or Typescript:

```js
import Butter from "buttercms";
const butter = Butter("your_api_token");
```

Using CDN:

```html
<script>
  const butter = Butter("your_api_token");
</script>
```

Every resource method returns a promise:

```js
// Get blog posts
butter.post.list({page: 1, page_size: 10})
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.error(error)
  })
```

If using `async`/`await`:

```js
async function getPosts() {
  try {
    const response = await butter.post.list({page: 1, page_size: 10});
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

## Pages

Where you see params it is a plain js object, e.g. `{page: 1}`. For a list of params see the [API documentation](https://buttercms.com/docs/api/?javascript)

* page
  * `retrieve(page_type, page_slug[, params])`
  * `list(page_type[, params])`
  * `search(query[, params])`
  * `cancelRequest()`
  
 ```js
// Get page
butter.page.retrieve("casestudy", "acme-co").then(function(resp) {
  console.log(resp)
});
```

If using `async`/`await`:

```js
async function getPage() {
  try {
    const response = await butter.page.retrieve("casestudy", "acme-co");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

## Collections

* content
  * `retrieve(collection[, params])`
  * `cancelRequest()`

```js
// Get FAQ
butter.content.retrieve("faq", {locale: "es"}).then(function(resp) {
  console.log(resp)
});
```
If using `async`/`await`:

```js
async function getFAQ() {
  try {
    const response = await butter.content.retrieve("faq", {locale: "es"});
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```


### Preview mode

Preview mode can be used to setup a staging website for previewing content fields or for testing content during local development. To fetch content from preview mode add an additional argument, `true`, to the package initialization:

```js
const butter = Butter(
  "your butter API token", 
  { testMode: true }
);
```

Or use an environment variable:

```js
const butter = Butter(
  "your butter API token", 
  { testMode:  process.env.BUTTER_PREVIEW_MODE }
);
```

## Blog Engine

* post
  * `retrieve(slug[, params])`
  * `list([params])`
  * `search(query[, params])`
  * `cancelRequest()`
* category
  * `retrieve(slug[, params])`
  * `list([params])`
  * `cancelRequest()`
* tag
  * `retrieve(slug[, params])`
  * `list([params])`
  * `cancelRequest()`
* author
  * `retrieve(slug[, params])`
  * `list([params])`
  * `cancelRequest()`
* feed
  * `retrieve(type[, params])`
  * `cancelRequest()`
  
See our [node app](https://github.com/buttercms/nodejs-cms-express-blog) for a full example.

## Timeouts

The default timeout threshold is 3000ms but you can change it:

```js
const butter = Butter(
  "your butter API token", 
  { timeout: 5000 }
);
```

## Caching

The default cache is set to `default`:

```js
const butter = Butter(
  "your butter API token", 
  { cache: "only-if-cached" }
);
```

## Canceling a request

Each resource returns a `cancelRequest` method that can be used to cancel a request:

```js
butter.post.cancelRequest();
```

This will cancel all pending requests for that resource type. It will catch the cancelation and return a rejected Promise for your `.catch()` method or be able to be caught in an `async` function via a `try`/`catch` block.


## Hooks

If you need to custom headers, caching, automatic retry or any other specific functionality on the transport layer, you can hook up into our fetch hooks. The following hooks are available as Butter configuration options:

```js
const butter = Butter(
  "your butter API token", 
  { 
    onError: Function,
    onRequest: Function,
    onResponse: Function
  }
);
```

**onRequest** - called prior to making a request to the API. This can be declared as an async function to allow for async operations to be performed before the request is made.

`onRequest(resource, config)`

`resource` - The resource is the Butter API endpoint to be called
`config` - This is the configuration object that will be used to make the request

`config` includes:

`cancelRequest` - A function that can be called to cancel the request in the hook
`headers` - The headers that will be sent with the request. This is in the JS `Headers` API format. Users are able to modify these headers in the hook.
`options` - Options are the original config options set when initializing the Butter instance. This includes the `cache`, `testMode`, `timeout`. Hook functions are not included in this object.
`params` - The query parameters that will be sent with the request. Users are able to modify these parameters in the hook.
`type` - The type of resource api that is being requested. This string helps the developer to differentiate what resource is being called in the global hook.

`options`, `headers`, and `params`  are to be returned by the onRequest hook for further processing and request.

**onResponse** - called after a response is received from the API. This can be declared as an async function to allow for async operations to be performed after the response is received.

`onResponse (response, config)`

`response` - The response object that was received from the API. This is in the JS `Fetch Response` API format and is a clone of the original response object. This will allow the user to parse the response to get the data they need whether it be JSON, text, blob, etc. The original response will be returned as JSON to the resource function call's promise resolution.

`config` - This is the configuration object that was used to make the request

`config` includes:

`options` - Options are the original config options set when initializing the Butter instance. This includes the `cache`, `testMode`, `timeout`. Hook functions are not included in this object.
`params` - The query parameters were sent with the request. 
`type` - The type of resource api that was requested. This string helps the developer to differentiate what resource was called in the global hook.

`onResponse` expects no return values.

**onError** - called when an error is received from the API. This is not considered an async function.

`onError (errors, config)`

`errors` - the errors returned from the API and/or the fetch request. Comes in the following object format:

```
{
    details: "Error details",
}
```

`config` includes:

`options` - Options are the original config options set when initializing the Butter instance. This includes the `cache`, `testMode`, `timeout`. Hook functions are not included in this object.
`params` - The query parameters were sent with the request. 
`type` - The type of resource api that was requested. This string helps the developer to differentiate what resource was called in the global hook.

`onError` expects no return values.

## Documentation

Documentation is available at https://buttercms.com/docs/api/node

### Other

View NodeJS [Blog engine](https://buttercms.com/nodejs-blog-engine/) and [Full CMS](https://buttercms.com/nodejs-cms/) for other examples of using ButterCMS with NodeJS.
