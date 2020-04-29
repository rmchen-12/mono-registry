### 用到的工具

-   husky 获取到 git 操作钩子，以执行一些操作（eslint、提交规范...）
-   提交规范，根据提交来自动生成 CHANGELOG
    -   commitizen 规范提交，通过命令行形式完善提交信息
    -   cz-lerna-changelog 在 commitizen 询问的最后提供选择影响包的选项
-   校验提交信息，不规范的不给提交
    -   commitlint 对提交信息进行规则校验
    -   husky 获取到 git 操作钩子，在 git commit 时使用 commitlint 来校验
-   代码规范
    -   lint-staged 只对暂存区中的 js 文件执行 eslint --fix 校验并自动修复
    -   husky 获取到 git 操作钩子，git commit 前 lint 代码

### lerna 操作

lerna bootstrap Installs all of their dependencies and links any cross-dependencies.

lerna create @aclink/hooks

lerna publish 操作做了什么

-   找出从上一个版本发布以来有过变更的 package
-   提示开发者确定要发布的版本号
-   将所有更新过的的 package 中的 package.json 的 version 字段更新
-   将依赖更新过的 package 的 包中的依赖版本号更新
-   更新 lerna.json 中的 version 字段
-   提交上述修改，并打一个 tag
-   推送到 git 仓库

lerna add chalk // 为所有 package 增加 chalk 模块
lerna add semver --scope @mo-demo/cli-shared-utils // 为 @mo-demo/cli-shared-utils 增加 semver 模块
lerna add @mo-demo/cli-shared-utils --scope @mo-demo/cli // 增加内部模块之间的依赖

lerna clean # 清理所有的 node_modules
yarn workspaces run clean # 执行所有 package 的 clean 操作

### 提交规范

使用`commitlint`对提交进行审核，不符合将无法提交
推荐使用 `yarn run commit` 提交，走完完整的提交流程
