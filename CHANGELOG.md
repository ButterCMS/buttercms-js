# Changelog

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
