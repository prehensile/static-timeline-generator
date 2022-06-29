const fs = require('fs');
const walk = require('walkdir');
const marked = require('marked');
const path = require('path');
const fm = require('front-matter');


function parseBody( tokens ){
    
    const links = [];
    const bodyTokens = [];

    for (let i = 1; i < tokens.length; i++) {
        const token = tokens[i];
        if( token.hasOwnProperty('tokens') && token.tokens[0].type=='link' ){
            // this token is a standalone link, add it to links
            const tokLink = token.tokens[0];
            links.push({
                'href' : tokLink.href,
                'linkText' : tokLink.text
            });
        } else {
            // this token is part of the body, add it to bodyTokens
            bodyTokens.push( token );
        }
    }

    const body = marked.parser( bodyTokens );

    return [body, links];
}

function parseMarkdown( markdown, filepath ){

    const parts = fm( markdown );

    const tokens = marked.lexer( parts.body );
    
    let body, links;
    [body,links] = parseBody( tokens );

    const entry = {
        "id" : path.basename( filepath ),
        "title": tokens[0].text,
        "body" : body,
        "links" : links
    }

    if( parts.attributes.hasOwnProperty('date')){
        // it's unlikely that exact time of day will ever be important
        entry[ 'date' ] = parts.attributes.date.toDateString();
    }

    if( parts.attributes.hasOwnProperty('categories')){
        // it's unlikely that exact time of day will ever be important
        entry[ 'categories' ] = parts.attributes.categories;
    }

    return( entry );
}


function readMarkdownFile( filePath ){
    const data = fs.readFileSync( filePath, 'utf8');
    const entry = parseMarkdown( data, filePath );
    return( entry );
}


const entries = [];

walk.sync('./content', function(filePath, stat) {
    if( filePath.endsWith(".md") ){
        entries.push( 
            readMarkdownFile( filePath )
        );
    }
});

process.stdout.write(
    JSON.stringify( entries )
);