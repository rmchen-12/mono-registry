'use strict';
const globby = require('globby');
const path = require('path');
const findUp = require('find-up');

const rootPath = findUp.sync(
    function (directory) {
        const hasUnicorns = findUp.sync.exists(path.join(directory, 'lerna.json'));
        return hasUnicorns && directory;
    },
    { type: 'directory' },
);

/**
 * @see https://github.com/yargs/yargs/blob/master/docs/advanced.md#providing-a-command-module
 */
exports.command = 'create <name> [loc]';

exports.describe = 'Create a new lerna-managed package';

exports.builder = (yargs) => {
    yargs
        .positional('name', {
            describe: '包名必须可用且唯一',
            type: 'string',
        })
        .positional('loc', {
            describe: '新建到哪个目录下',
            type: 'string',
        })
        .options({
            // 支持的模板类型，可选根目录下template的文件夹
            t: {
                group: 'Command Options:',
                defaultDescription: 'utils',
                describe: '选择的模板类型，比如工具库，组件库等',
                alias: 'type',
                choices: globby.sync('*', {
                    cwd: path.join(rootPath, 'template'),
                    onlyDirectories: true,
                    unique: true,
                }),
            },
            // 跳过所有选择，用默认参数
            y: {
                group: 'Command Options:',
                describe: '跳过所有参数选择，使用默认值',
                alias: 'yes',
                type: 'boolean',
            },
            private: {
                group: 'Command Options:',
                describe: 'Make the new package private, never published to any external registry',
                type: 'boolean',
            },
        });

    return yargs;
};

exports.handler = function handler(argv) {
    return require('./index')(argv);
};
