# Changelog

## [3.0.0](https://github.com/ButterCMS/buttercms-js/compare/v2.3.1...v3.0.0) (2024-12-19)


### ⚠ BREAKING CHANGES

* upgrade to node 20

### Features

* upgrade to node 20 ([54bcb62](https://github.com/ButterCMS/buttercms-js/commit/54bcb626c3d571aec689d743479ac3e68a266d66))

## [2.3.1](https://github.com/ButterCMS/buttercms-js/compare/v2.3.0...v2.3.1) (2024-12-06)


### Bug Fixes

* Exports types for resolution in ESM Modules ([7f3dbaa](https://github.com/ButterCMS/buttercms-js/commit/7f3dbaa75774715bbfd20ce48b53d55d027cb093))

## [2.3.0](https://github.com/ButterCMS/buttercms-js/compare/v2.2.0...v2.3.0) (2024-11-13)


### Features

* add V2 Typings to JS SDK ([41e2fe8](https://github.com/ButterCMS/buttercms-js/commit/41e2fe87ff4987bf5acf56997a46df8852e75bfb))

## [2.2.0](https://github.com/ButterCMS/buttercms-js/compare/v2.1.4...v2.2.0) (2024-11-11)


### Features

* update builds to include dev builds ([3488632](https://github.com/ButterCMS/buttercms-js/commit/3488632d4059ff718937f0ec881452a8e3fb1f04))


### Bug Fixes

* split production builds ([1205812](https://github.com/ButterCMS/buttercms-js/commit/1205812850be6323d1d1f1e7d83c6704e200236c))

## [2.1.4](https://github.com/ButterCMS/buttercms-js/compare/v2.1.3...v2.1.4) (2024-09-04)


### Bug Fixes

* update cdn link in readme ([d2be0db](https://github.com/ButterCMS/buttercms-js/commit/d2be0dbe85e48f14cc52f680a11fcbd89e8b2d1d))

## [2.1.3](https://github.com/ButterCMS/buttercms-js/compare/v2.1.2...v2.1.3) (2024-08-25)


### Bug Fixes

* update main mount in package, configure npm to see minified file output ([18731dd](https://github.com/ButterCMS/buttercms-js/commit/18731dda664d54e3be07bfc65fc195125b554c83))

## [2.1.2](https://github.com/ButterCMS/buttercms-js/compare/v2.1.1...v2.1.2) (2024-08-22)


### Bug Fixes

* error in test action ([b0867ca](https://github.com/ButterCMS/buttercms-js/commit/b0867ca2c71918ca6b1eb0fa74d2bcd657aeb316))
* update actions for publishing to npm ([b0867ca](https://github.com/ButterCMS/buttercms-js/commit/b0867ca2c71918ca6b1eb0fa74d2bcd657aeb316))

## [2.1.1](https://github.com/ButterCMS/buttercms-js/compare/v2.1.0...v2.1.1) (2024-08-12)


### Bug Fixes

* add in full cause to thrown errors ([6ede5e4](https://github.com/ButterCMS/buttercms-js/commit/6ede5e49bf06ae1be8445ec511277eb8eb46401f))
* update abortcontroller/abortSignal for use in Reactive Native ([758172b](https://github.com/ButterCMS/buttercms-js/commit/758172b0b21150b650a09fedaf75914ebf076c20))
* update error catching to catch all produced errors ([d91d47f](https://github.com/ButterCMS/buttercms-js/commit/d91d47f62488d7947f25250afa3bdb388da69295))

## [2.1.0](https://github.com/ButterCMS/buttercms-js/compare/v2.0.3...v2.1.0) (2024-07-29)


### Features

* update response structure to echo schema expected from TS defs and v1 ([1a748fa](https://github.com/ButterCMS/buttercms-js/commit/1a748fabbee60fbfaf547584b18ab31a436b6026))

## [2.0.3](https://github.com/ButterCMS/buttercms-js/compare/v2.0.2...v2.0.3) (2024-06-14)


### Bug Fixes

* Update package.json ([2e6ff8b](https://github.com/ButterCMS/buttercms-js/commit/2e6ff8bc632b3d1f8d9b31b1379dad75db428ec4))

## [2.0.2](https://github.com/ButterCMS/buttercms-js/compare/v2.0.1...v2.0.2) (2024-06-13)


### Bug Fixes

* enhanced garbage collection on fetch aborts & error messaging ([14e97e3](https://github.com/ButterCMS/buttercms-js/commit/14e97e33783f85f819204d0beb7e880b556f1e2d))

## [2.0.1](https://github.com/ButterCMS/buttercms-js/compare/v2.0.0...v2.0.1) (2024-04-10)


### Bug Fixes

* update readme re: support and use of native fetch ([b193bca](https://github.com/ButterCMS/buttercms-js/commit/b193bcad47b7db77f86290bf7976be4191ec87c3))

## [2.0.0](https://github.com/ButterCMS/buttercms-js/)(2023-02-01)

### Added
- Added support for Node.js v18
- Added support for native fetch API
- Added explicit `cancelRequest` method to cancel requests
- Added native fetch timeout support
- Added 'onRequest' hook to modify request before it is sent
- Added 'onError' hook to inspect error before it is thrown if error before server
- Added 'onError' hook to inspect error after it is thrown if error is from fetch or internal browser issue
- Added 'onResponse' hook to inspect response before it is returned

### Removed
- Removed support for Node.js v14 and v16
- Removed support for axios

## [1.2.16](https://github.com/ButterCMS/buttercms-js/releases/tag/Node-Pre-16) (2023-12-07)

This is the last release for Node v14 (and 16) and uses axios for API requests. This branch will no longer be maintained.

## Updated
- Updated version number


## [1.2.15](https://github.com/ButterCMS/buttercms-js/compare/v1.2.14...v1.2.15) (2023-10-23)


### Bug Fixes

* bump @babel/traverse from 7.21.4 to 7.23.2 ([8e3fcd5](https://github.com/ButterCMS/buttercms-js/commit/8e3fcd5fba9e5fa0abb1cc856fdff59d3578e71e))

## [1.2.14](https://github.com/ButterCMS/buttercms-js/compare/v1.2.13...v1.2.14) (2023-09-19)


### Bug Fixes

* Update CONTRIBUTING.md ([65a9432](https://github.com/ButterCMS/buttercms-js/commit/65a9432a2d2c2ca6f00cee6961f0226f3a2789bd))

## [1.2.13](https://github.com/ButterCMS/buttercms-js/compare/v1.2.12...v1.2.13) (2023-09-15)


### Bug Fixes

* issue calling axios.create undefined ([0cc86c9](https://github.com/ButterCMS/buttercms-js/commit/0cc86c9adbb313c99d07d57ea2562dd9d82444bd))

## 1.2.12 (May 1st, 2023)

### Updated
- Upgrade axios to 1.3.6
- Upgrade webpack to 5.81.0

### Added
- Added testing with jest

## 1.2.11 (April 17, 2023)

### Updated
- Updated axios from 1.2.5 to ^1.3.5
- Fixed bug with axios.create()

## 1.2.10 (Feb 27, 2023)

### Added

- Added webpack-cli to run webpack from CLI

### Updated

- Updated dependencies:
  - Updated axios from ~0.21.1 to ^1.2.5
  - Updated uglify-js from ^2.8.22 to ^3.17.4
  - Updated async from 2.6.3 to 2.6.4
  - Updated tar from 4.4.13 to 4.4.19
  - Updated ini from 1.3.5 to 1.3.8
  - Updated decode-uri-component from 0.2.0 to 0.2.2
  - Updated webpack from 2.7.0 to 5.75.0,
- Updated README.md to bump the JavaScript version

### Removed

- Removed json5 and loader-utils as they are no longer used after updating webpack dependency

## 1.0.0 (Apr 9, 2016)

- Initial release
