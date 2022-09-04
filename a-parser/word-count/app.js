const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://a-parser.com/');

  const allText = await page.$eval('*', el => el['innerText']);

  const splitN = allText.split(/\n/).toString();
  const splitSpace = splitN.split(' ').toString();
  const splitComma = splitSpace.split(',');

  const filteredArr = splitComma.filter(item => item.length > 3);
  console.log(filteredArr.length);

  await browser.close();
})();
