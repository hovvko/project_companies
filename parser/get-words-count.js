const axios = require('axios');
const {parse} = require('node-html-parser');
const fs = require('fs/promises');


const PARSE_URL = 'https://a-parser.com/parsers/';
const REGEX_EXTRACT_TEXT_BETWEEN_HTML_TAGS = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

(async function () {
    const response = await axios.get(PARSE_URL);

    const root = parse(response.data);
    const document = root.querySelectorAll('.overflow-hidden');

    const words = document
        .toString()
        .replaceAll(REGEX_EXTRACT_TEXT_BETWEEN_HTML_TAGS, ' ')
        .replaceAll('&nbsp;', '')
        .replaceAll(',', '')
        .split(' ')
        .filter(word => word.length > 3);

    await fs.writeFile('result.txt', words.toString());

    console.log(words.length);
}());