# Contributing

## Release and publish a new SDK version

This SDK uses the [release-please](https://github.com/google-github-actions/release-please-action) automatic tool to prepare new versions for release.

When you are ready to release a new SDK version, make sure that all your code changes have been approved and merged into the `master` branch and that your code is working. The release-please tool generates changelog based on commit messages; these messages should follow the [Conventional Commits](https://conventionalcommits.org) specification in order for the changelog to reflect all code changes accurately. The changelog can, however, always be updated manually before the release.

The release-please tool opens and maintains a GitHub pull request with changes relevant to a new version release. Approve this pull request to release a new version of the SDK.

After the release, the new version is automatically published into the npm registry (see the package [here](https://www.npmjs.com/package/buttercms)).