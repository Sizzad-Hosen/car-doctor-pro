/** @type {import('next').NextConfig} */
const nextConfig = 
    {
     
            images: {
              remotePatterns: [
                {
                  protocol: 'https',
                  hostname: 'i.ibb.co',
                  port: '',
                  pathname: '**',
                },
              ],
            },
            images: {
              remotePatterns: [
                {
                  protocol: 'https',
                  hostname: '**',
                  port: '',
                  pathname: '**',
                },
              ],
            },
          
};

export default nextConfig;
