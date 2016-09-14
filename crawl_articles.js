/**
 * Crawls and downloads all PI-News articles and saves them to disc.
 * 
 * PI-News is heavily protected against any direct non-browser access to their site,
 * also the Google webcache does not store every single PI-News article.
 * As a solution I use Google Translate to "translate" each page ("dutch" to german),
 * and parse the translated conted (requires a headless browser to follow some JS redirects).
 */

const fs = require('fs');
const Crawler = require("node-webcrawler");
const Horseman = require("node-horseman");

const INPUT_URLS = "./articles.json";
const OUTPUT_DIR = "./pages";

fs.readFile(INPUT_URLS, (err, res) => {
    urls = JSON.parse(res);
    crawlAtricles(urls);
});

function crawlAtricles(urls) {
    let i = 0;
    const c = new Crawler({
        maxConnections: 1,
        forceUTF8: true,
        rateLimits: 5000,
        callback: (error, result, $) => {
            const link = $('#contentframe').find('iframe').attr('src');
            if(link) {
                downloadArticle(link, i);
                i++;
            } else {
                console.error('ERROR');
            }
        }
    });

    for(const url of res) {
        c.queue({
            uri: 'http://translate.google.com/translate?anno=2&depth=1&rurl=translate.google.com&sl=nl&u=' + url,
            priority: 1
        });
    }
}

function downloadArticle(link, i) {
    console.log('Calling #' + i);
    var horseman = new Horseman();
    horseman
        .open(link)
        .wait(4500)
        .html()
        .then(html => {
            if(html.indexOf('headerimg') > -1) {
                console.log('Saving #' + i);
                fs.writeFile(`${OUTPUT_DIR}/${i}.html`, html);
            } else {
                console.error('Failed #' + i);
            }
        })
        .close();
}