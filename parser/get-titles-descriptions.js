const {parse} = require('node-html-parser');
const axios = require('axios');

const URL = 'https://a-parser.com/parsers/';

const TITLES_SELECTOR = 'div.integration-card-copy.most-popular strong';
const DESCRIPTION_SELECTOR = 'body > div.overflow-hidden > div > div > div.most-popular-integrations-grid > div > div';

(async function () {
    const response = await axios.get(URL);

    const root = parse(response.data);

    const titles = root.querySelectorAll(TITLES_SELECTOR);
    const descriptions = root.querySelectorAll(DESCRIPTION_SELECTOR);

    let item = -1;
    for (let i = 0; i < descriptions.length; i++) {
        if (descriptions[i].innerText.length !== 0) {
            console.log(`${titles[++item].innerText}, ${descriptions[i].innerText}`);
        }
    }
}());

