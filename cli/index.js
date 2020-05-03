'use strict';

const cli = require('@lerna/cli');

// 自定义一些命令
const createCmd = require('./create/command');

function main(argv) {
    return cli().command(createCmd).parse(argv);
}

main(process.argv.slice(2));

module.exports = main;
