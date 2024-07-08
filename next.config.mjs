/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // por ejemplo para las imágines que se encuentren en el dominio https://images.unsplash.com
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com' 
            }
        ]
    },
};

export default nextConfig;
