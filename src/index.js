const {writeFileSync} = require('fs');
const argv = require('commander');
const extractTokens = require('./extract-tokens');

const DEFAULT_IGNORE = ['**/node_modules/**', '**/__tests__/**.js', '**/__stories__/**.js'];

const collect = (value, acc = []) => acc.push(value) && acc;

const parseFormatterOptions = (value = '') =>
    value
        .trim()
        .split(/\s*;\s*/)
        .reduce((acc, pair) => {
            const [key, value] = pair.trim().split(/\s*=\s*/);
            acc[key] = value;
            return acc;
        }, {});

let input, output;

argv
    .version(require('../package').version)
    .arguments('<input> <output>')
    .option('-f, --format <value>', 'Output format (pot|json)', /^(pot|json)$/, 'pot')
    .option('-s, --singular <string>', 'Singular translate function', String, 'I18N.translate')
    .option('-p, --plural <string>', 'Plural translate function', String, 'I18N.translatePlural')
    .option('-i, --ignore <glob>', 'Ignore pattern', collect)
    .option(
        '-o, --formatterOptions <key1=value1;key2=value2>',
        'Formatter options',
        parseFormatterOptions,
        {}
    )
    .option('-v, --verbose', 'Verbose mode', true)
    .allowUnknownOption()
    .action((a, b) => {
        input = a;
        output = b;
    })
    .parse(process.argv);

if (!input || !output) {
    argv.outputHelp();
    process.exit();
}

const tokens = extractTokens({
    input,
    ignore: argv.ignore || DEFAULT_IGNORE,
    singular: argv.singular,
    plural: argv.plural,
    verbose: !!argv.verbose,
});

console.log(argv.formatterOptions);

const formatter = require('./formatters/' + argv.format);

writeFileSync(output, formatter(tokens, argv.formatterOptions));
