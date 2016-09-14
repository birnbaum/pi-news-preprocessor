# "Politically Incorrect" data preprocessor

This projects contains a few scripts for crawling and parsing articles of the anti-islamic blog [Politically Incorrect](http://www.pi-news.net/).

I'm planing to use the collected data in two ways. First of all I want to use it to play with [NLTK](http://www.nltk.org/) to find interesting structures or just to analyze the general usage of certain words (like e.g. the lately trending "Gutmensch").

Secondly I want to train a RNN to create racist/islamophobic comments to new and unknown topics.

### The Scripts
1. `crawl_archives.js`: Crawls all "archive" pages and stores all found article URLs
2. `crawl_articles.js`: Crawls and downloads a list of articles as HTML files
3. `parse_html.js`: Transforms a list of downloaded articles to a list of comment objects
4. `create_text.js`: Transforms a list of comment objects to a big txt file that can be used to train a model with [torch-rnn](https://github.com/jcjohnson/torch-rnn)
