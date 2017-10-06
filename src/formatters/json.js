/**
 * JSON formatter
 */
module.exports = (tokens, {replacer = null, space = '  '}) =>
    JSON.stringify(tokens, replacer, space);
