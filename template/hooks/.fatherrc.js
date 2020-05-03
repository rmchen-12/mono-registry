import filesize from 'rollup-plugin-filesize';

export default {
    entry: 'src/index.js',
    esm: 'rollup',
    cjs: 'rollup',
    umd: {
        globals: {},
        name: 'ehome-aclink-kit',
        minFile: true,
    },
    extraRollupPlugins: [filesize()],
    runtimeHelpers: true,
    doc: {
        themeConfig: { mode: 'dark' },
        base: '/your-repo',
    },
};
