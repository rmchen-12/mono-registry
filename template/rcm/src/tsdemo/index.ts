export interface Person {
    /** 姓名 */
    name: string;
    /** 年龄 */
    age: string;
    /** 身高 */
    height: number;
    /** 财富 */
    money: 'rich' | 'poo';
}

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
const getPersonInfo = (sex: 'men' | 'women'): Person => {
    const men: Person = {
        name: 'riven',
        age: '18',
        height: 210,
        money: 'rich',
    };
    const women: Person = {
        name: 'riven',
        age: '18',
        height: 210,
        money: 'rich',
    };

    return sex === 'men' ? men : women;
};

export default getPersonInfo;
