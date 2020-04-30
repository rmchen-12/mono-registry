const getPersonInfo = (sex) => {
    const men = {
        name: 'riven',
        age: '18',
        height: 210,
        money: 'rich',
    };
    const women = {
        name: 'riven',
        age: '18',
        height: 210,
        money: 'rich',
    };

    return sex === 'men' ? men : women;
};

export default getPersonInfo;
