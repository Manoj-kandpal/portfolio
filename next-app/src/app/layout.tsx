import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Analytics } from '@/components/Analytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://manoj-kandpal.github.io/portfolio'),
  title: {
    default: 'Manoj Kandpal | Full Stack Software Engineer',
    template: '%s | Manoj Kandpal',
  },
  description:
    'Portfolio of Manoj Kandpal, Full Stack Software Engineer building enterprise web platforms with Java, Spring Boot, React and Next.js.',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'Java Developer',
    'React Developer',
    'Next.js',
    'Spring Boot',
    'Manoj Kandpal',
  ],
  authors: [{ name: 'Manoj Kandpal' }],
  creator: 'Manoj Kandpal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://manoj-kandpal.github.io/portfolio/',
    siteName: 'Manoj Kandpal Portfolio',
    title: 'Manoj Kandpal | Full Stack Software Engineer',
    description:
      'Portfolio of Manoj Kandpal, Full Stack Software Engineer building enterprise web platforms with Java, Spring Boot, React and Next.js.',
    images: [
      {
        url: '/portfolio/images/manoj-kandpal.jpg',
        width: 1200,
        height: 630,
        alt: 'Manoj Kandpal - Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manoj Kandpal | Full Stack Software Engineer',
    description:
      'Portfolio of Manoj Kandpal, Full Stack Software Engineer building enterprise web platforms with Java, Spring Boot, React and Next.js.',
    images: ['/portfolio/images/manoj-kandpal.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F1E7' },
    { media: '(prefers-color-scheme: dark)', color: '#1B1814' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
