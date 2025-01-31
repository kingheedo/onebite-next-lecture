import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['shopping-phinf.pstatic.net'], // 허용할 이미지 호스트 추가
  },
};

export default nextConfig;
