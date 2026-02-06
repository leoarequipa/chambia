import type { Metadata, Viewport } from 'next'
import './globals.css'
import AuthWrapper from '@/components/auth/AuthWrapper'
import { SkipLink } from '@/components/ui/Accessibility'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FF6B35',
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'ChambIA - El trabajo de todos los días',
  description: 'LinkedIn es para los que trabajan en oficinas de San Isidro; ChambIA es para los que construyen el Perú todos los días en Gamarra, en las obras y en cada esquina.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ChambIA',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://chambia.app',
    title: 'ChambIA - Tu trabajo genera confianza',
    description: 'App para trabajadores informales. Muestra tu trabajo, gana confianza.',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'ChambIA App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChambIA - Tu trabajo genera confianza',
    description: 'App para trabajadores informales de Arequipa.',
    images: ['/icons/icon-512x512.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-PE">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="mask-icon" href="/icons/icon-512x512.png" color="#FF6B35" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ChambIA" />
        <meta name="application-name" content="ChambIA" />
        <meta name="msapplication-TileColor" content="#FF6B35" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body>
        <SkipLink />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  )
}