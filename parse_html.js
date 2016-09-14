/**
 * Takes a folder with PI-News articles (htmls) and converts them to a huge
 * list with comment objects of the format:
 * 
 *  {
 *      a: "author",
 *      c: "content"
 *  }
 * 
 * Comments that contain links or references to other commenters are filtered out.
 * Also comments above MAX_LEN characters are being discarded to reduce the amout of comments
 * and keep the dataset clean.
 */

const cheerio = require("cheerio");
const fs = require('fs');
const ent = require('ent');

const INPUT_DIR = './pages';
const OUTPUT_FILE = './comments.json';
const MAX_LEN = 300;

const pagePaths = fs.readdirSync(INPUT_DIR);

const comments = parseHTML(pagePaths);
console.log('Total comments: ' + comments.length);
writeHugeObjectToDisk(comments, OUTPUT_FILE);


function parseHTML(pagePaths) {
    const comments = [];

    let counter = 0;
    for (const pagePath of pagePaths) {
        console.log(counter);
        const $ = cheerio.load(fs.readFileSync('./pages/' + pagePath, 'utf8'));
        $('.google-src-text').remove();

        $('#commentlist').find('li').each((i, comment) => {
            const author = $(comment).find('>.notranslate').find('>b').text();

            // Removing malformed comments
            if(author == '') {
                return;
            }

            let content = "";
            $(comment).find('.commenttext').find('>*').each((i, el) => {
                $(el).find('>span').each((i, sentence) => {
                    const line = ent.decode($(sentence).html().substr(1));
                    // Removing comments that start with a reference to another commenter
                    if(line[0] !== '#' && line[0] !== '@') {
                        content += line + '\n';
                    }
                });
            });
            
            // Removing long comments and comments that contain links
            if(content.length < MAX_LEN && content.length > 0 && content.indexOf('</a>') === -1) {
                comments.push({
                    a: author,
                    c: content
                });
            }
        });

        counter++;
    }

    return comments;
}

/**
 * Helper function for writing a huge object to disc.
 * Calling JSON.stringify() directly on very large objects may cause memory issues within node.js
 */
function writeHugeObjectToDisk(comments, outputFile) {
    fs.appendFileSync(outputFile, '[');
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        fs.appendFileSync(outputFile, JSON.stringify(comment));
        if(i < comments.length - 1) {
            fs.appendFileSync(outputFile, ',');
        }
    }
    fs.appendFileSync(outputFile, ']');
}