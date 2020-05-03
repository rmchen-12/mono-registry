## 高频的问题

### lerna create 和 npm run new 有啥区别

自定义的 new 命令是基于 lerna create 源码的改造，使其支持本地模板的方式来创建 package，并且删减了更多不需要的参数，更利于团队技术沉淀

### 为什么用 yarn，而不用 cnpm

yarn 的 workspace 特性更有利于处理依赖包，比如 lodash 就只需要安装在 root 下，而不用每个 package 再去安装一次，而有些是某个 package 独有的，比如 base64-js，那就只需要给那个 package 单独安装就行了

### 怎么安装一个依赖包

-   公共依赖包，很多仓库都用到的
    -   比如一些工具库，那就执行`yarn add -W lodash`
-   个别 package 用的话，两种方式
    -   cd 到项目路径下执行`yarn add lodash`，这样直接安装在当前 package 的 node_modules 里
    -   `yarn workspace @aclink/aha add lodash`，这样直接安装在根目录的 node_modules 里
        > 如果不想看到项目里到处充斥着 node_modules 的话，推荐用第二种方式来安装
