/** @type {import('next').NextConfig} */
const nextConfig = {
     async redirects() {
      return [
        {
          source: '/',
          destination: '/pages/orders',
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
              value: 'Order-Driven Production Management System',
            },
            {
              key: 'description',
              value: 'Production queue management system with analytics dashboard built using Next.js and MongoDB.',
            },
          ],
        },
      ];
    },
};

export default nextConfig;
