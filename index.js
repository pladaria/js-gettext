const extractTokens = require('./src/extract-tokens');

const ignore = ['**/__tests__/**.js', '**/__stories__/**.js'];

const tokens = extractTokens(sourcePath, {
    path: process.argv[2],
    ignore,
    singular: 'I18N.translate',
    plural: 'I18N.translatePlural',
});

console.log(gettextFormatter(tokens));
