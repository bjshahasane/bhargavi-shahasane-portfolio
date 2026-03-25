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
  