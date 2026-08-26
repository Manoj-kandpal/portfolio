import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-8xl text-accent mb-4">404</h1>
        <h2 className="font-display text-2xl mb-4">Page Not Found</h2>
        <p className="text-ink-muted mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  )
}
