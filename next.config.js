const withPlugins = require('next-compose-plugins');
const images = require('next-images');
const typescript = require('@zeit/next-typescript');
const CSS = require('@zeit/next-css');
const fonts = require('next-fonts');
const sourceMaps = require('@zeit/next-source-maps')();

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = file => {};
}

// next.js configuration
const nextConfig = {
  // useFileSystemPublicRoutes: false,
  // distDir: 'build',
};

module.exports = withPlugins(
  [sourceMaps, images, typescript, CSS, fonts],
  nextConfig
);
