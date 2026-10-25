import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NAGALAND ENGINE 360 v2.0',
    short_name: 'NE360',
    description: '360° View of Nagaland',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#dc2626',
    orientation: 'portrait',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
