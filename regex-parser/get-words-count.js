const axios = require('axios');

const PARSE_URL = 'https://a-parser.com/parsers/';

const RGX_EXTRACT_TEXT_BETWEEN_TAGS = />[А-Яа-я](.*?)</g;
const RGX_WORDS_LENGTH_MORE_THAN_TREE = /[A-Za-z]{4,}|[А-Яа-я]{4,}/g;
const RGX_REPLACE_DIAMOND_BRACKETS = /[>,<]/g;

(async function () {
    const {data} = await axios.get(PARSE_URL);

    const count = data
        .match(RGX_EXTRACT_TEXT_BETWEEN_TAGS)
        .toString()
        .replace(RGX_REPLACE_DIAMOND_BRACKETS, ' ')
        .match(RGX_WORDS_LENGTH_MORE_THAN_TREE)
        .length;

    console.log(count);
}());
