const withPlugins = require('next-compose-plugins');
const images = require('next-images');
const typescript = require('@zeit/next-typescript');

// next.js configuration
const nextConfig = {
  // useFileSystemPublicRoutes: false,
  // distDir: 'build',
};

module.exports = withPlugins([images, typescript], nextConfig);
