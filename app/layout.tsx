import type { Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://allencleaning.vercel.app'),
  title: {
    default: 'AllenCleaning | Professional Cleaning Services in Bay Area, CA',
    template: '%s | AllenCleaning',
  },
  description: 'Professional residential and commercial cleaning services in Bay Area, California. We offer regular cleaning, deep cleaning, move-in/move-out cleaning, post-construction cleaning, and office cleaning. Get a free estimate today!',
  keywords: [
    'cleaning service Bay Area',
    'house cleaning Bay Area CA',
    'residential cleaning Bay Area',
    'commercial cleaning Bay Area',
    'deep cleaning service',
    'move in move out cleaning',
    'post construction cleaning',
    'office cleaning Bay Area',
    'professional cleaners near me',
    'maid service Bay Area California',
  ],
  authors: [{ name: 'AllenCleaning' }],
  creator: 'AllenCleaning',
  publisher: 'AllenCleaning',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://allencleaning.vercel.app',
    siteName: 'AllenCleaning',
    title: 'AllenCleaning | Professional Cleaning Services in Bay Area, CA',
    description: 'Professional residential and commercial cleaning services in Bay Area, California. Regular cleaning, deep cleaning, move-in/move-out, and more. Get a free estimate!',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AllenCleaning - Professional Cleaning Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllenCleaning | Professional Cleaning Services in Bay Area, CA',
    description: 'Professional residential and commercial cleaning services in Bay Area, California. Get a free estimate today!',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// JSON-LD Structured Data for Local Business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://allencleaning.vercel.app',
  name: 'AllenCleaning',
  description: 'Professional residential and commercial cleaning services in Bay Area, California.',
  url: 'https://allencleaning.vercel.app',
  telephone: '+1-732-372-3329',
  areaServed: {
    '@type': 'City',
    name: 'Bay Area',
    containedInPlace: {
      '@type': 'State',
      name: 'California',
    },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bay Area',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.6624,
    longitude: -121.8747,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
  ],
  priceRange: '$$',
  image: 'https://allencleaning.vercel.app/og-image.png',
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Regular Cleaning',
          description: 'Routine cleaning services for homes and offices',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Deep Cleaning',
          description: 'Thorough deep cleaning for a spotless home',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Move-in/Move-out Cleaning',
          description: 'Comprehensive cleaning for moving transitions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Post-Construction Cleaning',
          description: 'Detailed cleanup after construction or renovation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Office Cleaning',
          description: 'Professional cleaning for commercial spaces',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        {children}
      </body>
    </html>
  )
}

