// @ts-check
/**
 * Simple state machine to read up to `limit` string parameters
 *
 * @param {string} text
 * @param {number} limit
 */
module.exports = (text, limit, debug = false) => {
    const params = [];
    let i = 0;
    let c = text[i++];
    let state = 'none';
    let param = '';
    let quote = '';
    let slash = false;
    while (c) {
        switch (c) {
            case '\\':
                if (state === 'string') {
                    slash = !slash;
                    param += c;
                }
                break;
            case '"':
            case "'":
                if (state === 'none') {
                    slash = false;
                    quote = c;
                    state = 'string';
                    param = c;
                    break;
                }
                if (state === 'string') {
                    if (slash) {
                        param += c;
                        break;
                    }
                    if (quote === c) {
                        quote = '';
                        state = 'none';
                        param += c;
                        params.push(eval(param.replace(/\n/g, '\\n')));
                        if (params.length >= limit) {
                            return {params, length: i};
                        }
                    } else {
                        param += c;
                    }
                    break;
                }
                break;
            case ')':
                if (state === 'string') {
                    param += c;
                    break;
                }
                if (state === 'none') {
                    return {params: [], length: 0};
                }
                break;
            default:
                if (state === 'string') {
                    param += c;
                }
                break;
        }
        if (c !== '\\') {
            slash = false;
        }
        if (debug) {
            console.error({i, c, state, slash, param});
        }
        c = text[i++];
    }
    return {params: [], length: 0};
};
