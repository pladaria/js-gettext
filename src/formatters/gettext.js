/**
 * gettext formatter
 */
module.exports = (
    tokens,
    {
        packageName = 'Example',
        packageVersion = 'x.x.x',
        msgidBugsAddress = 'bugs@example.org',
        copyrightHolder = 'Company',
    } = {}
) => {
    const lines = [];

    lines.push('# SOME DESCRIPTIVE TITLE.');
    lines.push(`# Copyright (C) YEAR ${copyrightHolder}`);
    lines.push(`# This file is distributed under the same license as the ${packageName} package.`);
    lines.push('# FIRST AUTHOR <EMAIL@ADDRESS>, YEAR.');
    lines.push('#');
    lines.push('#, fuzzy');
    lines.push('msgid ""');
    lines.push('msgstr ""');
    lines.push(`"Project-Id-Version: ${packageName} ${packageVersion}\\n"`);
    lines.push(`"Report-Msgid-Bugs-To: ${msgidBugsAddress}\\n"`);
    lines.push('"POT-Creation-Date: 2017-03-17 17:39+0000\\n"');
    lines.push('"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\\n"');
    lines.push('"Last-Translator: FULL NAME <EMAIL@ADDRESS>\\n"');
    lines.push('"Language-Team: LANGUAGE <LL@li.org>\\n"');
    lines.push('"Language: \\n"');
    lines.push('"MIME-Version: 1.0\\n"');
    lines.push('"Content-Type: text/plain; charset=UTF-8\\n"');
    lines.push('"Content-Transfer-Encoding: 8bit\\n"');
    lines.push('"Plural-Forms: nplurals=INTEGER; plural=EXPRESSION;\\n"');
    lines.push('');

    Object.values(tokens)
        .sort(({token: t1}, {token: t2}) => (t1 < t2 ? -1 : 1))
        .forEach(({token, plural, positions}) => {
            positions.sort().forEach(position => {
                lines.push(`#: ${position}`);
            });
            if (plural) {
                lines.push(`msgid ${JSON.stringify(token)}`);
                lines.push(`msgid_plural ${JSON.stringify(plural)}`);
                lines.push('msgstr[0] ""');
                lines.push('msgstr[1] ""');
            } else {
                lines.push(`msgid ${JSON.stringify(token)}`);
                lines.push('msgstr ""');
            }
            lines.push('');
        });

    return lines.join('\n');
};
