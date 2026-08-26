import Link from 'next/link'
import data from '@/data/data.json'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { profile } = data

  return (
    <footer className="py-8 px-6 text-center text-sm text-ink-muted font-mono border-t border-border">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>&copy; {currentYear} {profile.name}</span>
        <span className="hidden sm:inline opacity-50">|</span>
        <div className="flex items-center gap-4">
          <Link 
            href={profile.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </Link>
          <Link 
            href={profile.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
