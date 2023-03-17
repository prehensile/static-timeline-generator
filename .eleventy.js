const pluginSass = require('eleventy-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const pluginContent = require('./content-plugin');

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
  return {
    dir: {
      input: 'src',
    },
  };
};
