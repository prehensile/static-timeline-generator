const walk = require('walkdir');
const { exec } = require("child_process");


function run( command ){
    console.log( command )
    exec( command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

module.exports = (eleventyConfig, options) => {
    
    const defaults = {
        pthImageFiles : "./_site/img/content",
        imageWidth : 1280
    }

    // merge defaults with user options and extract paths
    const { pthImageFiles } = {
        ...defaults,
        ...options
    }

    walk.sync( pthImageFiles, function(filePath, stat) {
        let command = null;
        console.log( filePath );
        if( filePath.endsWith(".jpg") ){
           command = `mogrify -quality 75 -resize 1280 ${filePath}`;
        } else if ( filePath.endsWith(".png") ){
            command = `mogrify -resize 1280 ${filePath}`;
        }
        if( command ){
            run( command );
        }
    });

};