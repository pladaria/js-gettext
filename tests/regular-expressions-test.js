const test = require('ava');
const {buildFunctionCallRegExp} = require('../src/regular-expressions');

test('buildFunctionCallRegExp', t => {
    const cases = [
        // [functionName, text, matchLength]
        ['foo', 'foo("token");', 4],
        ['foo', ' foo("token");', 0],
        ['foo', 'xfoo("token");', 0],
        ['foo', 'Foo("token");', 0],
        ['foo', 'foo(\n"token");', 5],
        ['foo', 'foo "token");', 0],
        ['foo', 'foo("token"); foo("token");', 4],
        ['foo.bar', 'foo.bar("token");', 8],
        ['foo.bar', 'foo. bar ("token");', 10],
        ['foo.bar', 'foo\n.bar\n("token");', 10],
        ['foo.bar', 'foo\n.\nbar\n(\n    "token");', 16],
        ['foo.bar.baz', 'foo\n.\nbar\n.\n\t      baz    (\n    "token");', 32],
    ];

    cases.forEach(([functionName, text, matchLength], i) => {
        const re = buildFunctionCallRegExp(functionName);
        const match = text.match(re);
        const description = `case #${i}, ${functionName}, ${text}`;
        if (matchLength) {
            t.not(match, null, description);
            t.is(match.length, 1, description);
            t.is(match[0].length, matchLength, description);
        } else {
            t.is(match, null, description);
        }
    });
});