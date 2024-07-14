/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    config.module.rules.push({
      test: /\.js\.map$/,
      use: 'ignore-loader',
    });
    return config
  }
}

export default nextConfig;
