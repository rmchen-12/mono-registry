### lerna 操作

lerna bootstrap Installs all of their dependencies and links any cross-dependencies.

lerna create @aclink/hooks

lerna publish 你就可以根据 cmd 中的提示，一步步的发布 packges 了。

- Run the equivalent of `lerna updated` to determine which packages need to be published.
- If necessary, increment the `version` key in `lerna.json`.
- Update the `package.json` of all updated packages to their new versions.
- Update all dependencies of the updated packages with the new versions, specified with a [caret (^)](https://docs.npmjs.com/files/package.json#dependencies).
- Create a new git commit and tag for the new version.
- Publish updated packages to npm.

lerna add chalk // 为所有 package 增加 chalk 模块
lerna add semver --scope @mo-demo/cli-shared-utils // 为 @mo-demo/cli-shared-utils 增加 semver 模块
lerna add @mo-demo/cli-shared-utils --scope @mo-demo/cli // 增加内部模块之间的依赖

lerna clean # 清理所有的 node_modules
yarn workspaces run clean # 执行所有 package 的 clean 操作

### 提交规范

a
使用`commitlint`对提交进行审核，不符合将无法提交
推荐使用 `yarn run commit` 提交，走完完整的提交流程
