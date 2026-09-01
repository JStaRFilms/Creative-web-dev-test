import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '100.84.230.66',
    '100.84.230.66:3000',
    'localhost',
    'localhost:3000',
    '*.ts.net',
  ],
};

export default nextConfig;
