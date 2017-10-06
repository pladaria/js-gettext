const extractTokens = require('./src/extract-tokens');
const program = require('commander');

const collect = (value, acc) => acc.push(value) && acc;

const argv = program
    .version(require('./package').version)
    .option('-f', '--format [value]', 'Output format', /^(pot|json)$/)
    .option('', '--ignore <glob>', 'Ignore', collect, [])
    .parse(process.argv);

console.log(argv);

const ignore = ['**/__tests__/**.js', '**/__stories__/**.js'];

const tokens = extractTokens(sourcePath, {
    path: process.argv[2],
    ignore,
    singular: 'I18N.translate',
    plural: 'I18N.translatePlural',
});

//console.log(gettextFormatter(tokens));
