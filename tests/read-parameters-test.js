const test = require('ava');
const readParameters = require('../src/read-parameters');

test('happy case - read one parameter', t => {
    const input = `'foo', "bar", 123`;
    const result = readParameters(input, 1);
    const expected = {params: [`foo`], length: 5};
    t.deepEqual(result, expected);
});

test('happy case - read two parameters', t => {
    const input = `'foo', "bar", 123`;
    const result = readParameters(input, 2);
    const expected = {params: [`foo`, `bar`], length: 12};
    t.deepEqual(result, expected);
});

test('escaped quotes', t => {
    const input = `'foo\\\\\\'"',\n"bar\\"'", 123`;
    const result = readParameters(input, 2);
    const expected = {
        params: [`foo\\'"`, `bar"'`],
        length: 20,
    };
    t.deepEqual(result, expected);
});
