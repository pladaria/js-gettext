const {readFileSync, statSync} = require('fs');
const glob = require('glob');
const {buildFunctionCallRegExp} = require('./regular-expressions');
const readParameters = require('./read-parameters');

const addToken = (tokens, filename, line, token, tokenPlural = '') => {
    const key = token;
    if (!tokens[key]) {
        tokens[key] = {
            token: token,
            plural: tokenPlural,
            positions: [`${filename}:${line}`],
        };
    } else {
        tokens[key].positions.push(`${filename}:${line}`);
        const currentPlural = tokens[key].tokenPlural;
        if (tokenPlural) {
            if (!currentPlural) {
                tokens[key].tokenPlural = tokenPlural;
            } else if (currentPlural !== tokenPlural) {
                throw Error(`token ${token} has many plurals: ${currentPlural}, ${tokenPlural}`);
            }
        }
    }
    return tokens;
};

const extractTokens = (tokens, text, filename, reSingular, rePlural) => {
    let line = 0;
    let match = null;
    for (let i = 0, len = text.length; i < len; i++) {
        const c = text[i];
        if (c === '\n') {
            line++;
        } else if ((match = text.substr(i).match(reSingular))) {
            i += match[0].length;
            const {params, length} = readParameters(text.substr(i), 1);
            if (length) {
                addToken(tokens, filename, line, params[0]);
                i += length;
            } else {
                console.error(`Error reading singular token: ${filename}:${line}`);
            }
        } else if ((match = text.substr(i).match(rePlural))) {
            i += match[0].length;
            const {params, length} = readParameters(text.substr(i), 2);
            if (length) {
                addToken(tokens, filename, line, params[0], params[1]);
                i += length;
            } else {
                console.error(`Error reading plural tokens: ${filename}:${line}`);
            }
        }
    }
};

module.exports = ({input, ignore, singular, plural, verbose}) => {
    const files = glob.sync(input, {ignore});
    const tokens = {};
    const reSingular = buildFunctionCallRegExp(singular);
    const rePlural = buildFunctionCallRegExp(plural);

    files.forEach(f => {
        if (verbose) {
            console.error(f);
        }
        const stat = statSync(f);
        if (stat.isFile()) {
            const text = readFileSync(f).toString('utf8');
            extractTokens(tokens, text, f, reSingular, rePlural);
        }
    });
    return tokens;
};
