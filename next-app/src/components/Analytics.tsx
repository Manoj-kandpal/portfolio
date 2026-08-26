'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_ID = 'G-BNMFMG4EMJ'

export function Analytics() {
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('mk-cookie-consent')
    setConsent(saved)
  }, [])

  if (consent !== 'granted') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
