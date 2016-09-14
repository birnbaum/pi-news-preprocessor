/**
 * Crawls PI-News "archive" pages and stores all article URLs to disc.
 * 
 * PI-News is heavily protected against any direct non-browser access to their site.
 * This is why I use the Google webcache to access the archive pages.
 */

const Crawler = require("node-webcrawler");
const url = require('url');
const fs = require('fs');

const OUTPUT_PATH = "./articles.json";

const urls = [];

function crawl_archives() {
    const c = new Crawler({
        maxConnections: 10,
        callback: (error, result, $) => {
            $('#contentmiddle').find('h1').each((i, headline) => {
                urls.push($(headline).find('a').attr('href'));
            });
        },
        onDrain: pool => {
            fs.writeFile(OUTPUT_PATH, JSON.stringify(urls))
        }
    });
    
    const GOOGLE_CACHE_TEMPLATE_URL = `http://webcache.googleusercontent.com/search?q=cache:http://www.pi-news.net/${year}/${month}/&num=1&hl=en&gl=de&strip=0&vwsrc=0`;
    for(const year of ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016']) {
        for(const month of ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']) {
            c.queue(GOOGLE_TRANSLATE_TEMPLATE_URL);
        }
    }
}
