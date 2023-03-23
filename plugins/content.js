const path = require('path');
const fs = require('fs');

const walk = require('walkdir');
const marked = require('marked');
const fm = require('front-matter');
const moment = require('moment');


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


const imageExtensions = [ ".png", ".jpg" ];

function parseMarkdown( markdown, filepath ){

    const parts = fm( markdown );

    const tokens = marked.lexer( parts.body );
    
    let body, links;
    [body,links] = parseBody( tokens );

    let id = path.basename( filepath );
    id = id.substring(0, id.lastIndexOf("."));

    const entry = {
        "id" : id,
        "title": marked.parse(tokens[0].text),
        "body" : body,
        "links" : links
    }

    if( parts.attributes.hasOwnProperty('date')){
        // it's unlikely that exact time of day will ever be important
        entry[ 'date' ] = moment(parts.attributes.date).format("YYYY-MM-DD");
    }

    if( parts.attributes.hasOwnProperty('categories')){
        // it's unlikely that exact time of day will ever be important
        entry[ 'categories' ] = parts.attributes.categories;
    }

    for( const ext of imageExtensions ){
        const imagePath = filepath.replace( '.md', ext );
        if( fs.existsSync(imagePath) ){
            entry[ 'image' ] = {
                src : path.basename(imagePath)
            }
        }
    }

    return( entry );
}


function readMarkdownFile( filePath ){
    console.log( `Read markdown file ${filePath}...`)
    const data = fs.readFileSync( filePath, 'utf8');
    const entry = parseMarkdown( data, filePath );
    return( entry );
}

function generateContentFile( pthContentFiles, pthOutputJson ){

    const entries = [];

    walk.sync( pthContentFiles, function(filePath, stat) {
        if( filePath.endsWith(".md") ){
            entries.push( 
                readMarkdownFile( filePath )
            );
        }
    });

    // reverse-sort entries by date
    entries.sort( (a,b) => b.date.localeCompare(a.date) );

    console.log( `Writing entries to ${pthOutputJson}...`)
    fs.writeFileSync(
        pthOutputJson,
        JSON.stringify( entries, null, 4 )
    );
}


module.exports = (eleventyConfig, options) => {
    
    const defaults = {
        pthContentFiles : "./content",
        pthOutputJson : "./src/_data/entries.json"
    }

    // merge defaults with user options and extract paths
    const { pthContentFiles, pthOutputJson } = {
        ...defaults,
        ...options
    }

    generateContentFile( pthContentFiles, pthOutputJson );

    eleventyConfig.addWatchTarget( pthContentFiles );

};