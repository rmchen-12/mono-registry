'use strict';

const cli = require('@lerna/cli');

// 自定义一些命令
const newCmd = require('./new/command');

function main(argv) {
    return cli().command(newCmd).parse(argv);
}

main(process.argv.slice(2));

module.exports = main;
