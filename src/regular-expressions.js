// @ts-check
/**
 * Creates a RegExp that matches a function call in the beginning of the string,
 * including the opening parenthesis
 */
module.exports.buildFunctionCallRegExp = s =>
    RegExp(
        '^' + // beginning of the string
        s.replace(/\./g, '\\s*\\.\\s*') + // dot can be surrounded by white spaces
            '\\s*\\(\\s*' // opening parenthesis can be surrounded by white spaces
    );
