import dns from 'dns';
if (process.env.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/pages/tables',
          permanent: false,
          
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/',
          headers: [
            {
              key: 'title',
              value: 'Restaurant POS System',
            },
            {
              key: 'description',
              value: 'A simple restaurant point-of-sale system built with Next.js',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  