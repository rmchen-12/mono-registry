'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 返回用户信息
 *
 * @param {('men' | 'women')} sex - 性别，只有男人和女人
 *
 * @example
 * ```ts
 * getPersonInfo('men') => {  name: 'riven', age: '18', height: 210, money: 'rich'  }
 * ```
 *
 * @public
 * @returns {Person} - 返回男人或女人的详细信息
 */
var getPersonInfo = function getPersonInfo(sex) {
    var men = {
        name: 'riven',
        age: '18',
        height: 210,
        money: 'rich',
    };
    var women = {
        name: 'riven',
        age: '18',
        height: 210,
        money: 'rich',
    };
    return sex === 'men' ? men : women;
};

var getPersonInfo$1 = function getPersonInfo(sex) {
    var men = {
        name: 'riven',
        age: '18',
        height: 210,
        money: 'rich',
    };
    var women = {
        name: 'riven',
        age: '18',
        height: 210,
        money: 'rich',
    };
    return sex === 'men' ? men : women;
};

exports.createQrCode = getPersonInfo;
exports.jsTest = getPersonInfo$1;
