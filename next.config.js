const withPlugins = require('next-compose-plugins');
const images = require('next-images');
const typescript = require('@zeit/next-typescript');
const CSS = require('@zeit/next-css');
const fonts = require('next-fonts');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = file => {};
}

// next.js configuration
const nextConfig = {
  // useFileSystemPublicRoutes: false,
  // distDir: 'build',
};

module.exports = withPlugins([images, typescript, CSS, fonts], nextConfig);
