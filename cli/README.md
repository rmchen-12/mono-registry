### 自定义命令

基于lerna，根据需求增加一些自定义命令

### create

> create @aclink/demo --type utils // 在 packages 下新建一个 utils 包

基于 lerna 的 create 命令改造，以模板的方式新建一个 package，模板可放在根目录 `template` 文件夹下，执行命令时会自动引用，
目前支持三种模板

-   utils 工具类模板
-   rcm 组件库类模板
-   hooks react hooks 类模板

> 注意：模板功能意在打造最佳实践型的配置，如果有好的idea欢迎提pr
