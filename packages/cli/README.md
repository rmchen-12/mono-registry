### 自定义命令

基于 lerna，根据需求增加一些自定义命令

#### Usage

```
yarn add -W -D @aclink/aha

aha --help

aha create --help
```

### create

> aha create @aclink/utils --type utils // 在 packages 下新建一个 utils 类包

基于 lerna 的 create 命令改造，以模板的方式新建一个 package，模板可放在根目录 `template` 文件夹下，执行命令时会自动引用

-   utils 工具类模板
-   rcm 组件库类模板
-   hooks react hooks 类模板

> 注意：模板功能意在打造最佳实践型的配置，如果有好的 idea 欢迎提 pr
