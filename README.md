### 为什么要做这套脚手架

-   自己配了一套 rollup 来打包工具库结果引用出错，造成线上 bug
-   智能硬件组内维护了多个 package，散落四处，维护繁琐
-   发版后到底更新了啥，还要手动改 version，version 应该改哪个数字，CHANGELOG 维护
-   小改动还要疯狂发版

### TODO

-   [x] 自定义一些模板 package，一键生成符合最佳实践的 npm 仓库，因为通过`lerna create @aclink/new` 建立的 package 仓库有点简陋
-   [ ] 使用 jest，增加代码测试
-   [ ] 完善仓库模板

### 多 npm 仓库用到的工具

-   `lerna` 多 npm 包的版本管理与发布工具，解决调试，包和包之间依赖关系，依赖包冗余，发布需要手动修改版本，发版不会自动生成 CHANGELOG 等问题
-   `yarn` yarn 具有 workspace 特性，用于解决各个 package 到处重复安装依赖包的问题，以及 package 与 package 之间相互依赖的问题
-   `husky` 获取到 git 操作钩子，以执行一些操作（eslint、提交规范...）,通过 git 钩子，我们可以做到更多自动化操作来保证流程的规范
-   提交规范，根据提交来自动生成 CHANGELOG
    -   `commitizen` 规范提交，通过命令行形式完善提交信息
    -   `cz-lerna-changelog` 在 commitizen 询问的最后提供选择影响包的选项，用于后面自动生成 CHANGELOG
-   校验提交信息，不规范的不给提交
    -   `commitlint` 对提交信息进行规则校验
    -   `husky` 获取到 git 操作钩子，在 git commit 时使用 commitlint 来校验，不通过的不能提交
-   代码规范
    -   `lint-staged` 只对暂存区中的 js,ts 文件执行 eslint --fix 校验并自动修复，解决老项目迁移时会对所有文件校验的头痛问题
    -   `husky` 获取到 git 操作钩子，git commit 前 lint 代码

### 多仓库操作

1. 开发前

-   仓库 pull 到本地，先 `lerna bootstrap` 安装依赖
-   新开发一个 npm 包: `lerna create @aclink/utils` 在 packages 目录下会初始化一个 npm 包
    -   使用这种方式来新建的模板过于简陋，后面改为自定义模板引用的方式来快速生成符合最佳实践的仓库模板

2. 开发中

-   安装依赖，统一通过 yarn 的 workspace 来安装，
    -   普通项目依赖管理（node_modules 散落在各个项目中）： 通过 yarn add 和 yarn remove 即可简单解决依赖库的安装和删除问题
    -   对所有的 packages 进行依赖管理（node_modules 在根目录下），分为三种场景（推荐）
        -   给某个 package 安装依赖 `yarn workspace @aclink/utils add lodash` ，给 @aclink/utils 安装 lodash
        -   给所有的 package 安装依赖 `yarn workspaces add lodash`
        -   增加内部模块之间的依赖 `lerna add @aclink/utils --scope @aclink/rcm` ，给 @aclink/rcm 添加 @aclink/utils 依赖
        -   给 root 安装共享依赖 `yarn add -W -D typescript` 一般的公用的开发工具都是安装在 root 里，所有 package 共享依赖，如 typescript,我们使用 `yarn add -W -D typescript` 来给 root 安装依赖
-   对应的卸载依赖
    -   yarn workspace packageB remove packageA
    -   yarn workspaces remove lodash
    -   yarn remove -W -D typescript

3. 开发完成，git 提交，npm 发版
    > 注意： 这里通过 vscode 提交工具会报错，因为这种方式很难规范提交信息，请通过命令方式提交

-   git 提交 `yarn run commit` ，npm 发版依赖 git 提交信息，根据提交来自动生成 CHANGELOG，提交规范及其重要，更方便以后追溯信息

    -   使用 `commitizen` 和 `cz-lerna-changelog` 来规范化本次提交，为之后的发版做好准备

-   版本发布 `yarn run publish` 执行 `lerna publish --no-commit-hooks`

    -   找出从上一个版本发布以来有过变更的 package
    -   提示开发者确定要发布的版本号
    -   将所有更新过的的 package 中的 package.json 的 version 字段更新
    -   将依赖更新过的 package 的 包中的依赖版本号更新
    -   更新 lerna.json 中的 version 字段
    -   提交上述修改，并打一个 tag
    -   推送到 git 仓库
    -   推送到 npm 仓库

### lerna 的一些操作命令

-   `lerna clean` 清理所有的 node_modules，等同于`yarn workspaces run clean`

### 参考文章

[React + Typescript 工程化治理实践](https://juejin.im/post/5dccc9b8e51d4510840165e2#heading-16)
[lerna+yarn workspace+monorepo 项目的最佳实践](https://juejin.im/post/5d583231e51d45620541039e#heading-9)
[father 文档，基于 rollup,babel,docz,支持 ts,eslint,prettier 等](https://github.com/umijs/father/tree/2.x)
