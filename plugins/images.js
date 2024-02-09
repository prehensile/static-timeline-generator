const walk = require('walkdir');
const sharp = require('sharp');
sharp.cache(false);
const fs = require('fs');
const path = require('path');
const { glob, globSync } = require('glob');

async function processFile( sourcePath, destDir, destWidth ){
    
    const parsed = path.parse( sourcePath );

    const destPath = path.join(
        destDir,
        parsed.name + ".jpg"
    )

    console.log( `Writing ${destPath}...` );

    sharp( sourcePath )
        .resize( destWidth )
        .toFile( destPath );
}


module.exports = (eleventyConfig, options) => {
    
    const defaults = {
        pthSourceImages : [
            'content/*/*.png',
            'content/*/*.jpg'
        ],
        pthDestination : "./_site/img/content",
        imageWidth : 1280
    }

    // merge defaults with user options and extract paths
    const { pthSourceImages, pthDestination, imageWidth } = {
        ...defaults,
        ...options
    }

    for( const pthSource of pthSourceImages ){

        for( const filePath of globSync(pthSource) ){
            processFile( filePath, pthDestination, imageWidth );
        }

        // walk.sync( pthSource, function(filePath, stat) {
        //     processFile( filePath, pthDestination, imageWidth );
        // });
    }

};