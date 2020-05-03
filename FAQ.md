## 频繁被问的问题

### lerna create 和 npm run new 有啥区别

自定义的 new 命令是基于 lerna create 源码的改造，使其支持本地模板的方式来创建 package，并且删减了更多不需要的参数，更利于团队技术沉淀

### 为什么用 yarn，而不用 cnpm

yarn 的 workspace 特性更有利于处理依赖包，比如 lodash 就只需要安装在 root 下，而不用每个 package 再去安装一次，而有些是某个 package 独有的，比如 base64-js，那就只需要给那个 package 单独安装就行了

### 我想安装一个包，
