const axios = require('axios');

const PARSE_URL = 'https://a-parser.com/parsers/';

const REGEX_REMOVE_TAGS = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
const REGEX_STRONG_TITLE = /<strong class=".*?">(.*?)<\/strong>/g;
const REGEX_DIV_DESCRIPTION = /(?:<\/a><\/h4>|<\/a>)<div>(.*?)<\/div>/g;

(async function () {
    const {data} = await axios.get(PARSE_URL);

    const titles = data.match(REGEX_STRONG_TITLE);
    const descriptions = data.match(REGEX_DIV_DESCRIPTION);

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i].replace(REGEX_REMOVE_TAGS, '');
        const description = descriptions[i].replace(REGEX_REMOVE_TAGS, '');

        console.log(`${title}, ${description}`);
    }
}());