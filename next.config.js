/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "imports.scss";`,
  },
  images: {
    domains: ['gnusson.net'],
  },
};

module.exports = nextConfig;
