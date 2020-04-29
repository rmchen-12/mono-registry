### lerna 操作

lerna bootstrap Installs all of their dependencies and links any cross-dependencies.

lerna publish 你就可以根据 cmd 中的提示，一步步的发布 packges 了。

- Run the equivalent of `lerna updated` to determine which packages need to be published.
- If necessary, increment the `version` key in `lerna.json`.
- Update the `package.json` of all updated packages to their new versions.
- Update all dependencies of the updated packages with the new versions, specified with a [caret (^)](https://docs.npmjs.com/files/package.json#dependencies).
- Create a new git commit and tag for the new version.
- Publish updated packages to npm.
