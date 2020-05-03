# 智能硬件组工具函数集

### RCM

### 前言

> 为保证工具库代码质量，并规范代码开发与提交流程，引入下列工具辅助开发

-   使用 umi 工具链的 father 来打包工具库，集成 ts eslint prettier 增强开发体验，支持 ts 与 js 代码混合开发
-   使用 husky lint-staged 来对代码提交前做格式化和 eslint 检查
-   使用 conventional-changelog-cli 来自动生成版本 CHANGELOG 文档

### 支持的函数

-   createQrCode 二维码 key 转码函数

### TODO:

-   [x] 增加 types，支持 typescript 提示
-   [x] typescript 直接重构，并引入完整工具链重构代码结构
-   [ ] 集成 TSDoc，自动生成 api 文档
-   [ ] 使用 jest，增加代码测试

### 发包流程为

1. 修改本地代码
2. vscode git 工具提交修改，每一次提交加前缀，以便自动生成 CHANGELOG
    - feat：新功能（feature）
    - fix：修补 bug
    - docs：文档（documentation）
    - style：格式（不影响代码运行的变动）
    - refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
    - test：增加测试
    - chore：构建过程或辅助工具的变动
3. `npm run x/y/z`
    1. 改变 package.json 中的版本号
    2. 使用 conventional-changelog 工具将 git 提交记录记录到 CHANGELOG.md
    3. 提交 package.json 和 CHANGELOG.md 文件
    4. git 打标签 tag，push 代码
4. `npm run publish`
