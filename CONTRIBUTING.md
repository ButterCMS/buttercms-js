# Contributing

## Release and publish a new SDK version

This SDK uses the [`release-please` GitHub Action](https://github.com/google-github-actions/release-please-action) to automate preparing new versions for release.

When you are ready to release a new SDK version, make sure that all your code changes have been approved and merged into the `master` branch and that your code is working. The `release-please` tool generates a changelog based on **commit messages; these messages should follow the [Conventional Commits](https://conventionalcommits.org) specification in order for the changelog to reflect all code changes accurately**. Otherwise, you would need to update the changelog manually before each release. Note that "chore" will not trigger a release PR. "fix" will create a SemVer Patch, "feat" will create a minor version, and adding a "!" will create a major version, indicating a breaking change. Find more information in the [release-please docs](https://github.com/google-github-actions/release-please-action#how-release-please-works). 

The `release-please` action opens and maintains a GitHub pull request with changes relevant to a new version release. Approve this pull request to release a new version of the SDK.

After the release, the new version is automatically published into the npm registry (see the package [here](https://www.npmjs.com/package/buttercms)).
