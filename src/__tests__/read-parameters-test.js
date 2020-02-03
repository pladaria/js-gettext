// @ts-check
const readParameters = require('../read-parameters');

test('happy case - read one parameter', () => {
    const input = `'foo', "bar", 123`;
    const result = readParameters(input, 1);
    const expected = {params: [`foo`], length: 5};
    expect(result).toStrictEqual(expected);
});

test('happy case - read two parameters', () => {
    const input = `'foo', "bar", 123`;
    const result = readParameters(input, 2);
    const expected = {params: [`foo`, `bar`], length: 12};
    expect(result).toStrictEqual(expected);
});

test('escaped quotes', () => {
    const input = `'foo\\\\\\'"',\n"bar\\"'", 123`;
    const result = readParameters(input, 2);
    const expected = {
        params: [`foo\\'"`, `bar"'`],
        length: 20,
    };
    expect(result).toStrictEqual(expected);
});

test('token with newlines', () => {
    const input = `'%(comment1)line1\n%(comment2)line2', 123)`;
    const result = readParameters(input, 1);
    const expected = {
        params: ['%(comment1)line1\n%(comment2)line2'],
        length: 35,
    };
    expect(result).toStrictEqual(expected);
});
