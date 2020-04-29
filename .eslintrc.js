module.exports = {
    //一旦配置了root，ESlint停止在父级目录中查找配置文件
    root: true,
    parser: 'babel-eslint',
    //集成推荐的规则
    extends: ['plugin:prettier/recommended'],
    plugins: ['prettier'],
    // 碰到ts文件覆盖配置
    overrides: [
        {
            files: '**/*.ts',
            parser: '@typescript-eslint/parser',
            extends: [
                'plugin:@typescript-eslint/recommended',
                'prettier/@typescript-eslint',
                'plugin:prettier/recommended',
            ],
            plugins: ['@typescript-eslint', 'prettier'],
            rules: {
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
            },
        },
    ],
    //想要支持的JS语言选项
    parserOptions: {
        //启用ES6语法支持(如果支持es6的全局变量{env: {es6: true}}，则默认启用ES6语法支持)
        //此处也可以使用年份命名的版本号：2015
        ecmaVersion: 2019,
        //默认为script
        sourceType: 'module',
        //支持其他的语言特性
        ecmaFeatures: {},
    },
    //代码运行的环境，每个环境都会有一套预定义的全局对象，不同环境可以组合使用
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    //访问当前源文件中未定义的变量时，no-undef会报警告。
    //如果这些全局变量是合规的，可以在globals中配置，避免这些全局变量发出警告
    globals: {
        //配置给全局变量的布尔值，是用来控制该全局变量是否允许被重写
        window: true,
        process: false,
        __dirname: true,
    },
    //启用额外的规则或者覆盖默认的规则
    //规则级别分别：为"off"(0)关闭、"warn"(1)警告、"error"(2)错误--error触发时，程序退出
    // rules: {},
};
