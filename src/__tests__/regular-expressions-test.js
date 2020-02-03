const {buildFunctionCallRegExp} = require('../regular-expressions');

test('buildFunctionCallRegExp', () => {
    const cases = [
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
        ['foo', "foo('%(comment1)line1\n%(comment2)line3\n%(comment2)line3\n')", 4],
    ];

    cases.forEach(([functionName, text, matchLength]) => {
        const re = buildFunctionCallRegExp(functionName);
        const match = text.match(re);
        if (matchLength) {
            expect(match).not.toBe(null);
            expect(match).toHaveLength(1);
            expect(match[0]).toHaveLength(matchLength);
        } else {
            expect(match).toBe(null);
        }
    });
});
