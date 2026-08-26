import { Metadata } from 'next'
import data from '@/data/data.json'
import { AboutPageClient } from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${data.profile.name}, a Full Stack Software Engineer with 4+ years of experience building enterprise web platforms.`,
}

export default function AboutPage() {
  return <AboutPageClient />
}
