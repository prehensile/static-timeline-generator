const pluginSass = require('eleventy-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const pluginContent = require('./plugins/content');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginContent);
  eleventyConfig.addPlugin(pluginSass, {
    postcss: postcss([autoprefixer]),
    input: './src/css/*.sass',
    output: './_site/css',
  });
  eleventyConfig.addPassthroughCopy('src/css/*.css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy({'content/*/*.png' : 'img/content'});
  eleventyConfig.addPassthroughCopy({'content/*/*.jpg' : 'img/content'});
  return {
    dir: {
      input: 'src',
    },
  };
};
