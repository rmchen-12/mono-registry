'use strict';

const fs = require('fs-extra');
const path = require('path');
const { URL } = require('whatwg-url');
const initPackageJson = require('pify')(require('init-package-json'));
const npa = require('npm-package-arg');

const Command = require('@lerna/command');
const ChildProcessUtilities = require('@lerna/child-process');
const npmConf = require('@lerna/npm-conf');
const builtinNpmrc = require('./lib/builtin-npmrc');

const LERNA_MODULE_DATA = require.resolve('./lib/lerna-module-data.js');

module.exports = factory;

function factory(argv) {
    return new CreateCommand(argv);
}

class CreateCommand extends Command {
    initialize() {
        const { loc: pkgLocation, name: pkgName, yes, type } = this.options;

        // 分析包名，取出scope和name
        const { name, scope } = npa(pkgName);

        // 生成的目录名称
        this.dirName = scope ? name.split('/').pop() : name;
        // 多个workspace的话确定用的是哪个workspace，顺序是字母排序
        this.pkgsDir =
            this.project.packageParentDirs.find((pd) => pd.indexOf(pkgLocation) > -1) ||
            this.project.packageParentDirs[0];

        // 生成文件的路径
        this.targetDir = path.resolve(this.pkgsDir, this.dirName);
        // 模板文件路径
        this.templateDir = path.resolve(this.project.rootPath, 'template', type);

        // 这里的conf用来生成package.json, npm-conf会根据参数来处理
        this.conf = npmConf({
            scope,
            yes,
        });

        // 如果本地有配置npmrc的话，用npmrc的配置覆盖已有的配置
        this.conf.addFile(builtinNpmrc(), 'builtin');

        // 如果是independent模式的话需要一个初始
        if (!this.project.isIndependent()) {
            this.conf.set('init-version', this.project.version);
        }

        // 从git中拿到当前git用户的信息
        if (this.conf.get('init-author-name') === '') {
            this.conf.set('init-author-name', this.gitConfig('user.name'));
        }

        if (this.conf.get('init-author-email') === '') {
            this.conf.set('init-author-email', this.gitConfig('user.email'));
        }

        // pass --private into module data without aggravating eslint
        if (this.options.private) {
            this.conf.set('private', true);
        }

        // loglevel为silent的话就不打印控制台日志了
        if (this.options.loglevel === 'silent') {
            this.conf.set('silent', true);
        }

        this.setHomepage();
        this.setPublishConfig();
        this.setRepository();

        return Promise.resolve();
    }

    execute() {
        let chain = Promise.resolve();

        chain = chain.then(() => fs.copy(this.templateDir, this.targetDir));
        chain = chain.then(() => initPackageJson(this.targetDir, LERNA_MODULE_DATA, this.conf));

        return chain.then((data) => {
            this.logger.success(
                'create',
                `New package ${data.name} created at ./${path.relative('.', this.targetDir)}`,
            );
        });
    }

    gitConfig(prop) {
        return ChildProcessUtilities.execSync('git', ['config', '--get', prop], this.execOpts);
    }

    setHomepage() {
        // allow --homepage override, but otherwise use root pkg.homepage, if it exists
        let { homepage = this.project.manifest.get('homepage') } = this.options;

        if (!homepage) {
            // normalize-package-data will backfill from hosted-git-info, if possible
            return;
        }

        // allow schemeless URLs (but don't blow up in URL constructor)
        if (homepage.indexOf('http') !== 0) {
            homepage = `http://${homepage}`;
        }

        const hurl = new URL(homepage);
        const relativeTarget = path.relative(this.project.rootPath, this.targetDir);

        if (hurl.hostname.match('github')) {
            hurl.pathname = path.posix.join(hurl.pathname, 'tree/master', relativeTarget);
            // TODO: get actual upstream HEAD branch name
            // current remote: git rev-parse --abbrev-ref --symbolic-full-name @{u}
            // upstream HEAD: git symbolic-ref --short refs/remotes/origin/HEAD
            hurl.hash = 'readme';
        } else if (!this.options.homepage) {
            // don't mutate an explicit --homepage value
            hurl.pathname = path.posix.join(hurl.pathname, relativeTarget);
        }

        this.conf.set('homepage', hurl.href);
    }

    setPublishConfig() {
        const scope = this.conf.get('scope');
        const registry = this.options.registry || this.conf.get(`${scope}:registry`) || this.conf.get('registry');
        const isPublicRegistry = registry === this.conf.root.registry;
        const publishConfig = {};

        if (scope && isPublicRegistry) {
            publishConfig.access = this.options.access || 'public';
        }

        if (registry && !isPublicRegistry) {
            publishConfig.registry = registry;
        }

        if (this.options.tag) {
            publishConfig.tag = this.options.tag;
        }

        if (Object.keys(publishConfig).length) {
            this.conf.set('publishConfig', publishConfig);
        }
    }

    setRepository() {
        try {
            const url = ChildProcessUtilities.execSync('git', ['remote', 'get-url', 'origin'], this.execOpts);

            this.conf.set('repository', url);
        } catch (err) {
            this.logger.warn('ENOREMOTE', 'No git remote found, skipping repository property');
        }
    }
}

module.exports.CreateCommand = CreateCommand;
