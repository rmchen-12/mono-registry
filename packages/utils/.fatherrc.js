import filesize from 'rollup-plugin-filesize';

export default {
    entry: 'src/index.ts',
    esm: 'rollup',
    cjs: 'rollup',
    umd: {
        globals: { 'base64-js': 'base64js', 'crypto-js': 'CryptoJS' },
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
