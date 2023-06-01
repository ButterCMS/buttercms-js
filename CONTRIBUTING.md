# Contributing

## Release a new version

All commit messages have to follow the [conventionalcommits.org](https://conventionalcommits.org) format specification.

1. Make sure your are on the `master` branch.
2. Make sure that you have committed everything and that your code is working.
3. Run `npx standard-version`. This command updates the changelog with description of changes to your code since the last released version. It then increments the code version. All these changes are commited into the `master` branch.
4. Push these changes to the remote repository and its `master` branch.
5. A Github Action is triggered which automatically releases a new version to npmjs.com (https://www.npmjs.com/package/buttercms-js).

For more detailed instructions read the [standard-version documentation](https://github.com/conventional-changelog/standard-version).