/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
   images: {
     unoptimized: true,
   },
   i18n: {
     locales: ['ru', 'en'],
     defaultLocale: 'ru',
   },
 };
 
 export default nextConfig;
 